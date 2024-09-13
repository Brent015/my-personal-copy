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
import { EventData } from "./types";

const ExpandedRowContent: React.FC<{ record: EventData }> = ({ record }) => {
  const [activeTab, setActiveTab] = useState("1");

  const stats = [
    { icon: <UserOutlined />, value: 5202, label: "Travelers" },
    { icon: <CommentOutlined />, value: 2123, label: "Reviews" },
    { icon: <CalendarOutlined />, value: 213, label: "Schedules" },
    { icon: <DollarOutlined />, value: "₱446,000", label: "Revenue" },
  ];

  const scheduleBreakdown = {
    completed: 150,
    canceled: 13,
    upcoming: 50,
    total: 213,
  };

  const upcomingSchedules = [
    { date: "2024-08-25", time: "09:00 AM", spots: 15 },
    { date: "2024-09-01", time: "10:30 AM", spots: 20 },
    { date: "2024-09-08", time: "08:00 AM", spots: 18 },
    { date: "2024-09-15", time: "11:00 AM", spots: 12 },
  ];

  const renderOverviewTab = () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            {React.cloneElement(stat.icon, {
              className: "text-2xl mb-2 text-blue-500",
            })}
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </Card>
        ))}
      </div>
      <p className="text-gray-600">
        Experience the breathtaking beauty of the Banaue Rice Terraces, an
        iconic landmark showcasing ancient Filipino ingenuity and natural
        splendor.
      </p>
    </>
  );

  const renderScheduleDetailsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Schedule Breakdown</h3>
        <div className="flex justify-around items-center">
          <div className="text-center">
            <Progress
              type="circle"
              percent={Math.round(
                (scheduleBreakdown.completed / scheduleBreakdown.total) * 100
              )}
              format={() => (
                <div>
                  <CheckCircleOutlined className="text-green-500" />
                  <div>{scheduleBreakdown.completed}</div>
                  <div className="text-xs">Completed</div>
                </div>
              )}
              strokeColor="#52c41a"
            />
          </div>
          <div className="text-center">
            <Progress
              type="circle"
              percent={Math.round(
                (scheduleBreakdown.canceled / scheduleBreakdown.total) * 100
              )}
              format={() => (
                <div>
                  <CloseCircleOutlined className="text-red-500" />
                  <div>{scheduleBreakdown.canceled}</div>
                  <div className="text-xs">Canceled</div>
                </div>
              )}
              strokeColor="#ff4d4f"
            />
          </div>
          <div className="text-center">
            <Progress
              type="circle"
              percent={Math.round(
                (scheduleBreakdown.upcoming / scheduleBreakdown.total) * 100
              )}
              format={() => (
                <div>
                  <ClockCircleOutlined className="text-blue-500" />
                  <div>{scheduleBreakdown.upcoming}</div>
                  <div className="text-xs">Upcoming</div>
                </div>
              )}
              strokeColor="#1890ff"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Upcoming Schedules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSchedules.map((schedule, index) => (
            <Card key={index} size="small" hoverable>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{schedule.date}</div>
                  <div className="text-gray-500">{schedule.time}</div>
                </div>
                <Tooltip title="Available spots">
                  <div className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                    {schedule.spots} spots
                  </div>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: renderOverviewTab(),
    },
    {
      key: "2",
      label: "Schedule Details",
      children: renderScheduleDetailsTab(),
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
            alt="Banaue Rice Terraces"
            className="rounded"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">Banaue Rice Terraces</h2>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">4.8</h3>
              <Rate
                allowHalf
                disabled
                defaultValue={5}
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
