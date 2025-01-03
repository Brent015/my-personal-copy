import {
    pgTable,
    varchar,
    timestamp,
    decimal
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  tourOrganizer,
  tourAgency,
  payoutAccount
} from "../schemas";

export const disbursement = pgTable("disbursement", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  organizerId: varchar("OrganizerID", { length: 12 }),
  agencyId: varchar("AgencyID", { length: 12 }),
  amount: decimal("Amount"),
  payoutAccountId: varchar("PayoutAccountID", { length: 12 }),
  status: varchar("Status", { length: 50 }),
  serviceCharge: decimal("ServiceCharge"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const disbursementRelations = relations(disbursement, ({ one }) => ({
  organizer: one(tourOrganizer, {
    fields: [disbursement.organizerId],
    references: [tourOrganizer.id]
  }),
  agency: one(tourAgency, {
    fields: [disbursement.agencyId],
    references: [tourAgency.id]
  }),
  payoutAccount: one(payoutAccount, {
    fields: [disbursement.payoutAccountId],
    references: [payoutAccount.id]
  })
}));
