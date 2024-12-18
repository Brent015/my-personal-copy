import { Walking, CarOutline } from "@/assets/icons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$eventId/$packageId/")({
  component: PackageDetails,
});

function PackageDetails() {
  return (
    <div className="text-start space-y-4">
      <div className="flex gap-4">
        <div className="bg-[#27B9D733] self-start rounded-2xl py-1 px-2">
          <Walking />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium text-black ">Coordinator</p>
          <p className="text-base font-medium text-grayscale-300">
            Description here
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-[#272ED733] self-start rounded-2xl py-1 px-2">
          <CarOutline />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-black ">Coordinator</p>
          <p className="text-base font-medium text-grayscale-300">
            Description here
          </p>
        </div>
      </div>
    </div>
  );
}
