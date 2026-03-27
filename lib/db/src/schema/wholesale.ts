import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const wholesaleInquiriesTable = pgTable("wholesale_inquiries", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location"),
  productsInterested: text("products_interested"),
  estimatedVolume: text("estimated_volume"),
  message: text("message"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWholesaleInquirySchema = createInsertSchema(wholesaleInquiriesTable).omit({ id: true, createdAt: true, status: true });
export type InsertWholesaleInquiry = z.infer<typeof insertWholesaleInquirySchema>;
export type WholesaleInquiry = typeof wholesaleInquiriesTable.$inferSelect;
