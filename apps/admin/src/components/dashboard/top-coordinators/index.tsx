import React, { useState, useEffect } from "react";
import { RightOutlined, StarFilled } from "@ant-design/icons";
import { Avatar, Card, List, Rate, Typography, Skeleton, Empty } from "antd";

const { Text, Paragraph, Title } = Typography;

interface Coordinator {
  id: string;
  name: string;
  image: string;
  role: string;
  bio: string;
  rating: number;
}

const sampleCoordinators: Coordinator[] = [
  {
    id: "1",
    name: "Tana",
    image: "https://loremflickr.com/320/320/filipino,man",
    role: "Admin organizer",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Adam",
    image: "https://loremflickr.com/320/320/filipino,man",
    role: "Coordinator",
    bio: "Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes.",
    rating: 4.5,
  },
];

// Mock API function
const fetchTopCoordinators = (): Promise<Coordinator[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleCoordinators);
    }, 1500); // Simulate a 1.5 second delay
  });
};

const TopCoordinators: React.FC = () => {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCoordinators = async () => {
      setLoading(true);
      try {
        const data = await fetchTopCoordinators();
        setCoordinators(data);
      } catch (error) {
        console.error("Failed to fetch top coordinators:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCoordinators();
  }, []);

  const renderCoordinatorItem = (coordinator: Coordinator) => (
    <List.Item key={coordinator.id} className="border-b last:border-b-0 py-4">
      <div className="flex">
        <Avatar
          src={coordinator.image}
          size={100}
          className="mr-4 flex-shrink-0"
          style={{ objectFit: "cover" }}
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Text strong className="text-lg block mb-0">
                {coordinator.name}
              </Text>
              <Text type="secondary" className="text-sm">
                {coordinator.role}
              </Text>
            </div>
            <div className="flex items-center">
              <Rate
                allowHalf
                disabled
                defaultValue={coordinator.rating}
                character={<StarFilled />}
                className="text-yellow-400 text-sm"
              />
              <Text className="ml-2 text-base">
                {coordinator.rating.toFixed(1)}
              </Text>
            </div>
          </div>
          <Paragraph className="mb-2 text-sm">{coordinator.bio}</Paragraph>
          <a
            href="#"
            className="text-blue-500 hover:underline flex items-center text-sm"
          >
            View all comments
            <RightOutlined className="ml-1" />
          </a>
        </div>
      </div>
    </List.Item>
  );

  const renderSkeleton = () => (
    <List.Item>
      <Skeleton
        avatar={{ size: 100, shape: "circle" }}
        active
        paragraph={{ rows: 3 }}
      />
    </List.Item>
  );

  return (
    <Card
      className="shadow-md self-start"
      title={
        <Title level={4} className="mb-0">
          Top Coordinators
        </Title>
      }
      extra={
        <a href="#" className="text-blue-500 hover:underline">
          View All Coordinators
        </a>
      }
    >
      <List
        itemLayout="vertical"
        dataSource={loading ? Array(2).fill({}) : coordinators}
        renderItem={loading ? renderSkeleton : renderCoordinatorItem}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No coordinators found"
            />
          ),
        }}
      />
    </Card>
  );
};

export default TopCoordinators;
