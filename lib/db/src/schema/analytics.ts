import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const pageVisitsTable = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  visitedAt: timestamp("visited_at").notNull().defaultNow(),
});

export const insertPageVisitSchema = createInsertSchema(pageVisitsTable).omit({ id: true, visitedAt: true });
export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type PageVisit = typeof pageVisitsTable.$inferSelect;
