import {
    pgTable,
    varchar,
    timestamp,
    integer,
    text
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { faqHeader } from "../schemas";

export const faqLine = pgTable("FAQLine", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  faqId: varchar("FaqID", { length: 12 }),
  question: varchar("Question", { length: 255 }),
  answer: text("Answer"),
  orderNum: integer("OrderNum"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const faqLineRelations = relations(faqLine, ({ one }) => ({
  header: one(faqHeader, {
    fields: [faqLine.faqId],
    references: [faqHeader.id]
  })
}));
