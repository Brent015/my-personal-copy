import { CreateScheduleForm } from "@/components/events";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "antd";

export const Route = createFileRoute("/dashboard/events/$eventId/add-schedule")(
  {
    component: AddSchedulePage,
  }
);

function AddSchedulePage() {
  //   const event = await fetchEventData(params.eventId);
  const event = {
    id: "1",
    name: "Beach Getaway",
    image: "https://loremflickr.com/320/320/philippines,beach",
  };

  if (!event) {
    // This could be handled by a not-found.tsx file in the same directory
    return <div>Event not found</div>;
  }

  return (
    <div className="p-6">
      <Breadcrumb
        className="mb-4"
        items={[
          {
            title: <Link to="/dashboard/events">Events</Link>,
          },
          {
            title: (
              <Link
                to="/dashboard/events/$eventId/add-schedule"
                params={{ eventId: "1" }}
              >
                Bali Adventure Retreat
              </Link>
            ),
          },
          {
            title: "Add Schedule",
          },
        ]}
      ></Breadcrumb>

      <CreateScheduleForm
        event={event}
        onSubmit={(schedule) => {
          console.log(schedule);
        }}
      />
    </div>
  );
}
