import {
  pgTable,
  varchar,
  timestamp,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  eventPackages,
  guests,
  eventSchedules,
  payments,
  guestReview,
  collection
} from "../schemas";

export const bookings = pgTable("bookings", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  eventScheduleId: varchar("EventScheduleID", { length: 12 }),
  eventPackageId: varchar("EventPackageID", { length: 12 }),
  guestId: varchar("GuestID", { length: 12 }),
  paymentId: varchar("PaymentID", { length: 12 }),
  status: varchar("Status", { length: 20 }), // pending, confirmed, cancelled
  bookingDate: date("BookingDate"),
  totalGuests: integer("TotalGuests"),
  reviewStatus: varchar("ReviewStatus", { length: 15 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  event: one(events, {
    fields: [bookings.eventId],
    references: [events.id]
  }),
  eventSchedule: one(eventSchedules, {
    fields: [bookings.eventScheduleId],
    references: [eventSchedules.id]
  }),
  eventPackage: one(eventPackages, {
    fields: [bookings.eventPackageId],
    references: [eventPackages.id]
  }),
  guest: one(guests, {
    fields: [bookings.guestId],
    references: [guests.id]
  }),
  payment: one(payments, {
    fields: [bookings.paymentId],
    references: [payments.id]
  }),
  reviews: many(guestReview),
  collections: many(collection)
}));
