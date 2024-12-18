import { BottomBar } from "@/components/common";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="mb-16">
        <Outlet />
      </div>
      <BottomBar />
      {/* <TanStackRouterDevtools position="top-left" /> */}
    </>
  ),
});
