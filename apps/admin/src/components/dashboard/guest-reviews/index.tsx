import { RightOutlined, StarFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Rate,
  Row,
  Typography
} from "antd";
import React from "react";

const { Text, Title, Paragraph } = Typography;

interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingCounts: {
    excellent: number;
    good: number;
    average: number;
    bad: number;
    poor: number;
  };
}

interface Review {
  id: string;
  reviewerImage: string;
  rating: number;
  reviewerName: string;
  isMasked: boolean;
  title: string;
  content: string;
}

// const defaultSummary: ReviewSummary = {
//   averageRating: 0,
//   totalReviews: 0,
//   ratingCounts: {
//     excellent: 0,
//     good: 0,
//     average: 0,
//     bad: 0,
//     poor: 0,
//   },
// };

const summary: ReviewSummary = {
  averageRating: 5.0,
  totalReviews: 291,
  ratingCounts: {
    excellent: 90,
    good: 84,
    average: 72,
    bad: 33,
    poor: 12,
  },
};

const recentReviews: Review[] = [
  {
    id: "1",
    reviewerImage: "https://loremflickr.com/320/240/philippines,women",
    rating: 4.5,
    reviewerName: "John Doe",
    isMasked: false,
    title: "Great experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
  },
  {
    id: "2",
    reviewerImage: "https://loremflickr.com/320/240/philippines,women",
    rating: 4.5,
    reviewerName: "John Doe",
    isMasked: false,
    title: "Great experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
  },
  {
    id: "3",
    reviewerImage: "https://loremflickr.com/320/240/philippines,women",
    rating: 4.5,
    reviewerName: "John Doe",
    isMasked: false,
    title: "Great experience!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
  },
];

const GuestReviews: React.FC = () => {
  const { averageRating, totalReviews, ratingCounts } = summary;

  const renderRatingBar = (label: string, count: number) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return (
      <div className="flex items-center mb-2 gap-3">
        <Text className="w-20">{label}</Text>
        <Progress percent={percentage} showInfo={false} className="flex-1" />
        <Text>{count}</Text>
      </div>
    );
  };

  const renderRecentReview = (review: Review) => (
    <div key={review.id} className="mb-6">
      <div className="flex items-center mb-2">
        <Avatar src={review.reviewerImage} size={32} />
        <div className="ml-3">
          <Text strong>
            {review.isMasked ? "Anonymous Traveler" : review.reviewerName}
          </Text>
          <div>
            <Rate
              disabled
              defaultValue={review.rating}
              className="text-sm text-yellow-400"
              character={<StarFilled />}
              aria-label={`Rating: ${review.rating} out of 5 stars`}
            />
            <Text className="ml-2 text-sm">{review.rating.toFixed(1)}</Text>
          </div>
        </div>
      </div>
      <Title level={5} className="mb-1">
        {review.title}
      </Title>
      <Paragraph ellipsis={{ rows: 3 }}>{review.content}</Paragraph>
    </div>
  );

  return (
    <Card className="shadow-md self-start">
      <Row gutter={24}>
        <Col xs={24} md={24}>
          <Title level={4}>Ratings Summary</Title>
          <div className="flex items-center mb-4 gap-2">
            <h3 className="m-0 font-semibold text-3xl">
              {averageRating.toFixed(1)}
            </h3>
            <Rate
              disabled
              defaultValue={averageRating}
              className="text-yellow-400"
              character={<StarFilled />}
              aria-label={`Overall rating: ${averageRating} out of 5 stars`}
            />
          </div>
          <Text type="secondary" className="mb-6 block text-base">
            Based on {totalReviews} reviews
          </Text>
          {renderRatingBar("Excellent", ratingCounts.excellent)}
          {renderRatingBar("Good", ratingCounts.good)}
          {renderRatingBar("Average", ratingCounts.average)}
          {renderRatingBar("Bad", ratingCounts.bad)}
          {renderRatingBar("Poor", ratingCounts.poor)}
        </Col>
        <Col xs={24} md={24}>
          {recentReviews.length > 0 ? (
            recentReviews.slice(0, 3).map(renderRecentReview)
          ) : (
            <Text>No reviews available.</Text>
          )}
          {recentReviews.length > 0 && (
            <Button
              className="p-0 h-auto text-blue-500 hover:text-blue-600"
              type="link"
              icon={<RightOutlined />}
            >
              View All Reviews
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default GuestReviews;
