import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

export const eventPackageActivities = pgTable("eventPackageActivities", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventPackageId: varchar("EventPackageID", { length: 12 }),
  activityId: varchar("ActivityID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
