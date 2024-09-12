import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { OverallStats } from "./types";

interface OverallStatsProps {
  stats: OverallStats;
}

const OverallStatsComponent: React.FC<OverallStatsProps> = ({ stats }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Total Bookings"
            value={stats.totalBookings}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Total Revenue"
            value={stats.totalRevenue}
            prefix={<DollarOutlined />}
            precision={2}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Completed Schedules"
            value={stats.completedSchedules}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Ongoing Schedules"
            value={stats.ongoingSchedules}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Upcoming Schedules"
            value={stats.upcomingSchedules}
            prefix={<CalendarOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card>
          <Statistic
            title="Cancelled Schedules"
            value={stats.cancelledSchedules}
            prefix={<CloseCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default OverallStatsComponent;
