import React, { useState } from "react";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  DollarOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Image, Progress, Rate, Tabs, Tooltip } from "antd";
import type { TabsProps } from "antd";
import { Event } from "../../types";

// Types

interface Stat {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

interface ScheduleBreakdown {
  completed: number;
  canceled: number;
  upcoming: number;
  ongoing: number;
  total: number;
}

interface Schedule {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  spots: number;
  bookedSpots: number;
}

// Sub-components
const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
  <Card className="text-center">
    {React.cloneElement(stat.icon as React.ReactElement, {
      className: "text-2xl mb-2 text-blue-500",
    })}
    <div className="text-xl font-bold">{stat.value}</div>
    <div className="text-sm text-gray-500">{stat.label}</div>
  </Card>
);

const ScheduleBreakdownChart: React.FC<{ breakdown: ScheduleBreakdown }> = ({
  breakdown,
}) => (
  <div className="flex justify-around items-center">
    <ProgressCircle
      value={breakdown.completed}
      total={breakdown.total}
      icon={<CheckCircleOutlined className="text-green-500" />}
      label="Completed"
      color="#52c41a"
    />
    <ProgressCircle
      value={breakdown.canceled}
      total={breakdown.total}
      icon={<CloseCircleOutlined className="text-red-500" />}
      label="Canceled"
      color="#ff4d4f"
    />
    <ProgressCircle
      value={breakdown.ongoing}
      total={breakdown.total}
      icon={<ClockCircleOutlined className="text-blue-500" />}
      label="Ongoing"
      color="#1890ff"
    />
    <ProgressCircle
      value={breakdown.upcoming}
      total={breakdown.total}
      icon={<CalendarOutlined className="text-orange-500" />}
      label="Upcoming"
      color="#faad14"
    />
  </div>
);

const ProgressCircle: React.FC<{
  value: number;
  total: number;
  icon: React.ReactNode;
  label: string;
  color: string;
}> = ({ value, total, icon, label, color }) => (
  <div className="text-center">
    <Progress
      type="circle"
      percent={Math.round((value / total) * 100)}
      format={() => (
        <div>
          {icon}
          <div>{value}</div>
          <div className="text-xs">{label}</div>
        </div>
      )}
      strokeColor={color}
    />
  </div>
);

const ScheduleCard: React.FC<{ schedule: Schedule; isOngoing: boolean }> = ({
  schedule,
  isOngoing,
}) => (
  <Card
    size="small"
    hoverable
    className={isOngoing ? "border-blue-500 border-2" : ""}
  >
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold">{schedule.name}</div>
        <div className="text-gray-500">
          {schedule.startDate} - {schedule.endDate}
        </div>
      </div>
      <Tooltip title={`${schedule.bookedSpots}/${schedule.spots} spots filled`}>
        <div
          className={`py-1 px-2 rounded-full ${isOngoing ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}
        >
          {schedule.spots - schedule.bookedSpots} spots left
        </div>
      </Tooltip>
    </div>
    {isOngoing && (
      <Progress
        percent={Math.round((schedule.bookedSpots / schedule.spots) * 100)}
        size="small"
        status="active"
        className="mt-2"
      />
    )}
  </Card>
);

// Main component
const ExpandedRowContent: React.FC<{ record: Event }> = ({ record }) => {
  const [activeTab, setActiveTab] = useState("1");

  const stats: Stat[] = [
    { icon: <UserOutlined />, value: 5202, label: "Travelers" },
    { icon: <CommentOutlined />, value: 2123, label: "Reviews" },
    { icon: <CalendarOutlined />, value: 213, label: "Schedules" },
    { icon: <DollarOutlined />, value: "₱446,000", label: "Revenue" },
  ];

  const scheduleBreakdown: ScheduleBreakdown = {
    completed: 150,
    canceled: 13,
    ongoing: 12,
    upcoming: 38,
    total: 213,
  };

  const ongoingSchedules: Schedule[] = [
    {
      id: "1",
      name: "Mountain Trek",
      startDate: "2024-08-20",
      endDate: "2024-08-23",
      spots: 20,
      bookedSpots: 18,
    },
    {
      id: "2",
      name: "Cultural Tour",
      startDate: "2024-08-22",
      endDate: "2024-08-24",
      spots: 15,
      bookedSpots: 10,
    },
  ];

  const upcomingSchedules: Schedule[] = [
    {
      id: "3",
      name: "Beach Getaway",
      startDate: "2024-08-25",
      endDate: "2024-08-28",
      spots: 25,
      bookedSpots: 15,
    },
    {
      id: "4",
      name: "City Explorer",
      startDate: "2024-09-01",
      endDate: "2024-09-03",
      spots: 30,
      bookedSpots: 12,
    },
    {
      id: "5",
      name: "Nature Retreat",
      startDate: "2024-09-08",
      endDate: "2024-09-11",
      spots: 20,
      bookedSpots: 8,
    },
    {
      id: "6",
      name: "Island Hopping",
      startDate: "2024-09-15",
      endDate: "2024-09-18",
      spots: 18,
      bookedSpots: 16,
    },
  ];

  const OverviewTab: React.FC = () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      <p className="text-gray-600">
        Experience the breathtaking beauty of the {record.event}, an iconic
        landmark showcasing ancient Filipino ingenuity and natural splendor.
      </p>
    </>
  );

  const ScheduleDetailsTab: React.FC = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Schedule Breakdown</h3>
        <ScheduleBreakdownChart breakdown={scheduleBreakdown} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ongoing Schedules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ongoingSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              isOngoing={true}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Schedules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              isOngoing={false}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <OverviewTab />,
    },
    {
      key: "2",
      label: "Schedule Details",
      children: <ScheduleDetailsTab />,
    },
  ];

  return (
    <Card className="w-full shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <Image
            width={100}
            height={75}
            src={record.image}
            alt={record.event}
            className="rounded object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">{record.event}</h2>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">4.8</h3>
              <Rate
                allowHalf
                disabled
                defaultValue={4.8}
                className="text-yellow-400"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button icon={<PictureOutlined />}>View Gallery</Button>
          <Button icon={<InfoCircleOutlined />}>See Guest Reviews</Button>
        </div>
      </div>
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
    </Card>
  );
};

export default ExpandedRowContent;
