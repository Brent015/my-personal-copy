import { SchedulesTable } from "@/components/events";
import { schedulesTableFilterSchema } from "@/components/events/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/schedules")({
  component: SchedulesTable,
  validateSearch: schedulesTableFilterSchema,
});
