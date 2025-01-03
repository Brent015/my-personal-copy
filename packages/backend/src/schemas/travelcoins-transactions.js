import {
    pgTable,
    varchar,
    timestamp,
    integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { bookings } from "../schemas";

export const travelCoinsTransactions = pgTable("travelCoinsTransactions", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  userId: varchar("UserID", { length: 12 }),
  transactionType: varchar("TransactionType", { length: 50 }), // booking, referral, discount, voucher, blasting, donation
  transactionId: varchar("TransactionID", { length: 12 }),
  entryType: varchar("EntryType", { length: 10 }), // dr, cr
  amount: integer("Amount"),
  createdAt: timestamp("created_at").defaultNow()
});

export const travelCoinsTransactionsRelations = relations(travelCoinsTransactions, ({ one }) => ({
  booking: one(bookings, {
    fields: [travelCoinsTransactions.transactionId],
    references: [bookings.id]
  })
}));
