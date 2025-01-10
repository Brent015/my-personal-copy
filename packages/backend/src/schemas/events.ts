import { 
  pgTable, 
  text,
  serial
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  events,
  eventPackages,
  eventSchedules,
  bookings,
  tourAgency
} from "../schemas";

export const events = pgTable("events", {
  id: serial("ID").primaryKey(),
  title: text("Title").notNull(),
  shortDescription: text("ShortDescription").notNull(),
  locationId: text("LocationId").notNull(),
  longDescription: text("LongDescription").notNull(),
  agencyId: text("AgencyId").notNull(),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
  longitude: text("Longitude").notNull(),
  latitude: text("Latitude").notNull(),
  distance: text("Distance").notNull(),
  visibility: text("Visibility").notNull(),
});

export const eventsRelations = relations(events, ({ many, one }) => ({
  packages: many(eventPackages),
  schedules: many(eventSchedules),
  bookings: many(bookings),
  agency: one(tourAgency, {
    fields: [events.agencyId],
    references: [tourAgency.id]
  })
}));
