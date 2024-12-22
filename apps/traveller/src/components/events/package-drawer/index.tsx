import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";

const PackageDrawer = ({ packageId }: { packageId: number }) => {
  const matchRoute = useMatchRoute();
  const isMatchPackageDetails = matchRoute({
    to: "/events/$eventId/$packageId",
    params: { packageId: `${packageId}` },
  });
  const isMatchPackageItinerary = matchRoute({
    to: "/events/$eventId/$packageId/itinerary",
    params: { packageId: `${packageId}` },
  });

  const navigate = useNavigate();
  return (
    <Drawer defaultOpen={!!isMatchPackageDetails || !!isMatchPackageItinerary}>
      <DrawerTrigger
        onClick={() => {
          navigate({
            to: "/events/$eventId/$packageId",
            params: {
              eventId: "1",
              packageId: "1",
            },
          });
        }}
        className="text-blue-400 text-sm"
        role="link"
      >
        More details →
      </DrawerTrigger>
      <Outlet />
    </Drawer>
  );
};

export default PackageDrawer;
