import EventSummary from "@/components/events/create-event-form/summary";
import { sampleEventData } from "@/components/events/create-event-form/types";
import {
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb, Button, Dropdown, Space } from "antd";

export const Route = createFileRoute("/dashboard/events/$eventId/")({
  component: EventDetailsPage,
});

function EventDetailsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb
          className="ml-4 text-md"
          items={[
            {
              title: <Link to="/dashboard/events">Events</Link>,
            },
            {
              title: (
                <Link
                  className="text-slate-800"
                  to="/dashboard/events/$eventId"
                  params={{ eventId: "1" }}
                >
                  Bali Adventure Retreat
                </Link>
              ),
            },
          ]}
        />
        <Space>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "2",
                  icon: <EditOutlined />,
                  label: (
                    <Link
                      to="/dashboard/events/$eventId/edit"
                      params={{ eventId: "1" }}
                    >
                      Edit
                    </Link>
                  ),
                },
                {
                  key: "3",
                  icon: <CalendarOutlined />,
                  label: (
                    <Link
                      to="/dashboard/events/$eventId/schedules"
                      params={{ eventId: "1" }}
                    >
                      Schedules
                    </Link>
                  ),
                },
              ],
            }}
            placement="bottomLeft"
          >
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      </div>
      <EventSummary {...sampleEventData} />
    </div>
  );
}
