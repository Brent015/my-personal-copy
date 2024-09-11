import { EventsTable } from "@/components/events";
import { eventTableFilterSchema } from "@/components/events/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/")({
  component: EventsTable,
  validateSearch: eventTableFilterSchema,
});
