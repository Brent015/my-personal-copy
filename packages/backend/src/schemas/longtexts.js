import {
    pgTable,
    varchar,
    timestamp,
    text
} from "drizzle-orm/pg-core";

export const longtext = pgTable("longtext", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  text: text("Text"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
