import {
    pgTable,
    varchar,
    timestamp,
    text
} from "drizzle-orm/pg-core";

export const activityLogs = pgTable("activityLogs", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  entityType: varchar("EntityType", { length: 50 }),
  entityId: varchar("EntityID", { length: 12 }),
  userId: varchar("UserID", { length: 12 }),
  userType: varchar("UserType", { length: 50 }),
  actionType: varchar("ActionType", { length: 50 }),
  description: text("Description"),
  oldValue: text("OldValue"),
  newValue: text("NewValue"),
  userAgent: varchar("UserAgent", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow()
});
