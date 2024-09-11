import { CreateEventForm } from "@/components/events";
import { message } from "antd";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/create")({
  component: CreateEventPage,
});

function CreateEventPage() {
  const handleSubmit = (values: any) => {
    // Handle form submission, e.g., send data to an API
    console.log("Submitted values:", values);
    message.success("Event created successfully!");
    // Redirect to events list or the newly created event
  };

  const handleCancel = () => {
    // Handle cancellation, e.g., redirect to events list
    console.log("Form cancelled");
    // Use router to navigate back or to a specific page
  };

  return (
    <div className="p-6">
      <CreateEventForm />
    </div>
  );
}
