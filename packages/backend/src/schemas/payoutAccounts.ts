import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  disbursement,
  tourAgency
} from "../schemas";

export const payoutAccount = pgTable("payoutAccount", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  bankName: varchar("BankName", { length: 255 }),
  agencyId: varchar("AgencyID", { length: 12 }),
  accountNumber: varchar("AccountNumber", { length: 50 }),
  accountName: varchar("AccountName", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const payoutAccountRelations = relations(payoutAccount, ({ one, many }) => ({
  agency: one(tourAgency, {
    fields: [payoutAccount.agencyId],
    references: [tourAgency.id]
  }),
  disbursements: many(disbursement)
}));
