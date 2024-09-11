import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useMatch,
} from "@tanstack/react-router";
import { Card, Tabs } from "antd";

export const Route = createFileRoute("/dashboard/events")({
  component: EventsLayout,
});

function EventsLayout() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const items = [
    {
      key: "1",
      label: <Link to="/dashboard/events">Events</Link>,
    },
    {
      key: "2",
      label: <Link to="/dashboard/events/schedules">Schedules</Link>,
    },
  ];

  const isEvent = useMatch({
    from: "/dashboard/events/$eventId/",
    shouldThrow: false,
  });
  const isEventEdit = useMatch({
    from: "/dashboard/events/$eventId/edit",
    shouldThrow: false,
  });
  const isAddSchedule = useMatch({
    from: "/dashboard/events/$eventId/add-schedule",
    shouldThrow: false,
  });
  const isViewSchedules = useMatch({
    from: "/dashboard/events/$eventId/schedules",
    shouldThrow: false,
  });

  return (
    <Card>
      {!isEventEdit && !isAddSchedule && !isViewSchedules && !isEvent && (
        <Tabs
          activeKey={pathname.includes("/schedules") ? "2" : "1"}
          items={items}
        />
      )}

      <Outlet />
    </Card>
  );
}
