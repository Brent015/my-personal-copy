import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

export const payout = pgTable("payout", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  agencyId: varchar("AgencyID", { length: 12 }),
  accountNumber: varchar("AccountNumber", { length: 50 }),
  accountName: varchar("AccountName", { length: 255 }),
  status: varchar("Status", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
    