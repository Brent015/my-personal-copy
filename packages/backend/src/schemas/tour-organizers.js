import { 
  pgTable, 
  varchar, 
  timestamp, 
  integer, 
  boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  tourAgency,
  image
} from "../schemas";

export const tourOrganizer = pgTable("tourOrganizer", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  fullName: varchar("FullName", { length: 255 }),
  email: varchar("Email", { length: 255 }),
  telegramId: varchar("TelegramID", { length: 50 }),
  profileImageId: varchar("ProfileImageID", { length: 12 }),
  phoneNumber: varchar("PhoneNumber", { length: 50 }),
  agencyId: varchar("AgencyID", { length: 12 }),
  accreditation: integer("Accreditation"),
  verificationImageId: varchar("VerificationmageID", { length: 12 }),
  isOwner: boolean("IsOwner"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const tourOrganizerRelations = relations(tourOrganizer, ({ one }) => ({
  agency: one(tourAgency, {
    fields: [tourOrganizer.agencyId],
    references: [tourAgency.id]
  }),
  image: one(image, {
    fields: [tourOrganizer.profileImageId],
    references: [image.id]
  })
}));
