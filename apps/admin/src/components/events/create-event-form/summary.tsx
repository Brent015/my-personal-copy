import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Image,
  List,
  Tabs,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { EventFormData } from "./types"; // Adjust the import path

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

type EventSummaryProps = EventFormData;

const ActivitiesDisplay: React.FC<{ activities: string[] }> = ({
  activities,
}) => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 5;

  const displayedActivities = showAll
    ? activities
    : activities.slice(0, initialDisplayCount);
  const hasMore = activities.length > initialDisplayCount;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {displayedActivities.map((activity) => (
          <Tag key={activity} color="blue">
            {activity}
          </Tag>
        ))}
      </div>
      {hasMore && (
        <Button
          type="link"
          onClick={() => setShowAll(!showAll)}
          className="mt-2"
        >
          {showAll
            ? "Show less"
            : `Show ${activities.length - initialDisplayCount} more`}
        </Button>
      )}
    </div>
  );
};

const EventSummary: React.FC<EventSummaryProps> = ({
  eventName,
  eventHighlights,
  eventLocation,
  distance,
  eventImages,
  packages,
  requiredDownPayment,
  allowFullPayment,
  discounts,
}) => {
  return (
    <div className="p-4" aria-description="Event Summary">
      <Card className="mb-6">
        <Title level={3}>{eventName}</Title>
        <Paragraph className="mb-4">{eventHighlights}</Paragraph>
        <div className="flex items-center mb-2">
          <EnvironmentOutlined className="mr-2" />
          <Text>{eventLocation}</Text>
          <Text className="ml-4">{distance} km from Manila</Text>
        </div>
      </Card>

      <Card title="Event Images" className="mb-6">
        <Image.PreviewGroup>
          <div className="flex flex-wrap gap-4">
            {eventImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Event image ${index + 1}`}
                width={150}
                height={150}
                className="object-cover rounded"
              />
            ))}
          </div>
        </Image.PreviewGroup>
      </Card>

      <Card title="Packages" className="mb-6">
        <Tabs type="card">
          {packages.map((pkg, index) => (
            <TabPane tab={pkg.title || `Package ${index + 1}`} key={index}>
              <div className="flex items-center mb-4">
                <CalendarOutlined className="mr-2" />
                <Text strong>{pkg.duration} days</Text>
                <Divider type="vertical" />
                <DollarOutlined className="mr-2" />
                <Text strong>₱{pkg.price.toLocaleString()}</Text>
              </div>
              <Title level={5}>Activities</Title>
              <ActivitiesDisplay activities={pkg.activities} />
              <Descriptions column={1} className="mt-4">
                <Descriptions.Item
                  label="Inclusions"
                  className="whitespace-break-spaces"
                >
                  {pkg.inclusions}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Itinerary"
                  className="whitespace-break-spaces"
                >
                  {pkg.itinerary}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Exclusions"
                  className="whitespace-break-spaces"
                >
                  {pkg.exclusions}
                </Descriptions.Item>
                {pkg.notes && (
                  <Descriptions.Item
                    label="Notes"
                    className="whitespace-break-spaces"
                  >
                    {pkg.notes}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </TabPane>
          ))}
        </Tabs>
      </Card>

      <Card title="Payment Details" className="mb-6">
        <Descriptions column={2}>
          <Descriptions.Item label="Required Down Payment">
            ₱{requiredDownPayment.toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Allow Full Payment">
            {allowFullPayment ? "Yes" : "No"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Discounts">
        <List
          dataSource={discounts}
          renderItem={(discount) => (
            <List.Item>
              <Card
                title={discount.name}
                size="small"
                className="w-full"
                extra={
                  <Tag
                    color={discount.type === "percentage" ? "green" : "blue"}
                  >
                    {discount.type === "percentage"
                      ? `${discount.value}%`
                      : `₱${discount.value}`}
                  </Tag>
                }
              >
                <Text>
                  {discount.validity ? (
                    <>
                      <CalendarOutlined className="mr-2" />
                      Valid until:{" "}
                      {new Date(discount.validity).toLocaleDateString()}
                    </>
                  ) : (
                    <>
                      <ClockCircleOutlined className="mr-2" />
                      No expiration date
                    </>
                  )}
                </Text>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default EventSummary;
