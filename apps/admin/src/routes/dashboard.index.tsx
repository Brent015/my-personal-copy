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
  UpcomingSchedules,
} from "@/components/dashboard";

function DashboardPage() {
  return (
    <div className="p-6 bg-gray-100">
      <div className="space-y-6">
        <MonthlyStatistics />
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardChart />
          </div>
          <div>
            <UpcomingSchedules />
          </div>
          <div>
            <TopEvents />
          </div>
          <div>
            <TopCoordinators />
          </div>
          <div>
            <GuestReviews />
          </div>
        </div>
      </div>
    </div>
  );
}
