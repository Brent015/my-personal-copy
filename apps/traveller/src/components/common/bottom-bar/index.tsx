import React, { useState, useEffect } from "react";
import { Home, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-6 w-6" />,
    label: "Home",
    value: "home",
    href: "/home/listing",
    exact: false,
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

const useScrollDirection = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      // Only update state if scroll difference is significant (>5px)
      if (Math.abs(scrollDifference) > 5) {
        setIsScrollingDown(scrollDifference > 0);
      }

      setLastScrollY(currentScrollY);
    };

    // Add event listener with passive option for better performance
    window.addEventListener("scroll", updateScrollDirection, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [lastScrollY]);

  return isScrollingDown;
};

const BottomNav: React.FC = () => {
  const isScrollingDown = useScrollDirection();

  // Optional: Add haptic feedback for iOS devices
  const handlePress = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe",
        "transition-transform duration-300 ease-in-out",
        isScrollingDown ? "translate-y-full" : "translate-y-0"
      )}
    >
      <nav className="mx-auto max-w-md" role="navigation" aria-label="Main">
        <ul className="flex items-center justify-between px-2 py-2">
          {navItems.map((item) => (
            <li key={item.value} className="flex-1">
              <Link to={item.href} activeOptions={{ exact: item.exact }}>
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="lg"
                    className={cn(
                      "h-14 w-full flex-col gap-1 rounded-lg p-1",
                      "active:scale-95 transition-transform duration-200",
                      "focus-visible:ring-2 focus-visible:ring-offset-2",
                      isActive ? "bg-[#FBC50A14] hover:bg-[#FBC50A14]" : ""
                    )}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    onClick={handlePress}
                  >
                    <span
                      className={cn(
                        "text-grayscale-300",
                        isActive ? "text-yellow-primary" : ""
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        "text-grayscale-300",
                        isActive ? "text-yellow-primary" : ""
                      )}
                    >
                      {item.label}
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
