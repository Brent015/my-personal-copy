import { Dayjs } from "dayjs";

export interface Schedule {
  id: string;
  eventName: string;
  startDate: Dayjs;
  endDate: Dayjs;
  bookings: number;
  maxCapacity: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  totalEarnings: number;
  paid: number;
  toCollect: number;
  coordinatorId?: string;
  vehicleId?: string;
  color?: string;
}

export interface OverallStats {
  totalBookings: number;
  totalRevenue: number;
  totalPaid: number;
  totalToCollect: number;
  averageBookingsPerEvent: number;
  averageRevenuePerEvent: number;
  completedSchedules: number;
  ongoingSchedules: number;
  upcomingSchedules: number;
  cancelledSchedules: number;
  totalSchedules: number;
  occupancyRate: number;
  mostPopularEvent: string;
  leastPopularEvent: string;
  topCoordinator: {
    id: string;
    name: string;
    eventsManaged: number;
    totalRevenue: number;
  };
  topVehicle: {
    id: string;
    name: string;
    timesUsed: number;
    totalCapacity: number;
  };
}

export const sampleOverallStats: OverallStats = {
  totalBookings: 97,
  totalRevenue: 205000,
  totalPaid: 184000,
  totalToCollect: 21000,
  averageBookingsPerEvent: 19.4,
  averageRevenuePerEvent: 41000,
  completedSchedules: 3,
  ongoingSchedules: 1,
  upcomingSchedules: 2,
  cancelledSchedules: 1,
  totalSchedules: 7,
  occupancyRate: 0.86, // 86%
  mostPopularEvent: "Boracay Island Adventure",
  leastPopularEvent: "Cebu Island Hopping",
  topCoordinator: {
    id: "1",
    name: "John Doe",
    eventsManaged: 4,
    totalRevenue: 95000,
  },
  topVehicle: {
    id: "1",
    name: "Van - Toyota HiAce",
    timesUsed: 3,
    totalCapacity: 75,
  },
};

import dayjs from "dayjs";

export const sampleSchedules: Schedule[] = [
  {
    id: "1",
    eventName: "Bali Beach Retreat",
    startDate: dayjs().add(1, "week"),
    endDate: dayjs().add(1, "week").add(5, "day"),
    bookings: 18,
    maxCapacity: 25,
    status: "Upcoming",
    totalEarnings: 45000,
    paid: 36000,
    toCollect: 9000,
    coordinatorId: "1",
    vehicleId: "1",
  },
  {
    id: "2",
    eventName: "Bali Beach Retreat",
    startDate: dayjs(),
    endDate: dayjs().add(3, "day"),
    bookings: 30,
    maxCapacity: 30,
    status: "Ongoing",
    totalEarnings: 75000,
    paid: 75000,
    toCollect: 0,
    coordinatorId: "2",
    vehicleId: "2",
  },
  {
    id: "3",
    eventName: "Bali Beach Retreat",
    startDate: dayjs().subtract(1, "week"),
    endDate: dayjs().subtract(5, "day"),
    bookings: 22,
    maxCapacity: 25,
    status: "Completed",
    totalEarnings: 55000,
    paid: 55000,
    toCollect: 0,
    coordinatorId: "3",
    vehicleId: "3",
  },
  {
    id: "4",
    eventName: "Bali Beach Retreat",
    startDate: dayjs().add(2, "week"),
    endDate: dayjs().add(2, "week").add(6, "day"),
    bookings: 12,
    maxCapacity: 20,
    status: "Upcoming",
    totalEarnings: 30000,
    paid: 18000,
    toCollect: 12000,
    coordinatorId: "1",
    vehicleId: "1",
  },
  {
    id: "5",
    eventName: "Bali Beach Retreat",
    startDate: dayjs().subtract(2, "day"),
    endDate: dayjs().add(1, "day"),
    bookings: 15,
    maxCapacity: 30,
    status: "Cancelled",
    totalEarnings: 0,
    paid: 0,
    toCollect: 0,
  },
];
