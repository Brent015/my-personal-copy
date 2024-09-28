import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  List,
  Progress,
  Tag,
  Typography,
  Skeleton,
  Empty,
  Button,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Schedule {
  id: number;
  title: string;
  date: string;
  participants: number;
  maxParticipants: number;
  image: string;
}

const UpcomingSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Replace this with actual API call in the future
        setSchedules([
          {
            id: 1,
            title: "White Beach, Boracay",
            date: "April 11 - 15, 2023",
            participants: 13,
            maxParticipants: 20,
            image: "https://loremflickr.com/320/240/philippines,beach",
          },
          {
            id: 2,
            title: "Chocolate Hills, Bohol",
            date: "May 20 - 25, 2023",
            participants: 18,
            maxParticipants: 25,
            image: "https://loremflickr.com/320/240/philippines,hills",
          },
          {
            id: 3,
            title: "El Nido, Palawan",
            date: "June 5 - 10, 2023",
            participants: 10,
            maxParticipants: 15,
            image: "https://loremflickr.com/320/240/philippines,beach",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
        // Optionally, you could set an error state here and display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const renderListItem = (item: Schedule) => (
    <List.Item key={item.id}>
      <List.Item.Meta
        avatar={
          <Image
            width={80}
            height={80}
            src={item.image}
            alt={item.title}
            className="rounded-md object-cover"
          />
        }
        title={
          <div className="flex justify-between items-center">
            <Text strong className="text-lg">
              {item.title}
            </Text>
            <Tag color="blue">Ongoing</Tag>
          </div>
        }
        description={
          <div className="space-y-2">
            <Text type="secondary">
              <CalendarOutlined className="mr-2" />
              {item.date}
            </Text>
            <div>
              <Text>{`${item.participants}/${item.maxParticipants} participants`}</Text>
              <Progress
                percent={Math.round(
                  (item.participants / item.maxParticipants) * 100
                )}
                size="small"
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            </div>
          </div>
        }
      />
    </List.Item>
  );

  const renderLoadingState = () => (
    <>
      {[...Array(3)].map((_, index) => (
        <List.Item key={`loading-${index}`}>
          <Skeleton avatar active paragraph={{ rows: 2 }} />
        </List.Item>
      ))}
    </>
  );

  const renderContent = () => {
    if (loading) {
      return <List itemLayout="horizontal">{renderLoadingState()}</List>;
    }

    if (schedules.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No upcoming schedules"
        >
          <Button type="primary">Create a schedule</Button>
        </Empty>
      );
    }

    return (
      <List
        rowKey={(item) => item.id}
        itemLayout="horizontal"
        dataSource={schedules}
        renderItem={renderListItem}
      />
    );
  };

  return (
    <Card
      title={
        <Title level={4} className="mb-0">
          Upcoming Schedules
        </Title>
      }
      extra={
        <a href="#" className="text-blue-500 hover:underline">
          View All
        </a>
      }
      className="shadow-md h-full"
    >
      {renderContent()}
    </Card>
  );
};

export default UpcomingSchedule;
