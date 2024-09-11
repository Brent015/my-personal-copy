import React from "react";
import { Card, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface WalletAnalyticsProps {
  className?: string;
}

const WalletAnalytics: React.FC<WalletAnalyticsProps> = ({ className }) => {
  return (
    <Row gutter={16} className={className}>
      <Col span={8}>
        <Card>
          <div className="text-sm text-gray-500 mb-2">Total Earnings</div>
          <div className="text-3xl font-bold mb-2">50,000.00 PHP</div>
          <div className="flex items-center text-sm text-green-500">
            <ArrowUpOutlined />
            <span className="ml-1">10% vs last month</span>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <div className="text-sm text-gray-500 mb-2">Total Withdrawals</div>
          <div className="text-3xl font-bold mb-2">20,000.00 PHP</div>
          <div className="flex items-center text-sm text-red-500">
            <ArrowDownOutlined />
            <span className="ml-1">5% vs last month</span>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <div className="text-sm text-gray-500 mb-2">Total Spending</div>
          <div className="text-3xl font-bold mb-2">5,000.00 PHP</div>
          <div className="flex items-center text-sm text-red-500">
            <ArrowDownOutlined />
            <span className="ml-1">2% vs last month</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default WalletAnalytics;
