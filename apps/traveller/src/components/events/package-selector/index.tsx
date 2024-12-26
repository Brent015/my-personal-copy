import { PackageDatePicker } from "./package-date-picker";
import { PackageList } from "./package-list";
import { cn } from "@/lib/utils";
import { PackageSelectorProps } from "./types";

export const PackageSelector = ({
  packages,
  dates,
  selectedDate,
  selectedPackageId,
  onDateChange,
  onPackageSelect,
  className,
}: PackageSelectorProps) => {
  return (
    <div className={cn("px-4 py-3", className)}>
      <h2 className="font-semibold mb-3 text-xl">Select Packages</h2>

      <PackageDatePicker
        dates={dates}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />

      <div className="text-lg text-grayscale-400 font-medium mb-2">
        Package Type
      </div>

      <PackageList
        packages={packages}
        selectedPackageId={selectedPackageId}
        onPackageSelect={onPackageSelect}
      />
    </div>
  );
};
