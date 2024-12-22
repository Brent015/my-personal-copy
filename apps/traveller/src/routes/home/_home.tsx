import { createFileRoute, Outlet } from "@tanstack/react-router";

import { EventsSearchBar, TabNavigation } from "@/components/events-listing";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useContainerScrollVisibility } from "@/components/common/hooks";
import { useBottomBarNavigation } from "@/components/common/bottom-bar/context";

export const Route = createFileRoute("/home/_home")({
  component: HomeLayout,
});

function HomeLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  useContainerScrollVisibility(containerRef, {
    threshold: 5,
    showAtTop: true,
    topThreshold: 50,
    settleTime: 1000,
    debounceDelay: 100,
  });
  const { isNavHidden } = useBottomBarNavigation();
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
      <div
        ref={containerRef}
        className={cn(
          "bg-grayscale-700  pt-[145px] scrollbar-hidden overflow-y-auto overflow-x-hidden",
          {
            "max-h-[calc(100vh_-_72px)] ": !isNavHidden,
            "max-h-screen pb-[72px]": isNavHidden,
          }
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
