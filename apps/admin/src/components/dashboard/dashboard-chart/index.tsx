import React from "react";
import { Card, Typography } from "antd";
import { formatCurrency, formatNumber } from "@/utils/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const { Title } = Typography;

interface ChartData {
  month: string;
  travelcoinsEarned: number;
  totalEarnings: number;
  bookings: number;
}

const chartData: ChartData[] = [
  { month: "Jan", travelcoinsEarned: 50, totalEarnings: 180000, bookings: 180 },
  { month: "Feb", travelcoinsEarned: 60, totalEarnings: 200000, bookings: 200 },
  { month: "Mar", travelcoinsEarned: 75, totalEarnings: 250000, bookings: 220 },
  { month: "Apr", travelcoinsEarned: 95, totalEarnings: 295000, bookings: 247 },
  { month: "May", travelcoinsEarned: 85, totalEarnings: 270000, bookings: 230 },
  {
    month: "Jun",
    travelcoinsEarned: 100,
    totalEarnings: 310000,
    bookings: 260,
  },
  {
    month: "Jul",
    travelcoinsEarned: 110,
    totalEarnings: 330000,
    bookings: 280,
  },
];

const CustomTooltip: React.FC<{
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
      >
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-sm">
            <span style={{ color: pld.color }}>{pld.name}: </span>
            <span className="font-semibold">
              {pld.name === "Total Earnings (PHP)"
                ? formatCurrency(pld.value)
                : formatNumber(pld.value)}
            </span>
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedDot: React.FC<any> = (props) => {
  const { cx, cy, stroke } = props;

  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="white"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="40" stroke={stroke} strokeWidth="8" />
      <circle cx="50" cy="50" r="25" fill={stroke} />
    </svg>
  );
};

const DashboardChart: React.FC = () => {
  return (
    <Card className="lg:col-span-2 shadow-lg rounded-xl overflow-hidden">
      <Title level={4} className="mb-6">
        Performance Metrics
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorTravelcoins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis
            yAxisId="left"
            stroke="#666"
            tickFormatter={(value) => formatNumber(value)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#666"
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="travelcoinsEarned"
            stroke="#8884d8"
            strokeWidth={3}
            name="Travelcoins Earned"
            dot={<CustomizedDot />}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalEarnings"
            stroke="#82ca9d"
            strokeWidth={3}
            name="Total Earnings (PHP)"
            dot={<CustomizedDot />}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="bookings"
            stroke="#ffc658"
            strokeWidth={3}
            name="No. of Bookings"
            dot={<CustomizedDot />}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DashboardChart;
