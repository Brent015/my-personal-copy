import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

export const activities = pgTable("activities", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  title: varchar("Title", { length: 255 }),
  imageId: varchar("ImageID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
