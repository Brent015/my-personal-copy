import React from "react";
import { Home, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

// Simple utility function to join classNames
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const BottomNav = () => {
  const navItems: NavItem[] = [
    {
      icon: <Home className="h-6 w-6" />,
      label: "Home",
      value: "home",
      href: "/home/listing/",
    },
    {
      icon: <Search className="h-6 w-6" />,
      label: "Search",
      value: "search",
      href: "/search",
    },
    {
      icon: <User className="h-6 w-6" />,
      label: "Profile",
      value: "profile",
      href: "/profile",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      label: "Favorites",
      value: "favorites",
      href: "/favorites",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <nav className="mx-auto max-w-md px-8 p-4">
        <ul className="flex items-center justify-between px-5">
          {navItems.map((item) => (
            <li key={item.value}>
              <Link to={item.href}>
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={classNames(
                      "h-8 w-12 rounded-6xl",
                      isActive ? "bg-[#FBC50A14] hover:bg-[#FBC50A14]" : ""
                    )}
                    aria-label={item.label}
                  >
                    <span
                      className={classNames(
                        "text-grayscale-300",
                        isActive ? "text-yellow-primary" : ""
                      )}
                    >
                      {item.icon}
                    </span>
                  </Button>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNav;
