import EventSchedulesDashboard from "@/components/events/event-schedules";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/$eventId/schedules")({
  component: EventSchedulesDashboard,
});
