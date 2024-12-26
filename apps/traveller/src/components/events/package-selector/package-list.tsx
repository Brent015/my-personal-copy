import { SelectableCard } from "@/components/common";
import PackageDrawer from "../package-drawer";
import { Package } from "./types";

// PackageList.tsx
interface PackageListProps {
  packages: Package[];
  selectedPackageId: number | null;
  onPackageSelect: (id: number) => void;
}

export const PackageList = ({
  packages,
  selectedPackageId,
  onPackageSelect,
}: PackageListProps) => {
  return (
    <div className="space-y-3">
      {packages.map((pkg) => (
        <SelectableCard
          key={pkg.id}
          isSelected={selectedPackageId === pkg.id}
          onClick={() => onPackageSelect(pkg.id)}
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{pkg.title}</h3>
            <h4 className="font-semibold text-2xl">
              ₱ {pkg.price.toLocaleString()}
            </h4>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <span>🥾</span> {pkg.activities.join(", ")}
            </div>
            <PackageDrawer packageId={pkg.id} />
          </div>
        </SelectableCard>
      ))}
    </div>
  );
};
