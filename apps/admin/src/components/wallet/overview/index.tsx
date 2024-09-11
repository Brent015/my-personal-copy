import React from "react";
import { Card, Tooltip } from "antd";
import {
  DollarOutlined,
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

interface WalletStat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tooltip: string;
  comparison?: React.ReactNode;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const renderComparison = (percentageChange: number): React.ReactNode => (
  <div className="flex items-center mt-2 text-sm">
    {percentageChange >= 0 ? (
      <ArrowUpOutlined className="text-green-500 mr-1" />
    ) : (
      <ArrowDownOutlined className="text-red-500 mr-1" />
    )}
    <span className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}>
      {Math.abs(percentageChange).toFixed(1)}%
    </span>
    <span className="text-gray-500 ml-1">vs last month</span>
  </div>
);

const WalletOverview: React.FC = () => {
  const walletStats: WalletStat[] = [
    {
      title: "Total Earnings",
      value: formatCurrency(50000),
      icon: <DollarOutlined className="text-2xl" />,
      tooltip: "Total earnings this month",
      comparison: renderComparison(10),
    },
    {
      title: "Total Balance",
      value: formatCurrency(25000),
      icon: <DollarOutlined className="text-2xl" />,
      tooltip: "Current balance in your wallet",
      comparison: renderComparison(10),
    },
    {
      title: "TravelCoins Balance",
      value: 500,
      icon: <WalletOutlined className="text-2xl" />,
      tooltip: "Current TravelCoins balance",
      comparison: renderComparison(10),
    },

    {
      title: "Total Withdrawals",
      value: formatCurrency(20000),
      icon: <ArrowDownOutlined className="text-2xl" />,
      tooltip: "Total withdrawals this month",
      comparison: renderComparison(10),
    },
    {
      title: "Total Spending",
      value: formatCurrency(5000),
      icon: <ArrowDownOutlined className="text-2xl" />,
      tooltip: "Total spending this month",
      comparison: renderComparison(10),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {walletStats.map((stat, index) => (
        <Tooltip key={index} title={stat.tooltip}>
          <Card className="h-full shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 text-sm font-medium">
                {stat.title}
              </div>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-700">{stat.value}</div>
            {stat.comparison && <div className="mt-2">{stat.comparison}</div>}
          </Card>
        </Tooltip>
      ))}
    </div>
  );
};

export default WalletOverview;
