import {
    pgTable,
    varchar,
    timestamp,
    decimal
} from "drizzle-orm/pg-core";

export const collection = pgTable("collection", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  bookingId: varchar("BookingID", { length: 12 }),
  eventScheduleId: varchar("EventScheduleID", { length: 12 }),
  totalAmount: decimal("TotalAmount"),
  amountPaid: decimal("AmountPaid"),
  balance: decimal("Balance"),
  status: decimal("Status"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
