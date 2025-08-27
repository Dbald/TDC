import "dotenv/config";
import express, { type Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from "nodemailer";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { randomBytes, createHash } from "node:crypto";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());

  // health check (add this)
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true, now: new Date().toISOString() });
  });
  console.log("[routes] /api/health ready");


  // CORS: allow Netlify app + local dev
  const allowlist = [process.env.APP_ORIGIN, "http://localhost:5173"].filter(Boolean) as string[];
  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || allowlist.includes(origin)) return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "OPTIONS"],
    })
  );

  // helper to create a token + hash (store only the hash)
  const makeToken = () => {
    const token = randomBytes(32).toString("hex");
    const hash = createHash("sha256").update(token).digest("hex");
    return { token, hash };
  };

  // ✅ create transporter BEFORE any route uses it
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),                // 465 or 587
    secure: Number(process.env.SMTP_PORT) === 465,      // true for 465, false for 587
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  if (process.env.NODE_ENV !== "production") {
    transporter
      .verify()
      .then(() => console.log("SMTP ready"))
      .catch(err => console.error("SMTP verify failed:", err));
  }

  // SUBSCRIBE – double opt-in: save (or update) token and email confirm link
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = insertSubscriberSchema.parse(req.body); // only { email }
      const existing = await storage.getSubscriberByEmail(email);

      const { token, hash } = makeToken();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      if (existing?.status === "confirmed") {
        return res.status(200).json({ message: "Already subscribed" });
      }

      if (existing) {
        await storage.updateSubscriberToken({
          email,
          confirm_token_hash: hash,
          token_expires_at: expiresAt,
          status: "pending",
          ip: req.ip ?? null,
          user_agent: (req.headers["user-agent"] as string) ?? null,
        });
      } else {
        // create new subscriber (InsertSubscriber is just { email })
        await storage.createSubscriber({ email });
        // then add token/status
        await storage.updateSubscriberToken({
          email,
          confirm_token_hash: hash,
          token_expires_at: expiresAt,
          status: "pending",
          ip: req.ip ?? null,
          user_agent: (req.headers["user-agent"] as string) ?? null,
        });
      }

      // was: const confirmUrl = `${process.env.SITE_URL}/api/confirm?token=${token}`;
      const confirmUrl = `${process.env.API_ORIGIN}/api/confirm?token=${token}`;

      const html = `
        <p>Confirm your subscription to <b>The Devinci Code</b>:</p>
        <p><a href="${confirmUrl}">👉 Confirm my email</a></p>
        <p>If you didn’t request this, you can ignore this message.</p>
      `;

      try {
        const info = await transporter.sendMail({
          from: `"The Devinci Code" <${process.env.SMTP_USER}>`,
          to: email, // for a quick sanity check, you can temporarily use process.env.SMTP_USER
          subject: "Please confirm your subscription",
          text: `Confirm your subscription: ${confirmUrl}`,
          html,
        });

        console.log("[subscribe] send OK:",
          { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response });

        // if Gmail rejected it, surface that to the client
        if (info.rejected && info.rejected.length) {
          return res.status(502).json({ ok: false, where: "sendMail", rejected: info.rejected });
        }
      } catch (e) {
        console.error("[subscribe] sendMail failed:", e);
        return res.status(502).json({ ok: false, where: "sendMail", error: String(e) });
      }


      return res.status(201).json({ message: "Check your email to confirm." });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("[subscribe] error:", error);
      return res.status(500).json({ message: "Unable to subscribe right now." });
    }
  });

  // CONFIRM – finalizes the subscription
  app.get("/api/confirm", async (req, res) => {
    try {
      const token = String(req.query.token || "");
      if (!token) return res.redirect(`${process.env.APP_ORIGIN}/?confirm_error=missing`);

      const hash = createHash("sha256").update(token).digest("hex");
      const sub = await storage.getSubscriberByTokenHash(hash);
      if (!sub) return res.redirect(`${process.env.APP_ORIGIN}/?confirm_error=invalid`);

      if (sub.tokenExpiresAt && sub.tokenExpiresAt < new Date()) {
        return res.redirect(`${process.env.APP_ORIGIN}/?confirm_error=expired`);
      }

      await storage.confirmSubscriberById({ id: sub.id });

      // ✅ Redirect back to your Netlify site (Option 3)
      return res.redirect(`${process.env.APP_ORIGIN}/?confirmed=1`);
    } catch (e) {
      console.error("[confirm] error:", e);
      return res.redirect(`${process.env.APP_ORIGIN}/?confirm_error=server`);
    }
  });


  // CONTACT – unchanged, now uses the transporter defined above
  app.post("/api/contact", async (req, res) => {
    try {
      const validData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validData);

      const subjectMap: Record<string, string> = {
        speaking: "Speaking Inquiry",
        project: "Project Collaboration",
        consulting: "Consulting Services",
        other: "Other",
      };
      const subjectLabel =
        subjectMap[validData.subject as keyof typeof subjectMap] || "New Inquiry";

      const html = `
        <h2>${subjectLabel}</h2>
        <p><strong>Name:</strong> ${validData.name}</p>
        <p><strong>Email:</strong> ${validData.email}</p>
        <p><strong>Subject:</strong> ${validData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validData.message.replace(/\n/g, "<br/>")}</p>
      `;

      try {
        await transporter.sendMail({
          from: `"Contact Form" <${process.env.SMTP_USER}>`,
          to: "itsdevincicode@gmail.com",
          replyTo: validData.email,
          subject: `[TDC Contact] ${subjectLabel} from ${validData.name}`,
          text: `Name: ${validData.name}\nEmail: ${validData.email}\nSubject: ${validData.subject}\n\n${validData.message}`,
          html,
        });
      } catch (mailErr) {
        console.error("Email send failed:", mailErr);
        return res.status(502).json({ message: "Email failed" });
      }

      res.status(201).json({ message: "Message sent successfully", data: contact });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error(error);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
