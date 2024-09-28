import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Typography,
  Rate,
  Image,
  Skeleton,
  Empty,
  Button,
} from "antd";
import {
  UserOutlined,
  DollarOutlined,
  StarFilled,
  CheckCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { formatCurrency, formatNumber } from "@/utils/format";
import imageFallback from "@/assets/images/image-fallback.png";

const { Text, Title } = Typography;

interface Event {
  id: string;
  name: string;
  image: string;
  bookings: number;
  earnings: number;
  completedSchedules: number;
  rating: number;
  reviewCount: number;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    name: "Rizal Park, Manila",
    image: "https://loremflickr.com/320/320/philippines,beach",
    bookings: 1005,
    earnings: 500018,
    completedSchedules: 13,
    rating: 4.8,
    reviewCount: 5,
  },
  {
    id: "2",
    name: "Boracay Island",
    image: "https://loremflickr.com/320/320/philippines,beach",
    bookings: 1205,
    earnings: 600020,
    completedSchedules: 15,
    rating: 4.9,
    reviewCount: 7,
  },
];

// Mock API function
const fetchTopEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleEvents);
    }, 1500); // Simulate a 1.5 second delay
  });
};

const TopEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchTopEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch top events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const renderEventItem = (event: Event) => (
    <List.Item key={event.id} className="border-b last:border-b-0 py-4">
      <div className="flex gap-4">
        <Image
          width={100}
          height={100}
          src={event.image}
          alt={event.name}
          className="flex-shrink-0 rounded-md object-cover"
          fallback={imageFallback}
        />
        <div className="flex-grow">
          <Title level={5} className="mb-1">
            {event.name}
          </Title>
          <div className="flex items-center mb-2">
            <Rate
              disabled
              defaultValue={event.rating}
              character={<StarFilled />}
              className="text-yellow-400 text-sm"
            />
            <Text className="ml-2 text-sm">
              {event.rating.toFixed(1)} ({event.reviewCount} reviews)
            </Text>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 bg-blue-50 p-2 rounded-l-md">
              <Text className="text-blue-600 block text-xs">
                <UserOutlined className="mr-1" />
                Bookings
              </Text>
              <Text strong>{formatNumber(event.bookings)}</Text>
            </div>
            <div className="flex-1 bg-green-50 p-2 rounded-r-md">
              <Text className="text-green-600 block text-xs">
                <DollarOutlined className="mr-1" />
                Earnings
              </Text>
              <Text strong>{formatCurrency(event.earnings)}</Text>
            </div>
          </div>
          <div className="mb-2">
            <Text className="text-gray-600 text-xs">
              <CheckCircleOutlined className="mr-1" />
              Completed Schedules
            </Text>
            <Text strong className="ml-2">
              {event.completedSchedules}
            </Text>
          </div>
          <a
            href="#"
            className="text-blue-500 hover:underline flex items-center text-sm"
          >
            View event details
            <RightOutlined className="ml-1" />
          </a>
        </div>
      </div>
    </List.Item>
  );

  const renderSkeleton = () => (
    <List.Item>
      <Skeleton active avatar paragraph={{ rows: 4 }} />
    </List.Item>
  );

  return (
    <Card
      className="shadow-md self-start"
      title={
        <Title level={4} className="mb-0">
          Top Events
        </Title>
      }
      extra={
        <a href="#" className="text-blue-500 hover:underline">
          View All Events
        </a>
      }
    >
      <List
        itemLayout="vertical"
        dataSource={loading ? Array(2).fill({}) : events}
        renderItem={loading ? renderSkeleton : renderEventItem}
        locale={{
          emptyText: (
            <div>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No events found"
              />
              <Button type="primary">Create a schedule</Button>
            </div>
          ),
        }}
      />
    </Card>
  );
};

export default TopEvents;
