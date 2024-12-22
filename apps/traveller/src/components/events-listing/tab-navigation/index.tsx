import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export interface Tab {
  id: string;
  label: string;
  href: string;
}

const tabs = [
  { id: "home", label: "Home", href: "/home/listing" },
  { id: "events", label: "Events", href: "/home/events" },
  { id: "organizers", label: "Organizers", href: "/home/organizers" },
];

const TabNavigation = () => {
  return (
    <nav className="w-full bg-white sticky top-0 z-40">
      <div className="max-w-screen-xl -mx-4 border-b border-outline-primary">
        <ul className="flex overflow-x-auto scrollbar-hidden px-4 py-2 pb-4">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-none first:pl-0 last:pr-0">
              <Link to={tab.href}>
                {({ isActive }: { isActive: boolean }) => {
                  return (
                    <button
                      className={cn(
                        // Base styles
                        "relative py-2 px-4 text-lg font-medium rounded-lg",
                        "transition-colors duration-200 whitespace-nowrap",
                        // Touch interactions
                        "touch-none active:scale-98",
                        // Focus states
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                        // Active/Inactive states
                        isActive
                          ? ["text-yellow-primary bg-[#FBC50A1A]"]
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
      </div>
    </nav>
  );
};

export default TabNavigation;
