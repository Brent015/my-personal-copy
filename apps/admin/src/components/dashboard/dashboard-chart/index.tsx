import { formatCurrency, formatNumber } from "@/utils/format";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {pld.name}:{" "}
            {pld.name === "Total Earnings (PHP)"
              ? formatCurrency(pld.value)
              : formatNumber(pld.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardChart = () => {
  return (
    <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => formatNumber(value)}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => formatCurrency(value)}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="travelcoinsEarned"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
            name="Travelcoins Earned"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="totalEarnings"
            stackId="2"
            stroke="#82ca9d"
            fill="#82ca9d"
            name="Total Earnings (PHP)"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="bookings"
            stackId="3"
            stroke="#ffc658"
            fill="#ffc658"
            name="No. of Bookings"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
