import React, { useState, useEffect } from "react";
import { Card, Typography, Radio, Spin, RadioChangeEvent } from "antd";
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
import dayjs from "dayjs";

const { Title } = Typography;

interface ChartData {
  date: string;
  travelcoinsEarned: number;
  totalEarnings: number;
  bookings: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

interface CustomizedDotProps {
  cx: number;
  cy: number;
  stroke: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
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

const CustomizedDot: React.FC<CustomizedDotProps> = ({ cx, cy, stroke }) => {
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

type TimeRange = "7d" | "1m" | "3m" | "1y";

const DashboardChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const generateChartData = (
        start: dayjs.Dayjs,
        end: dayjs.Dayjs
      ): ChartData[] => {
        const data: ChartData[] = [];
        let current = start;
        while (current.isBefore(end) || current.isSame(end, "day")) {
          data.push({
            date: current.format(getDateFormat(timeRange)),
            travelcoinsEarned: Math.floor(Math.random() * 100) + 50,
            totalEarnings: Math.floor(Math.random() * 200000) + 150000,
            bookings: Math.floor(Math.random() * 100) + 150,
          });
          current = current.add(1, getDateIncrement(timeRange));
        }
        return data;
      };
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const endDate = dayjs();
        const startDate = getStartDate(endDate, timeRange);
        const newData = generateChartData(startDate, endDate);
        setChartData(newData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const getStartDate = (endDate: dayjs.Dayjs, range: TimeRange) => {
    switch (range) {
      case "7d":
        return endDate.subtract(7, "day");
      case "1m":
        return endDate.subtract(1, "month");
      case "3m":
        return endDate.subtract(3, "month");
      case "1y":
        return endDate.subtract(1, "year");
    }
  };

  const getDateFormat = (range: TimeRange): string => {
    switch (range) {
      case "7d":
        return "MMM D";
      case "1m":
        return "MMM D";
      case "3m":
        return "MMM D";
      case "1y":
        return "MMM YYYY";
    }
  };

  const getDateIncrement = (range: TimeRange): dayjs.ManipulateType => {
    switch (range) {
      case "7d":
        return "day";
      case "1m":
        return "day";
      case "3m":
        return "week";
      case "1y":
        return "month";
    }
  };

  const handleTimeRangeChange = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value as TimeRange);
  };

  return (
    <Card className="lg:col-span-2 shadow-lg rounded-xl overflow-hidden ">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="m-0">
          Performance Metrics
        </Title>
        <Radio.Group value={timeRange} onChange={handleTimeRangeChange}>
          <Radio.Button value="7d">7 Days</Radio.Button>
          <Radio.Button value="1m">1 Month</Radio.Button>
          <Radio.Button value="3m">3 Months</Radio.Button>
          <Radio.Button value="1y">1 Year</Radio.Button>
        </Radio.Group>
      </div>
      <Spin spinning={loading}>
        <ResponsiveContainer width="100%" height={390}>
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
            <XAxis dataKey="date" stroke="#666" />
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
              //@ts-expect-error - ignore error
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
              //@ts-expect-error - ignore error
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
              //@ts-expect-error - ignore error
              dot={<CustomizedDot />}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Spin>
    </Card>
  );
};

export default DashboardChart;
