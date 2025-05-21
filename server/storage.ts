import { users, type User, type InsertUser, subscribers, type Subscriber, type InsertSubscriber, contacts, type Contact, type InsertContact } from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  
  // Contact methods
  getContact(id: number): Promise<Contact | undefined>;
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private contacts: Map<number, Contact>;
  private userCurrentId: number;
  private subscriberCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.contacts = new Map();
    this.userCurrentId = 1;
    this.subscriberCurrentId = 1;
    this.contactCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Subscriber methods
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = await this.getSubscriberByEmail(insertSubscriber.email);
    if (existingSubscriber) {
      if (!existingSubscriber.active) {
        // If subscriber exists but is inactive, reactivate them
        existingSubscriber.active = true;
        existingSubscriber.subscribedAt = new Date();
        this.subscribers.set(existingSubscriber.id, existingSubscriber);
      }
      return existingSubscriber;
    }
    
    const id = this.subscriberCurrentId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date(),
      active: true,
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Contact methods
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      read: false,
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async markContactAsRead(id: number): Promise<Contact | undefined> {
    const contact = await this.getContact(id);
    if (contact) {
      contact.read = true;
      this.contacts.set(id, contact);
    }
    return contact;
  }
}

export const storage = new MemStorage();
