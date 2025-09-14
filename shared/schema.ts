import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  discountedPrice: decimal("discounted_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  affiliateLink: text("affiliate_link").notNull(),
  platform: text("platform").notNull(), // Amazon, Flipkart, Myntra
  category: text("category"),
  featured: boolean("featured").default(false),
  autoFetchPrice: boolean("auto_fetch_price").default(false),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  reviewCount: text("review_count"),
  discountPercentage: text("discount_percentage"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"), // emoji or icon identifier
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const platforms = pgTable("platforms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  icon: text("icon"), // emoji or icon identifier
  color: text("color"), // for styling
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

// Helper function to validate icon field (emoji or secure URL)
const iconValidator = z.string().optional().refine((value) => {
  if (!value || value.trim() === "") return true;
  
  // Check if it's a valid HTTPS URL for images
  try {
    const url = new URL(value);
    if (url.protocol === 'https:') {
      // Check if it looks like an image URL
      const pathname = url.pathname.toLowerCase();
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
      const isImageExt = imageExtensions.some(ext => pathname.endsWith(ext));
      
      // Allow if it has image extension or is from trusted domains
      const trustedDomains = ['imgur.com', 'github.com', 'githubusercontent.com', 'unsplash.com', 'pexels.com'];
      const isTrustedDomain = trustedDomains.some(domain => url.hostname.endsWith(domain));
      
      return isImageExt || isTrustedDomain || pathname.includes('image') || pathname.includes('icon');
    }
    return false;
  } catch {
    // If URL parsing fails, treat as emoji (short string)
    return value.length <= 10; // Emojis are typically 1-4 characters
  }
}, {
  message: "Icon must be an emoji or a secure HTTPS URL pointing to an image (PNG, JPG, SVG, WebP)"
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
}).extend({
  icon: iconValidator
});

export const insertPlatformSchema = createInsertSchema(platforms).omit({
  id: true,
  createdAt: true,
}).extend({
  icon: iconValidator
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertPlatform = z.infer<typeof insertPlatformSchema>;
export type Platform = typeof platforms.$inferSelect;
