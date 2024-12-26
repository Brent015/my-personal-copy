import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { PackageSelector } from "../events/package-selector";
import { DateOption, Package } from "../events/package-selector/types";

// Usage Example:
const sampleDates: DateOption[] = [
  { date: "2024-10-03", label: "3 Oct" },
  { date: "2024-10-04", label: "4 Oct" },
  { date: "2024-10-05", label: "5 Oct" },
];

const samplePackages: Package[] = [
  {
    id: 1,
    title: "Package Title",
    price: 1700,
    activities: ["Hiking", "Diving"],
  },
  {
    id: 2,
    title: "Package Title",
    price: 1800,
    activities: ["Hiking", "Diving"],
  },
  {
    id: 3,
    title: "Package Title",
    price: 1900,
    activities: ["Hiking", "Diving"],
  },
];

const SelectPackage = () => {
  const [open, toggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    sampleDates[0]?.date || ""
  );
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null
  );
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Additional logic here if needed
  };

  const handlePackageSelect = (packageId: number | null) => {
    setSelectedPackageId(packageId);
    // Additional logic here if needed
  };

  const toggleDrawer = () => toggle((prev) => !prev);
  return (
    <Drawer nested open={open} onClose={toggleDrawer}>
      <DrawerTrigger onClick={toggleDrawer} role="link">
        <Button variant="ghost" size="sm" className="h-8 px-2 ">
          <Edit2 className="h-4 w-4 text-yellow-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <PackageSelector
          packages={samplePackages}
          dates={sampleDates}
          selectedDate={selectedDate}
          selectedPackageId={selectedPackageId}
          onDateChange={handleDateChange}
          onPackageSelect={handlePackageSelect}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default SelectPackage;
