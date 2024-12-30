import {
    pgTable,
    varchar,
    timestamp,
    decimal
} from "drizzle-orm/pg-core";

export const transactionLogs = pgTable("transactionLogs", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  gatewayFee: decimal("GatewayFee"),
  serviceFee: decimal("ServiceFee"),
  grossAmount: decimal("GrossAmount"),
  netAmount: decimal("NetAmount"),
  source: varchar("Source", { length: 50 }), // enum: ewallet
  destination: varchar("Destination", { length: 255 }), // payoutAccountID
  organizerId: varchar("OrganizerID", { length: 12 }),
  movementType: varchar("MovementType", { length: 50 }), // enum: fund, wallet, profit
  transactionType: varchar("TransactionType", { length: 50 }), // enum: booking, disbursement
  transactionId: varchar("TransactionID", { length: 12 }), // bookingID / disbursement ID
  type: varchar("Type", { length: 50 }), // enum: amount, credit
  createdAt: timestamp("created_at").defaultNow()
});
