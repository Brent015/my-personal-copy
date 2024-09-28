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
  Card,
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
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { Event, EventTableFilterState, FilterStatus } from "../types";

const data: Event[] = [
  {
    key: "1",
    image: "https://loremflickr.com/320/240/philippines,beach",
    event: "Jimbaran Beach",
    location: "Zimbabwe",
    earnings: 9970,
    totalBookings: 250,
    activeSchedules: 20,
    isActive: true,
  },
  {
    key: "2",
    image: "https://loremflickr.com/320/240/philippines,beach",
    event: "Jimbaran beach",
    location: "Zimbabwe",
    earnings: 9970,
    totalBookings: 250,
    activeSchedules: 20,
    isActive: false,
  },
];

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
  const search = getRouteApi("/dashboard/events/").useSearch();
  const navigate = useNavigate({ from: "/dashboard/events/" });
  console.log("search", search);
  // const { filteredData, handleFilterChange } = useTableFilters<EventData>(data);

  const handleVisibilityToggle = async (eventId: string, visible: boolean) => {
    console.log(eventId, visible);
  };

  const columns: ColumnsType<Event> = [
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
      defaultSortOrder:
        search.sortField === "earnings" ? search.sortOrder : null,
      sorter: (a, b) => a.earnings - b.earnings,
    },
    {
      title: "Total Bookings",
      dataIndex: "totalBookings",
      key: "totalBookings",
      defaultSortOrder:
        search.sortField === "totalBookings" ? search.sortOrder : null,
      sorter: (a, b) => a.totalBookings - b.totalBookings,
    },
    {
      title: "Active Schedules",
      dataIndex: "activeSchedules",
      key: "activeSchedules",
      defaultSortOrder:
        search.sortField === "activeSchedules" ? search.sortOrder : null,
      sorter: (a, b) => a.activeSchedules - b.activeSchedules,
    },
    {
      title: "Visibility",
      dataIndex: "isActive",
      key: "visibility",
      render: (_, record) => (
        <VisibilityToggle
          isVisible={record.isActive}
          onToggle={(visible) => handleVisibilityToggle(record.key, visible)}
          eventName={record.event}
        />
      ),
      filters: [
        { text: "Visible", value: FilterStatus.ACTIVE },
        { text: "Hidden", value: FilterStatus.INACTIVE },
      ],
      filteredValue: search.activeFilter,
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
                    View
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
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card>
      <Table<Event>
        rowKey="key"
        title={() => <EventTableFilters />}
        expandable={{
          onExpand: (expanded, row) => {
            navigate({
              search: (prev) => ({
                ...prev,
                expanded: expanded ? row.key : undefined,
              }),
            });
          },
          expandedRowKeys: search.expanded ? [search.expanded] : [],
          expandedRowRender: (record) => <ExpandedRowContent record={record} />,
        }}
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ overflow: "hidden" }}
        aria-label="Events table"
        onChange={(_, filters, sorter) => {
          const sorterResult = Array.isArray(sorter) ? sorter[0] : sorter;
          navigate({
            search: (prev) => ({
              ...prev,
              sortField:
                sorterResult.field as EventTableFilterState["sortField"],
              sortOrder:
                sorterResult.order as EventTableFilterState["sortOrder"],
              activeFilter:
                filters.status as EventTableFilterState["activeFilter"],
            }),
          });
        }}
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
    </Card>
  );
};

export default EventsTable;
