import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DatePicker } from "../search";
import { Button } from "../ui/button";

const SelectDates = () => {
  const [open, toggle] = useState(false);

  const toggleDrawer = () => toggle((prev) => !prev);
  return (
    <Drawer open={open} onClose={toggleDrawer}>
      <DrawerTrigger onClick={toggleDrawer} role="link">
        <Button
          variant="secondary"
          className={cn(
            // Base styles
            "px-4",
            // Custom styling using Tailwind's core classes
            "bg-[#FBC50A33] text-yellow-secondary",
            "active:bg-yellow-100",
            // Touch-friendly tap state for mobile
            "touch-manipulation",
            // Improved text visibility
            "text-base font-medium",
            // Remove hover states on mobile
            "hover:bg-yellow-200"
            // Custom className override
          )}
        >
          Select dates
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <h1 className="text-xl font-medium p-4">Select dates</h1>
        <DatePicker />
      </DrawerContent>
    </Drawer>
  );
};

export default SelectDates;
