import {
    pgTable,
    varchar,
    timestamp,
    blob
} from "drizzle-orm/pg-core";

export const blob = pgTable("blob", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  blob: blob("Blob"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
