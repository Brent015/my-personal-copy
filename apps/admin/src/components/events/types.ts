import { fallback } from "@tanstack/router-zod-adapter";
import { z } from "zod";
import { Schedule } from "./event-schedules/types";

export type Event = {
  key: string;
  image: string;
  event: string;
  location: string;
  earnings: number;
  totalBookings: number;
  activeSchedules: number;
  isActive: boolean;
};

// Define the fields that can be sorted
export const EventsSortableFieldSchema = z.enum([
  "earnings",
  "totalBookings",
  "activeSchedules",
]);

export type EventSortableField = z.infer<typeof EventsSortableFieldSchema>;

const ScheduleSortableFieldSchema = z.enum([
  "startDate",
  "endDate",
  "bookings",
  "paid",
  "toCollect",
  "status",
  "revenue",
]);

export type ScheduleSortableField = z.infer<typeof ScheduleSortableFieldSchema>;

// Define the sort direction
const SortDirectionSchema = z.enum(["ascend", "descend"]);

export type SortDirection = z.infer<typeof SortDirectionSchema>;

export const ScheduleFilterStatus = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

// Define custom types for enum values
export const FilterStatus = {
  ACTIVE: "true",
  INACTIVE: "false",
} as const;

export type FilterStatus = (typeof FilterStatus)[keyof typeof FilterStatus];

// Base filter schema with common properties
const baseFilterSchema = z.object({
  search: fallback(z.string(), "").optional(),
  startDate: fallback(z.string().nullable(), null).optional(),
  endDate: fallback(z.string().nullable(), null).optional(),
});

// Event table filter schema
export const eventsTableFilterSchema = z.object({
  search: fallback(z.string(), "").optional(),
  activeFilter: fallback(
    z.array(z.enum([FilterStatus.ACTIVE, FilterStatus.INACTIVE])),
    [FilterStatus.ACTIVE]
  ).default([FilterStatus.ACTIVE]),
  sortField: EventsSortableFieldSchema.optional(),
  sortOrder: SortDirectionSchema.optional(),
  expanded: fallback(z.string(), "").optional(),
});

export type EventTableFilterState = z.infer<typeof eventsTableFilterSchema>;

// Schedules table filter schema
export const schedulesTableFilterSchema = baseFilterSchema.extend({
  status: fallback(
    z.array(
      z.enum([
        ScheduleFilterStatus.UPCOMING,
        ScheduleFilterStatus.ONGOING,
        ScheduleFilterStatus.COMPLETED,
        ScheduleFilterStatus.CANCELLED,
      ])
    ),
    [ScheduleFilterStatus.UPCOMING, ScheduleFilterStatus.ONGOING]
  ).default([ScheduleFilterStatus.UPCOMING, ScheduleFilterStatus.ONGOING]),
  sortField: fallback(ScheduleSortableFieldSchema, "startDate").default(
    "startDate"
  ),
  sortOrder: fallback(SortDirectionSchema, "ascend").default("ascend"),
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
    z.array(
      z.enum([
        ScheduleFilterStatus.UPCOMING,
        ScheduleFilterStatus.ONGOING,
        ScheduleFilterStatus.COMPLETED,
        ScheduleFilterStatus.CANCELLED,
      ])
    ),
    [ScheduleFilterStatus.UPCOMING, ScheduleFilterStatus.ONGOING]
  ).optional(),
});

export type EventsTableFilterState = z.infer<typeof eventsTableFilterSchema>;

export type SchedulesTableFilterState = z.infer<
  typeof schedulesTableFilterSchema
>;

export type EventSchedulesTableFilterState = z.infer<
  typeof eventSchedulesTableFilterSchema
>;

// Helper function to create a filter state
export const createFilterState = <T extends z.ZodType>(
  schema: T
): z.infer<T> => {
  return schema.parse({});
};

export interface AllScheduleData extends Schedule {
  key: string;
  event: string;
  eventImage: string;
}
