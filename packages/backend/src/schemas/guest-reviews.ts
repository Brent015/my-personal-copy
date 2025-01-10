import {
    pgTable,
    varchar,
    timestamp,
    integer
} from "drizzle-orm/pg-core";

export const guestReview = pgTable("guestReview", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  eventScheduleId: varchar("EventScheduleID", { length: 12 }),
  eventPackageId: varchar("EventPackageID", { length: 12 }),
  bookingId: varchar("BookingID", { length: 12 }),
  rate: integer("Rate"),
  longDescId: varchar("LongDescID", { length: 12 }),
  guestId: varchar("GuestID", { length: 12 }),
  reviewFor: varchar("ReviewFor", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
