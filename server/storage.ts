// storage.ts
import {
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

// 👇 extend IStorage
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Subscribers
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getSubscriberByTokenHash(hash: string): Promise<Subscriber | undefined>;           // NEW
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  updateSubscriberToken(args: {                                                     // NEW
    email: string;
    confirm_token_hash: string;
    token_expires_at: Date;
    status?: "pending" | "confirmed";
    ip?: string | null;
    user_agent?: string | null;
  }): Promise<Subscriber | undefined>;
  confirmSubscriberById(args: { id: number }): Promise<Subscriber | undefined>;     // NEW
  unsubscribeByEmail(email: string): Promise<Subscriber | undefined>;               // NEW

  // Contacts
  getContact(id: number): Promise<Contact | undefined>;
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private subscribers: Map<number, Subscriber> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private userCurrentId = 1;
  private subscriberCurrentId = 1;
  private contactCurrentId = 1;

  // Users …
  async getUser(id: number) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return [...this.users.values()].find(u => u.username === username);
  }
  async createUser(insertUser: InsertUser) {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Subscribers
  async getSubscriber(id: number) { return this.subscribers.get(id); }

  async getSubscriberByEmail(email: string) {
    return [...this.subscribers.values()].find(s => s.email === email);
  }

  async getSubscriberByTokenHash(hash: string) {
    return [...this.subscribers.values()].find(s => s.confirmTokenHash === hash);
  }

  async createSubscriber(insertSubscriber: InsertSubscriber) {
    // upsert behavior similar to your original
    const existing = await this.getSubscriberByEmail(insertSubscriber.email);
    if (existing) {
      // Reactivate if inactive
      if (existing.active === false) {
        const updated: Subscriber = {
          ...existing,
          active: true,
          status: (existing.status ?? "pending") as any,
          subscribedAt: new Date(),
        };
        this.subscribers.set(existing.id, updated);
        return updated;
      }
      return existing;
    }

    const id = this.subscriberCurrentId++;
    const now = new Date();
    const subscriber: Subscriber = {
      // required
      id,
      email: insertSubscriber.email,
      // new fields with sane defaults
      status: "pending",
      confirmTokenHash: null,
      tokenExpiresAt: null,
      subscribedAt: now,
      confirmedAt: null,
      ip: null,
      userAgent: null,
      active: true,
    } as Subscriber;

    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async updateSubscriberToken(args: {
    email: string;
    confirm_token_hash: string;
    token_expires_at: Date;
    status?: "pending" | "confirmed";
    ip?: string | null;
    user_agent?: string | null;
  }) {
    const sub = await this.getSubscriberByEmail(args.email);
    if (!sub) return undefined;
    const updated: Subscriber = {
      ...sub,
      confirmTokenHash: args.confirm_token_hash,
      tokenExpiresAt: args.token_expires_at,
      status: (args.status ?? "pending") as any,
      ip: args.ip ?? sub.ip ?? null,
      userAgent: args.user_agent ?? sub.userAgent ?? null,
    };
    this.subscribers.set(sub.id, updated);
    return updated;
    }

  async confirmSubscriberById(args: { id: number }) {
    const sub = await this.getSubscriber(args.id);
    if (!sub) return undefined;
    const updated: Subscriber = {
      ...sub,
      status: "confirmed",
      confirmTokenHash: null,
      tokenExpiresAt: null,
      confirmedAt: new Date(),
      active: true,
    };
    this.subscribers.set(sub.id, updated);
    return updated;
  }

  async unsubscribeByEmail(email: string) {
    const sub = await this.getSubscriberByEmail(email);
    if (!sub) return undefined;
    const updated: Subscriber = { ...sub, active: false };
    this.subscribers.set(sub.id, updated);
    return updated;
  }

  // Contacts …
  async getContact(id: number) { return this.contacts.get(id); }
  async getContacts() { return [...this.contacts.values()]; }
  async createContact(insertContact: InsertContact) {
    const id = this.contactCurrentId++;
    const contact: Contact = { ...insertContact, id, createdAt: new Date(), read: false };
    this.contacts.set(id, contact);
    return contact;
  }
  async markContactAsRead(id: number) {
    const c = await this.getContact(id);
    if (!c) return undefined;
    c.read = true;
    this.contacts.set(id, c);
    return c;
  }
}

export const storage = new MemStorage();
