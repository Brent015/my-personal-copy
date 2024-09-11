import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

import {
  DashboardChart,
  GuestReviews,
  MonthlyStatistics,
  TopCoordinators,
  TopEvents,
  UpcomingEvents,
} from "@/components/dashboard";

function DashboardPage() {
  return (
    <div className="p-6 bg-gray-100">
      <MonthlyStatistics />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DashboardChart />
        <UpcomingEvents />
      </div>

      {/* Top Events and Top Coordinators */}
      <div className="grid grid-cols-3 gap-6">
        <TopEvents />
        <TopCoordinators />
        <GuestReviews />
      </div>
    </div>
  );
}
