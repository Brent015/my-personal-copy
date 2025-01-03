import {
    pgTable,
    varchar,
    timestamp,
    integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  eventScheduleAssignments,
  transportationPerAgency,
  image
} from "../schemas";

export const transportation = pgTable("transportation", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  imageId: varchar("ImageID", { length: 12 }),
  telegramId: varchar("TelegramID", { length: 50 }),
  fullName: varchar("FullName", { length: 255 }),
  plateNumber: varchar("PlateNumber", { length: 50 }),
  maxSeat: integer("MaxSeat"),
  model: varchar("Model", { length: 100 }),
  color: varchar("Color", { length: 50 }),
  location: varchar("Location", { length: 255 }),
  status: varchar("Status", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const transportationRelations = relations(transportation, ({ many, one }) => ({
  scheduleAssignments: many(eventScheduleAssignments),
  agencies: many(transportationPerAgency),
  image: one(image, {
    fields: [transportation.imageId],
    references: [image.id]
  })
}));
