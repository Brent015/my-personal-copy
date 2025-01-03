
import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  coordinators,
  eventSchedules
} from "../schemas";

export const eventScheduleCoordinators = pgTable("eventScheduleCoordinators", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  telegramId: varchar("TelegramID", { length: 50 }),
  coordinatorId: varchar("CoordinatorID", { length: 12 }),
  eventScheduleId: varchar("EventScheduleID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const eventScheduleCoordinatorsRelations = relations(eventScheduleCoordinators, ({ one }) => ({
  coordinator: one(coordinators, {
    fields: [eventScheduleCoordinators.coordinatorId],
    references: [coordinators.id]
  }),
  eventSchedule: one(eventSchedules, {
    fields: [eventScheduleCoordinators.eventScheduleId],
    references: [eventSchedules.id]
  })
}));
