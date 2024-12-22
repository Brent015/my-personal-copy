import { createFileRoute, Outlet } from "@tanstack/react-router";

import { EventsSearchBar, TabNavigation } from "@/components/events-listing";

export const Route = createFileRoute("/home/_home")({
  component: HomeLayout,
});

function HomeLayout() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-4 pb-0 fixed w-full z-10">
        {/* Search Bar */}
        <div className="mb-4">
          <EventsSearchBar />
        </div>
        {/* Navigation Tabs */}
        <TabNavigation />
      </div>
      <div className="pb-[65px] bg-grayscale-700 min-h-[calc(100vh_-_65px)] pt-[145px]">
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
