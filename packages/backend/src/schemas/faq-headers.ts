import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  faqLine
} from "../schemas";

export const faqHeader = pgTable("FAQHeader", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const faqHeaderRelations = relations(faqHeader, ({ many, one }) => ({
  lines: many(faqLine),
  event: one(events, {
    fields: [faqHeader.eventId],
    references: [events.id]
  })
}));
