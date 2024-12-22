import { BottomBar } from "@/components/common";
import { BottomBarNavigationProvider } from "@/components/common/bottom-bar/provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <BottomBarNavigationProvider>
      <div className="mb-16">
        <Outlet />
      </div>
      <BottomBar />
      {/* <TanStackRouterDevtools position="top-left" /> */}
    </BottomBarNavigationProvider>
  ),
});
