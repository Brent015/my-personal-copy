import {
    pgTable,
    varchar,
    timestamp,
    decimal
} from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  bookingId: varchar("BookingID", { length: 12 }),
  amount: decimal("Amount"),
  description: varchar("Description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
