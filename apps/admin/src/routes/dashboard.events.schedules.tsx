import { SchedulesTable } from "@/components/events";
import { schedulesTableFilterSchema } from "@/components/events/types";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";

export const Route = createFileRoute("/dashboard/events/schedules")({
  component: SchedulesTable,
  validateSearch: zodSearchValidator(schedulesTableFilterSchema),
});
