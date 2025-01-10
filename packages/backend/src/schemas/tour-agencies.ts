import { 
  pgTable, 
  varchar, 
  timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  tourOrganizer,
  payoutAccount,
  coordinatorPerAgency,
  transportationPerAgency
} from "../schemas";

export const tourAgency = pgTable("tourAgency", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  name: varchar("Name", { length: 255 }),
  longDescId: varchar("LongDescID", { length: 12 }),
  imageId: varchar("ImageID", { length: 12 }),
  organizerId: varchar("OrganizerID", { length: 12 }),
  verificationStatus: varchar("VerificationStatus", { length: 20 }),
  referralCode: varchar("ReferralCode", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const tourAgencyRelations = relations(tourAgency, ({ many, one }) => ({
  events: many(events),
  organizers: many(tourOrganizer),
  payoutAccounts: many(payoutAccount),
  coordinators: many(coordinatorPerAgency),
  transportation: many(transportationPerAgency)
}));
