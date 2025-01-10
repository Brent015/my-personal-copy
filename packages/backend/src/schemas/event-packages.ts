import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  eventPackages,
  bookings,
  eventPackageActivities,
  eventPackagePaymentConfig,
  eventPackageDiscount
} from "../schemas";

export const eventPackages = pgTable("eventPackages", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  title: varchar("Title", { length: 255 }),
  duration: decimal("Duration"),
  desc1Id: varchar("Desc1ID", { length: 12 }),
  desc2Id: varchar("Desc2ID", { length: 12 }),
  desc3Id: varchar("Desc3ID", { length: 12 }),
  desc4Id: varchar("Desc4ID", { length: 12 }),
  desc5Id: varchar("Desc5ID", { length: 12 }),
  price: decimal("Price"),
  status: boolean("Status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const eventPackagesRelations = relations(eventPackages, ({ one, many }) => ({
  event: one(events, {
    fields: [eventPackages.eventId],
    references: [events.id]
  }),
  bookings: many(bookings),
  activities: many(eventPackageActivities),
  paymentConfig: one(eventPackagePaymentConfig),
  discounts: many(eventPackageDiscount)
}));
