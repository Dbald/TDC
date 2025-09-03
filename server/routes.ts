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
  const allowlist = [
    "https://thedevincicode.com",
    "https://www.thedevincicode.com",         // add if you serve www
    process.env.APP_ORIGIN,                    // e.g. https://thedevincicode.netlify.app
    "http://localhost:5173",
  ].filter(Boolean) as string[];

  // make Vary: Origin explicit for caches/CDN
  app.use((_, res, next) => { res.setHeader("Vary", "Origin"); next(); });

  // simple, non-credentialed CORS
  app.use(
    cors({
      origin: allowlist,                // array is fine
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: false,               // important since we removed it client-side
      optionsSuccessStatus: 204,
    })
  );

  // ensure OPTIONS preflight is handled
  app.options("*", cors());

  // helper to create a token + hash (store only the hash)
  const makeToken = () => {
    const token = randomBytes(32).toString("hex");
    const hash = createHash("sha256").update(token).digest("hex");
    return { token, hash };
  };

  // ✅ create transporter BEFORE any route uses it
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,                // 465 or 587
    secure: false,    // true for 465, false for 587
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  connectionTimeout: 15000,   // 15s
  greetingTimeout: 10000,     // 10s
  socketTimeout: 20000,       // 20s
  logger: true,               // log to console
  debug: true,                // include SMTP traffic
  });

  if (process.env.NODE_ENV !== "production") {
    transporter
      .verify()
      .then(() => console.log("SMTP ready"))
      .catch(err => console.error("SMTP verify failed:", err));
  }

 // SUBSCRIBE (returns 201 if email sent, 202 if email couldn't be sent)
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = insertSubscriberSchema.parse(req.body);

    // ... your token + upsert logic ...
    const { token, hash } = makeToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const existing = await storage.getSubscriberByEmail(email);
    if (existing?.status === "confirmed") {
      return res.status(200).json({ message: "Already subscribed" });
    }
    if (!existing) await storage.createSubscriber({ email });
    await storage.updateSubscriberToken({
      email,
      confirm_token_hash: hash,
      token_expires_at: expiresAt,
      status: "pending",
      ip: req.ip ?? null,
      user_agent: (req.headers["user-agent"] as string) ?? null,
    });

    const confirmUrl = `${process.env.API_ORIGIN}/api/confirm?token=${token}`;
    const html = `
      <p>Confirm your subscription to <b>The Devinci Code</b>:</p>
      <p><a href="${confirmUrl}">👉 Confirm my email</a></p>
      <p>If you didn’t request this, you can ignore this message.</p>
    `;

    // Try to send, but DO NOT throw if it fails
    let sent = false;
    try {
      // prefer HTTP email provider (see section 2 below)
      if (process.env.RESEND_API_KEY) {
        await sendEmailViaResend({
          to: email,
          subject: "Please confirm your subscription",
          html,
        });
        sent = true;
      } else if (transporter) {
        await transporter.sendMail({
          from: `"The Devinci Code" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Please confirm your subscription",
          text: `Confirm your subscription: ${confirmUrl}`,
          html,
        });
        sent = true;
      }
    } catch (mailErr) {
      console.error("[subscribe] sendMail failed:", mailErr);
      // swallow error, we’ll return 202 below
    }

    if (sent) {
      return res.status(201).json({ message: "Check your email to confirm." });
    }
    return res.status(202).json({
      message:
        "Subscribed, but the confirmation email couldn’t be sent yet. Please try again later.",
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: fromZodError(error).message });
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
  app.post("/api/contact", async (req, res, next) => {
    console.log("[contact] body:", req.body);
    next();
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
