import {
  pgTable,
  varchar,
  timestamp,
  integer,
  date
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  bookings,
  guestReview,
  tourAgency
} from "../schemas";

export const guests = pgTable("guests", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  telegramId: varchar("TelegramID", { length: 12 }),
  name: varchar("Name", { length: 255 }),
  age: integer("Age"),
  gender: varchar("Gender", { length: 50 }),
  lastActivity: date("LastActivity"),
  referredBy: varchar("ReferredBy", { length: 255 }),
  referralCode: varchar("ReferralCode", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const guestsRelations = relations(guests, ({ many, one }) => ({
  bookings: many(bookings),
  reviews: many(guestReview),
  referredBy: one(guests, {
    fields: [guests.referredBy],
    references: [guests.id]
  }),
  referredByAgency: one(tourAgency, {
    fields: [guests.referredBy],
    references: [tourAgency.id]
  })
}));
