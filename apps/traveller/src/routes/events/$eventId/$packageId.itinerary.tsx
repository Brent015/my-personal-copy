import { createFileRoute } from "@tanstack/react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp } from "lucide-react";

export const Route = createFileRoute("/events/$eventId/$packageId/itinerary")({
  component: PackageItinerary,
});

// A dedicated component that will live inside the Itinerary tab
function PackageItinerary() {
  return (
    <div className="space-y-4">
      {/* Each section is wrapped in a collapsible component with consistent styling */}
      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-base text-black font-medium">Inclusions</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-grayscale-300">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-base text-black font-medium">Exclusions</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-grayscale-300">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-base text-black font-medium">Additional Notes</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-grayscale-300">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-base text-black font-medium">FAQs</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-grayscale-300">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
