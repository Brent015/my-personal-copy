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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="grid gap-6 col-span-2">
          <DashboardChart />
          <TopEvents />
          <TopCoordinators />
          <GuestReviews />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
