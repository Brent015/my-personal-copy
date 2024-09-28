import React from "react";
import { Tooltip, Skeleton, Empty } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface StatCardProps {
  title: string;
  value: string | number | null;
  icon: React.ReactNode;
  tooltip: string;
  comparison?: React.ReactNode;
  goalProgress?: React.ReactNode;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  tooltip,
  comparison,
  goalProgress,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    );
  }

  if (value === null || value === undefined) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No data available"
        />
      </div>
    );
  }

  return (
    <Tooltip title={tooltip}>
      <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 text-sm font-medium">{title}</div>
          {icon}
        </div>
        <div className="text-3xl font-bold text-gray-700">{value}</div>
        {comparison && <div className="mt-2">{comparison}</div>}
        {goalProgress && <div className="mt-2">{goalProgress}</div>}
      </div>
    </Tooltip>
  );
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const renderComparison = (
  current: number,
  previous: number
): React.ReactNode => {
  const percentageChange = ((current - previous) / previous) * 100;
  return (
    <div className="flex items-center mt-2 text-sm">
      {percentageChange >= 0 ? (
        <ArrowUpOutlined className="text-green-500 mr-1" />
      ) : (
        <ArrowDownOutlined className="text-red-500 mr-1" />
      )}
      <span
        className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}
      >
        {Math.abs(percentageChange).toFixed(1)}%
      </span>
      <span className="text-gray-500 ml-1">vs last month</span>
    </div>
  );
};

const CompletedSchedulesStat: React.FC = () => {
  const [data, setData] = React.useState<{
    thisMonth: number;
    lastMonth: number;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData({ thisMonth: 247, lastMonth: 231 });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <StatCard
      title="Completed Schedules"
      value={data?.thisMonth ?? null}
      icon={<CalendarOutlined className="text-2xl" />}
      tooltip="Total completed schedules as of this month"
      comparison={
        data ? renderComparison(data.thisMonth, data.lastMonth) : undefined
      }
      isLoading={isLoading}
    />
  );
};

const TotalGuestsStat: React.FC = () => {
  const [data, setData] = React.useState<{
    thisMonth: number;
    lastMonth: number;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setData({ thisMonth: 1001, lastMonth: 892 });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <StatCard
      title="Total Guests"
      value={data?.thisMonth ?? null}
      icon={<UserOutlined className="text-2xl" />}
      tooltip="Total number of guests this month"
      comparison={
        data ? renderComparison(data.thisMonth, data.lastMonth) : undefined
      }
      isLoading={isLoading}
    />
  );
};

const TotalEarningsStat: React.FC = () => {
  const [data, setData] = React.useState<{
    thisMonth: number;
    lastMonth: number;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData({ thisMonth: 295000, lastMonth: 270000 });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <StatCard
      title="Total Earnings"
      value={data ? formatCurrency(data.thisMonth) : null}
      icon={<DollarOutlined className="text-2xl" />}
      tooltip="Total revenue generated this month"
      comparison={
        data ? renderComparison(data.thisMonth, data.lastMonth) : undefined
      }
      isLoading={isLoading}
    />
  );
};

const RemainingTravelcoinsStat: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      setIsLoading(true);
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setValue(95);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <StatCard
      title="Remaining Travelcoins"
      value={value}
      icon={<StarOutlined className="text-2xl" />}
      tooltip="Total TravelCoins earned"
      isLoading={isLoading}
    />
  );
};

const Statistics: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Performance Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <CompletedSchedulesStat />
        <TotalGuestsStat />
        <TotalEarningsStat />
        <RemainingTravelcoinsStat />
      </div>
    </div>
  );
};

export default Statistics;
