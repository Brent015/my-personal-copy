import React from "react";
import { Card, List, Typography, Rate, Image } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  StarFilled,
  RightOutlined,
} from "@ant-design/icons";
import { formatCurrency, formatNumber } from "@/utils/format";

const { Text, Title, Paragraph } = Typography;

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

const events: Event[] = [
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

const TopEvents: React.FC = () => {
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
        dataSource={events}
        renderItem={(event) => (
          <List.Item key={event.id} className="border-b last:border-b-0 py-4">
            <div className="flex gap-4">
              <Image
                width={80}
                height={80}
                src={event.image}
                alt={event.name}
                className="mr-4 flex-shrink-0 rounded-md object-cover"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Text strong className="text-xl block mb-0">
                      {event.name}
                    </Text>
                    <div className="flex items-center mt-1">
                      <Rate
                        disabled
                        defaultValue={event.rating}
                        character={<StarFilled />}
                        className="text-yellow-400 text-sm"
                      />
                      <Text className="ml-2 text-base">
                        {event.rating.toFixed(1)}
                      </Text>
                      <Text className="ml-2 text-sm text-gray-500">
                        ({event.reviewCount} reviews)
                      </Text>
                    </div>
                  </div>
                </div>
                <Paragraph className="mb-2 text-base">
                  <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                    <div className="flex items-center space-x-2">
                      <UserOutlined />
                      <Text>{formatNumber(event.bookings)} bookings</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarOutlined className="" />
                      <Text>{formatCurrency(event.earnings)} earnings</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutlined />
                      <Text>{event.completedSchedules} completed</Text>
                    </div>
                  </div>
                </Paragraph>
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
        )}
      />
    </Card>
  );
};

export default TopEvents;
