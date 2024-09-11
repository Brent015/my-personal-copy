import EditEventForm from "@/components/events/edit-event-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/events/$eventId/edit")({
  component: EditEventForm,
});
