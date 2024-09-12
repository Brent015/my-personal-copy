import React from "react";
import { Card, Statistic } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Col } from "antd";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  UserOutlined: <UserOutlined />,
  DollarOutlined: <DollarOutlined />,
  CheckCircleOutlined: <CheckCircleOutlined />,
  ClockCircleOutlined: <ClockCircleOutlined />,
  CalendarOutlined: <CalendarOutlined />,
  CloseCircleOutlined: <CloseCircleOutlined />,
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Col xs={24} sm={12} md={8} lg={4}>
    <Card className="h-full">
      <Statistic
        title={title}
        value={value}
        prefix={iconMap[icon]}
        valueStyle={{ color: "#3f8600" }}
      />
    </Card>
  </Col>
);
