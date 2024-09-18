import { EventsTable } from "@/components/events";
import { eventsTableFilterSchema } from "@/components/events/types";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";

export const Route = createFileRoute("/dashboard/events/")({
  component: EventsTable,
  validateSearch: zodSearchValidator(eventsTableFilterSchema),
});
