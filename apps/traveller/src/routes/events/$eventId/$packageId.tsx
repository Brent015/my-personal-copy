import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/events/$eventId/$packageId")({
  component: Package,
});

const tabs = [
  { id: "details", label: "Details", href: "" },
  { id: "itinerary", label: "Itinerary", href: "itinerary" },
];

function Package() {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="space-y-2">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-5" />
            </Button>
            <h1 className="text-[#DE9806] text-xl font-medium">
              Package Title
            </h1>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-5" />
            </Button>
          </div>
          <h2 className="text-3xl">₱ 1,700</h2>
        </DrawerTitle>
        <DrawerDescription className="min-h-[500px] -mx-4 -mb-4 p-4 bg-grayscale-700">
          <nav className="bg-white -m-4 p-4">
            <ul className="flex space-x-2 py-2 pb-4">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <Link
                    activeOptions={{ exact: true }}
                    to={tab.href}
                    from="/events/$eventId/$packageId"
                  >
                    {({ isActive }: { isActive: boolean }) => {
                      return (
                        <button
                          className={cn(
                            "relative py-1 px-2 text-base font-medium transition-colors duration-200",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded",
                            isActive
                              ? "text-yellow-primary bg-[#FBC50A1A]"
                              : "text-grayscale-400 hover:text-gray-600"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {tab.label}
                        </button>
                      );
                    }}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 -mx-4 -mb-4 bg-grayscale-700 border-t border-outline-primary">
            <div className="flex flex-col divide-y">
              <div className="space-y-4 w-full text-start pb-4">
                <h1 className="text-xl font-medium text-black">
                  Full Description
                </h1>
                <p className="text-base font-medium text-grayscale-300">
                  description here
                </p>
              </div>
              <div className="pt-4 text-start space-y-4">
                <Outlet />
              </div>
            </div>
          </div>
        </DrawerDescription>
      </DrawerHeader>
    </DrawerContent>
  );
}
