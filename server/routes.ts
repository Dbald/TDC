import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {

  app.use(express.json());

  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(validData);
      res.status(201).json({ message: "Successfully subscribed", data: subscriber });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  // set your SMTP in env (e.g., .env)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // true if port 465
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validData);

      // send the notification email
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
          from: `"Contact Form" <no-reply@thedevincicode.com>`,
          to: "itsdevincicode@gmail.com",
          replyTo: validData.email,
          subject: `[Contact] ${subjectLabel} from ${validData.name}`,
          text:
            `Name: ${validData.name}\nEmail: ${validData.email}\nSubject: ${validData.subject}\n\n${validData.message}`,
          html,
        });
      } catch (mailErr) {
        console.error("Email send failed:", mailErr);
        // optional: return 202 instead to signal “accepted; email queued/failed”
      }

      res.status(201).json({ message: "Message sent successfully", data: contact });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
