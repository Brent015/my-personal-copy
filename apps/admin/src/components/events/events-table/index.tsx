import {
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Image,
  Space,
  Switch,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

import ExpandedRowContent from "./expanded-row-content";
import EventTableFilters from "./filters";
import { Link } from "@tanstack/react-router";

const data = [
  {
    key: "1",
    image: "https://loremflickr.com/320/240/philippines,beach",
    event: "Jimbaran Beach",
    location: "Zimbabwe",
    earnings: "9,970 php",
    totalBookings: "250",
    activeSchedules: "20",
    isActive: true,
  },
  {
    key: "2",
    image: "https://loremflickr.com/320/240/philippines,beach",
    event: "Jimbaran beach",
    location: "30 guests",
    earnings: "9,970 php",
    totalBookings: "25,874 php",
    activeSchedules: "20",
    isActive: false,
  },
];

type EventData = (typeof data)[number];

const { Text } = Typography;

interface VisibilityToggleProps {
  isVisible: boolean;
  onToggle: (visible: boolean) => void;
  eventName: string;
}

const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  isVisible,
  onToggle,
  eventName,
}) => {
  return (
    <Tooltip title={`${isVisible ? "Hide" : "Show"} "${eventName}"`}>
      <Space>
        <Switch
          checkedChildren={<EyeOutlined />}
          unCheckedChildren={<EyeInvisibleOutlined />}
          checked={isVisible}
          onChange={onToggle}
        />
        <Text>{isVisible ? "Visible" : "Hidden"}</Text>
      </Space>
    </Tooltip>
  );
};

const EventsTable: React.FC = () => {
  // const { filteredData, handleFilterChange } = useTableFilters<EventData>(data);

  const handleVisibilityToggle = async (eventId: string, visible: boolean) => {
    console.log(eventId, visible);
  };

  const columns: ColumnsType<EventData> = [
    {
      dataIndex: "image",
      key: "thumbnail",
      render: (image: string) => (
        <Image
          className="rounded-md"
          src={image}
          alt="Event thumbnail"
          width={80}
          height={60}
        />
      ),
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (event: string) => (
        <>
          <div>{event}</div>
        </>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Earnings",
      dataIndex: "earnings",
      key: "earnings",
    },
    {
      title: "Total Bookings",
      dataIndex: "totalBookings",
      key: "totalBookings",
    },
    {
      title: "Active Schedules",
      dataIndex: "activeSchedules",
      key: "activeSchedules",
    },
    {
      title: "Visibility",
      key: "visibility",
      render: (_, record) => (
        <VisibilityToggle
          isVisible={record.isActive}
          onToggle={(visible) => handleVisibilityToggle(record.key, visible)}
          eventName={record.event}
        />
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                icon: <InfoCircleOutlined />,
                label: (
                  <Link
                    to="/dashboard/events/$eventId"
                    params={{ eventId: "1" }}
                  >
                    View Details
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <EditOutlined />,
                label: (
                  <Link
                    to="/dashboard/events/$eventId/edit"
                    params={{ eventId: "1" }}
                  >
                    Edit Details
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <CalendarOutlined />,
                label: "View Schedules",
              },
            ],
          }}
          placement="bottomLeft"
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table<EventData>
      title={() => <EventTableFilters />}
      expandable={{
        expandedRowRender: (record) => <ExpandedRowContent record={record} />,
      }}
      size="small"
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ overflow: "hidden" }}
      aria-label="Events table"
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={12}>
            <div role="status" aria-live="polite">
              Total {data.length} events listed
            </div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      )}
    />
  );
};

export default EventsTable;
