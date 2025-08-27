// @shared/schema.ts
import { pgTable, text, serial, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- USERS ---
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


export const subscriberStatusEnum = pgEnum("subscriber_status", ["pending", "confirmed"]);

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),

  status: subscriberStatusEnum("status").notNull().default("pending"),
  confirmTokenHash: text("confirm_token_hash"),      // nullable
  tokenExpiresAt: timestamp("token_expires_at"),     // nullable
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  confirmedAt: timestamp("confirmed_at"),            // nullable
  ip: text("ip"),
  userAgent: text("user_agent"),

  active: boolean("active").default(true).notNull(), // keep if you like
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true, // client sends only email; server fills the rest
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// Contact messages
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

// what the API expects to receive from the client
export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;