import { CreateEventForm } from "@/components/events";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/create")({
  component: CreateEventPage,
});

function CreateEventPage() {
  return (
    <div className="p-6">
      <CreateEventForm />
    </div>
  );
}
