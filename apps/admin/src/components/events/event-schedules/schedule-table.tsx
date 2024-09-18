import React from "react";
import { Table, Tag, Button, Dropdown } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { Schedule } from "./types";
import { ColumnsType } from "antd/es/table";

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onCollection: (schedule: Schedule) => void;
  onAssignment: (schedule: Schedule) => void;
  onCancel: (schedule: Schedule) => void;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  schedules,
  onEdit,
  onCollection,
  onAssignment,
  onCancel,
}) => {
  const columns: ColumnsType<Schedule> = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
      sorter: (a: Schedule, b: Schedule) =>
        a.startDate.unix() - b.startDate.unix(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: Dayjs) => date.format("MMMM D, YYYY"),
      sorter: (a: Schedule, b: Schedule) => a.endDate.unix() - b.endDate.unix(),
    },
    {
      title: "Bookings",
      dataIndex: "bookings",
      key: "bookings",
      render: (bookings: number, record: Schedule) => (
        <span>
          {bookings} / {record.maxCapacity}
        </span>
      ),
      sorter: (a: Schedule, b: Schedule) => a.bookings - b.bookings,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      render: (paid: number) => `Php ${paid.toLocaleString()}`,
      sorter: (a: Schedule, b: Schedule) => a.paid - b.paid,
    },
    {
      title: "To collect",
      dataIndex: "toCollect",
      key: "toCollect",
      render: (toCollect: number) => `Php ${toCollect.toLocaleString()}`,
      sorter: (a: Schedule, b: Schedule) => a.toCollect - b.toCollect,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Schedule["status"]) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Ongoing"
                ? "blue"
                : status === "Upcoming"
                  ? "orange"
                  : "red"
          }
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Upcoming", value: "Upcoming" },
        { text: "Ongoing", value: "Ongoing" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      defaultFilteredValue: ["Upcoming", "Ongoing"],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Total Earnings",
      dataIndex: "totalEarnings",
      key: "totalEarnings",
      render: (revenue: number) => `Php ${revenue.toLocaleString()}`,
      sorter: (a: Schedule, b: Schedule) => a.totalEarnings - b.totalEarnings,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Schedule) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                icon: <EditOutlined />,
                label: "Edit",
                onClick: () => onEdit(record),
              },
              {
                key: "2",
                label: "Collection",
                icon: <MoneyCollectOutlined />,
                onClick: () => onCollection(record),
              },
              {
                key: "3",
                label: "Assignment",
                icon: <UserOutlined />,
                onClick: () => onAssignment(record),
              },
              {
                key: "4",
                label: "Cancel",
                icon: <DeleteOutlined />,
                onClick: () => onCancel(record),
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table<Schedule>
      pagination={false}
      columns={columns}
      dataSource={schedules}
      rowKey="id"
      size="middle"
      scroll={{ x: "max-content" }}
    />
  );
};
