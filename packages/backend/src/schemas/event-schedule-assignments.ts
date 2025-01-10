import {
    pgTable,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  coordinators,
  eventSchedules,
  transportation
} from "../schemas";

export const eventScheduleAssignments = pgTable("eventScheduleAssignments", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  coordinatorId: varchar("CoordinatorID", { length: 12 }),
  eventScheduleId: varchar("EventScheduleID", { length: 12 }),
  longDescId: varchar("LongDescID", { length: 12 }),
  bookingId: varchar("BookingID", { length: 12 }),
  transportationId: varchar("TransportationID", { length: 12 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const eventScheduleAssignmentsRelations = relations(eventScheduleAssignments, ({ one }) => ({
  coordinator: one(coordinators, {
    fields: [eventScheduleAssignments.coordinatorId],
    references: [coordinators.id]
  }),
  eventSchedule: one(eventSchedules, {
    fields: [eventScheduleAssignments.eventScheduleId],
    references: [eventSchedules.id]
  }),
  transportation: one(transportation, {
    fields: [eventScheduleAssignments.transportationId],
    references: [transportation.id]
  })
}));
