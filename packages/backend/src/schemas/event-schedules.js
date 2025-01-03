import { 
    pgTable,
    varchar,
    timestamp,
    integer,
    datetime
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  bookings,
  eventScheduleAssignments,
  eventScheduleCoordinators
} from "../schemas";

export const eventSchedules = pgTable("eventSchedules", {
  id: varchar("ID", { length: 12 }).primaryKey(),
  eventId: varchar("EventID", { length: 12 }),
  imageId: varchar("ImageID", { length: 12 }),
  dateFrom: datetime("DateFrom"),
  dateTo: datetime("DateTo"),
  maxJoiners: integer("MaxJoiners"),
  status: varchar("Status", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const eventSchedulesRelations = relations(eventSchedules, ({ one, many }) => ({
  event: one(events, {
    fields: [eventSchedules.eventId],
    references: [events.id]
  }),
  bookings: many(bookings),
  assignments: many(eventScheduleAssignments),
  coordinators: many(eventScheduleCoordinators)
}));
