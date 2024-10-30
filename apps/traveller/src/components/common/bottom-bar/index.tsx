import React from "react";
import { Home, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Simple utility function to join classNames
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const BottomNav = () => {
  const [activeTab, setActiveTab] = React.useState("home");

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Home",
      value: "home",
    },
    {
      icon: <Search className="h-6 w-6" />,
      label: "Search",
      value: "search",
    },
    {
      icon: <User className="h-6 w-6" />,
      label: "Profile",
      value: "profile",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      label: "Favorites",
      value: "favorites",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="mx-auto max-w-md px-8 p-4">
        <ul className="flex items-center justify-between px-5">
          {navItems.map((item) => (
            <li key={item.value}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTab(item.value)}
                className={classNames(
                  "h-8 w-12 rounded-6xl",
                  activeTab === item.value ? "bg-yellow-50" : ""
                )}
                aria-label={item.label}
              >
                <span
                  className={classNames(
                    "text-muted-foreground",
                    activeTab === item.value ? "text-foreground" : ""
                  )}
                >
                  {item.icon}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNav;
