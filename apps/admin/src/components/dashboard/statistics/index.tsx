import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  DollarOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
interface MonthlyMetric {
  thisMonth: number;
  lastMonth: number;
  percentageChange: number;
  goal: number;
}

interface MonthlyData {
  completedSchedules: MonthlyMetric;
  totalGuests: MonthlyMetric;
  totalEarnings: MonthlyMetric;
}

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tooltip: string;
  comparison?: React.ReactNode;
  goalProgress?: React.ReactNode;
}

// Simulated data for monthly KPIs
const monthlyData: MonthlyData = {
  completedSchedules: {
    thisMonth: 247,
    lastMonth: 231,
    percentageChange: 6.93,
    goal: 300,
  },
  totalGuests: {
    thisMonth: 1001,
    lastMonth: 892,
    percentageChange: 12.22,
    goal: 1200,
  },
  totalEarnings: {
    thisMonth: 295000,
    lastMonth: 270000,
    percentageChange: 9.26,
    goal: 350000,
  },
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const renderComparison = (data: MonthlyMetric): React.ReactNode => (
  <div className="flex items-center mt-2 text-sm">
    {data.percentageChange >= 0 ? (
      <ArrowUpOutlined className="text-green-500 mr-1" />
    ) : (
      <ArrowDownOutlined className="text-red-500 mr-1" />
    )}
    <span
      className={data.percentageChange >= 0 ? "text-green-500" : "text-red-500"}
    >
      {Math.abs(data.percentageChange).toFixed(1)}%
    </span>
    <span className="text-gray-500 ml-1">vs last month</span>
  </div>
);

const stats: Stat[] = [
  {
    title: "Completed Schedules",
    value: monthlyData.completedSchedules.thisMonth,
    icon: <CalendarOutlined className="text-2xl" />,
    tooltip: "Total completed schedules as of this month",
    comparison: renderComparison(monthlyData.completedSchedules),
  },
  {
    title: "Total Guests",
    value: monthlyData.totalGuests.thisMonth,
    icon: <UserOutlined className="text-2xl" />,
    tooltip: "Total number of guests this month",
    comparison: renderComparison(monthlyData.totalGuests),
  },
  {
    title: "Total Earnings",
    value: formatCurrency(monthlyData.totalEarnings.thisMonth),
    icon: <DollarOutlined className="text-2xl" />,
    tooltip: "Total revenue generated this month",
    comparison: renderComparison(monthlyData.totalEarnings),
  },
  {
    title: "Remaining Travelcoins",
    value: 95,
    icon: <StarOutlined className="text-2xl" />,
    tooltip: "Total TravelCoins earned",
  },
];

const Statistics = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Performance Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <Tooltip key={index} title={stat.tooltip}>
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </div>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-700">
                {stat.value}
              </div>
              {stat.comparison && <div className="mt-2">{stat.comparison}</div>}
              {stat.goalProgress && (
                <div className="mt-2">{stat.goalProgress}</div>
              )}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
