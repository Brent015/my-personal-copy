// types.ts
export interface Tab {
  id: string;
  label: string;
  href: string;
}

// TabNavigation.tsx
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const tabs = [
  { id: "home", label: "Home", href: "/home/listing" },
  { id: "events", label: "Events", href: "/home/events" },
  { id: "organizers", label: "Organizers", href: "/home/organizers" },
];

const TabNavigation = () => {
  return (
    <nav className="w-full bg-white ">
      <div className="max-w-screen-xl -mx-4 border-b border-outline-primary">
        <ul className="flex space-x-2 px-4 py-2 pb-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link to={tab.href}>
                {({ isActive }) => {
                  return (
                    <button
                      className={cn(
                        "relative py-1 px-2 text-xl font-medium transition-colors duration-200",
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
      </div>
    </nav>
  );
};

export default TabNavigation;
