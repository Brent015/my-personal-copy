import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  guests,
  bookings
} from "../schemas";

export const referralLogs = pgTable("referralLogs", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  referrerId: varchar("ReferrerID", { length: 12 }),
  referredId: varchar("ReferredID", { length: 12 }),
  type: varchar("Type", { length: 20 }), // org, guest
  bookingId: varchar("BookingID", { length: 12 }),
  status: varchar("Status", { length: 50 }).default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const referralLogsRelations = relations(referralLogs, ({ one }) => ({
  referrer: one(guests, {
    fields: [referralLogs.referrerId],
    references: [guests.id]
  }),
  referred: one(guests, {
    fields: [referralLogs.referredId],
    references: [guests.id]
  }),
  booking: one(bookings, {
    fields: [referralLogs.bookingId],
    references: [bookings.id]
  })
}));
