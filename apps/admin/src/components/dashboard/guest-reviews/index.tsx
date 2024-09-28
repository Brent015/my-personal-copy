import React, { useState, useEffect } from "react";
import { RightOutlined, StarFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Rate,
  Row,
  Typography,
  Skeleton,
  Empty,
} from "antd";

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

interface GuestReviewsData {
  summary: ReviewSummary;
  recentReviews: Review[];
}

const sampleData: GuestReviewsData = {
  summary: {
    averageRating: 5.0,
    totalReviews: 291,
    ratingCounts: {
      excellent: 90,
      good: 84,
      average: 72,
      bad: 33,
      poor: 12,
    },
  },
  recentReviews: [
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
      reviewerName: "Jane Smith",
      isMasked: false,
      title: "Wonderful trip!",
      content:
        "Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes.",
    },
    {
      id: "3",
      reviewerImage: "https://loremflickr.com/320/240/philippines,women",
      rating: 4.5,
      reviewerName: "Anonymous",
      isMasked: true,
      title: "Unforgettable adventure!",
      content:
        "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus.",
    },
  ],
};

// Mock API function
const fetchGuestReviews = (): Promise<GuestReviewsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 1500); // Simulate a 1.5 second delay
  });
};

const GuestReviews: React.FC = () => {
  const [reviewsData, setReviewsData] = useState<GuestReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchGuestReviews();
        setReviewsData(data);
      } catch (error) {
        console.error("Failed to fetch guest reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const renderRatingBar = (
    label: string,
    count: number,
    totalReviews: number
  ) => {
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

  const renderSummary = () => {
    if (!reviewsData) return null;
    const { averageRating, totalReviews, ratingCounts } = reviewsData.summary;

    return (
      <>
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
        <Text type="secondary" className="mb-4 block text-base">
          Based on {totalReviews} reviews
        </Text>
        {renderRatingBar("Excellent", ratingCounts.excellent, totalReviews)}
        {renderRatingBar("Good", ratingCounts.good, totalReviews)}
        {renderRatingBar("Average", ratingCounts.average, totalReviews)}
        {renderRatingBar("Bad", ratingCounts.bad, totalReviews)}
        {renderRatingBar("Poor", ratingCounts.poor, totalReviews)}
      </>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
          <div className="col-span-1 space-y-6">
            <Skeleton active avatar paragraph={{ rows: 3 }} />
            <Skeleton active avatar paragraph={{ rows: 3 }} />
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </div>
        </div>
      );
    }

    if (!reviewsData || reviewsData.recentReviews.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No reviews available"
        />
      );
    }

    return (
      <Row gutter={24}>
        <Col xs={24} md={24}>
          {renderSummary()}
        </Col>
        <Col xs={24} md={24}>
          {reviewsData.recentReviews.slice(0, 3).map(renderRecentReview)}
          <Button
            className="p-0 h-auto text-blue-500 hover:text-blue-600"
            type="link"
            icon={<RightOutlined />}
          >
            View All Reviews
          </Button>
        </Col>
      </Row>
    );
  };

  return <Card className="shadow-md self-start">{renderContent()}</Card>;
};

export default GuestReviews;
