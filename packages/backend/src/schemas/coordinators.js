import { 
  pgTable, 
  varchar, 
  timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  coordinatorPerAgency,
  eventScheduleAssignments,
  eventScheduleCoordinators,
  image
} from "../schemas";

export const coordinators = pgTable("coordinators", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  telegramId: varchar("TelegramID", { length: 12 }),
  fullName: varchar("FullName", { length: 255 }),
  shortDescription: varchar("ShortDescription", { length: 255 }),
  role: varchar("Role", { length: 50 }),
  status: varchar("Status", { length: 50 }),
  imageId: varchar("ImageID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const coordinatorRelations = relations(coordinators, ({ many, one }) => ({
  scheduleAssignments: many(eventScheduleAssignments),
  schedules: many(eventScheduleCoordinators),
  agencies: many(coordinatorPerAgency),
  image: one(image, {
    fields: [coordinators.imageId],
    references: [image.id]
  })
}));
