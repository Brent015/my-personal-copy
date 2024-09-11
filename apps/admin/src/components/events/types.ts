import { fallback } from "@tanstack/router-zod-adapter";
import { z } from "zod";

export const ScheduleStatus = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

// Define custom types for enum values
export const FilterStatus = {
  ALL: "all",
  ACTIVE: "active",
  INACTIVE: "inactive",
  ...ScheduleStatus,
} as const;

export type FilterStatus = (typeof FilterStatus)[keyof typeof FilterStatus];

// Base filter schema with common properties
const baseFilterSchema = z.object({
  search: fallback(z.string(), "").optional(),
  startDate: fallback(
    z.string().nullable().pipe(z.coerce.date()),
    null
  ).optional(),
  endDate: fallback(
    z.string().nullable().pipe(z.coerce.date()),
    null
  ).optional(),
});

// Event table filter schema
export const eventTableFilterSchema = baseFilterSchema.extend({
  activeFilter: fallback(
    z.enum([FilterStatus.ALL, FilterStatus.ACTIVE, FilterStatus.INACTIVE]),
    FilterStatus.ALL
  ).optional(),
});

export type EventTableFilterState = z.infer<typeof eventTableFilterSchema>;

// Schedules table filter schema
export const schedulesTableFilterSchema = baseFilterSchema.extend({
  status: fallback(
    z.enum([
      FilterStatus.ALL,
      FilterStatus.UPCOMING,
      FilterStatus.ONGOING,
      FilterStatus.COMPLETED,
      FilterStatus.CANCELLED,
    ]),
    FilterStatus.ALL
  ).optional(),
});

// Schedules table filter schema
export const eventSchedulesTableFilterSchema = baseFilterSchema.extend({
  startDate: fallback(
    z.string().nullable().pipe(z.coerce.date()),
    null
  ).optional(),
  endDate: fallback(
    z.string().nullable().pipe(z.coerce.date()),
    null
  ).optional(),
  status: fallback(
    z.enum([
      FilterStatus.ALL,
      FilterStatus.UPCOMING,
      FilterStatus.ONGOING,
      FilterStatus.COMPLETED,
      FilterStatus.CANCELLED,
    ]),
    FilterStatus.ALL
  ).optional(),
});

export type SchedulesTableFilterState = z.infer<
  typeof schedulesTableFilterSchema
>;

// Helper function to create a filter state
export const createFilterState = <T extends z.ZodType>(
  schema: T
): z.infer<T> => {
  return schema.parse({});
};

export interface ScheduleData {
  key: string;
  event: string;
  eventImage: string;
  schedule: string;
  booked: string;
  maxGuests: number;
  paid: string;
  toCollect: string;
  totalEarnings: string;
  status: "upcoming" | "on-going" | "completed" | "cancelled";
}
