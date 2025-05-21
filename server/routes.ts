import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validData);
      res.status(201).json({ message: "Message sent successfully", data: contact });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
