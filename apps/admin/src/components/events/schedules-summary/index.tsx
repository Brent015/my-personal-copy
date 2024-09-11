import React from "react";
import { Card, Table } from "antd";
import { formatDate } from "@/utils/format";

interface ScheduleSummaryViewProps {
  schedules: Array<{
    startDate: Date;
    endDate: Date;
    maxGuests: number;
    coordinatorId?: string;
    vehicleId?: string;
  }>;
}
// Sample data for coordinators
const sampleCoordinators = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
  { id: "5", name: "Chris Lee" },
];

// Sample data for vehicles
const sampleVehicles = [
  { id: "1", name: "Van - Toyota HiAce" },
  { id: "2", name: "Bus - Hyundai County" },
  { id: "3", name: "Car - Honda Civic" },
  { id: "4", name: "SUV - Ford Everest" },
  { id: "5", name: "Minibus - Mercedes-Benz Sprinter" },
];

const ScheduleSummary: React.FC<ScheduleSummaryViewProps> = ({ schedules }) => {
  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: Date) => formatDate(date),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: Date) => formatDate(date),
    },
    {
      title: "Max Guests",
      dataIndex: "maxGuests",
      key: "maxGuests",
    },
    {
      title: "Coordinator",
      dataIndex: "coordinatorId",
      key: "coordinatorId",
      render: (id: string) =>
        sampleCoordinators.find((c) => c.id === id)?.name || "Not assigned",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleId",
      key: "vehicleId",
      render: (id: string) =>
        sampleVehicles.find((v) => v.id === id)?.name || "Not assigned",
    },
    {
      title: "Status",
      dataIndex: "vehicleId",
      key: "vehicleId",
      render: (id: string) =>
        sampleVehicles.find((v) => v.id === id)?.name || "Not assigned",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleId",
      key: "vehicleId",
      render: (id: string) =>
        sampleVehicles.find((v) => v.id === id)?.name || "Not assigned",
    },
  ];

  return (
    <Card title="Summary of Schedules" className="mb-6">
      <Table
        size="small"
        dataSource={schedules}
        columns={columns}
        rowKey={(_, index) => index!.toString()}
        pagination={false}
      />
    </Card>
  );
};

export default ScheduleSummary;
