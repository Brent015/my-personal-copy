import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import PackageDrawer from "../package-drawer";

const PackageItem = ({ index }: { index: number }) => {
  return (
    <Card
      key={index}
      className={`p-4 relative justify-between flex ${index === 1 ? "border-yellow-400" : ""}`}
    >
      <div className="flex items-start">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Package Title</h3>
          <h4 className="font-semibold text-2xl">₱ 1,700</h4>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span>🥾</span> Hiking, Diving
          </div>
          <PackageDrawer packageId={index} />
        </div>
      </div>
      <div
        className={` w-6 h-6 rounded-full border flex items-center justify-center
      ${index === 1 ? "border-yellow-400 bg-yellow-400" : "border-gray-200"}`}
      >
        {index === 1 && <Check className="h-4 w-4 text-black" />}
      </div>
    </Card>
  );
};

export default PackageItem;
