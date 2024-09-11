import { Table, Tag } from "antd";
import React from "react";
import { Schedule } from "./types";

interface SchedulesTableProps {
  data: Schedule[];
}

const EventSchedulesTable: React.FC<SchedulesTableProps> = ({ data }) => {
  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Guests",
      dataIndex: "bookedGuests",
      key: "guests",
      render: (bookedGuests: number, record: Schedule) =>
        `${bookedGuests}/${record.maxGuests}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Coordinator",
      dataIndex: ["coordinator", "name"],
      key: "coordinator",
    },
    {
      title: "Vehicle",
      dataIndex: ["vehicle", "name"],
      key: "vehicle",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Schedule["status"]) => (
        <Tag
          color={
            status === "upcoming"
              ? "blue"
              : status === "ongoing"
                ? "green"
                : status === "completed"
                  ? "orange"
                  : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <Table pagination={false} columns={columns} dataSource={data} rowKey="id" />
  );
};

export default EventSchedulesTable;
