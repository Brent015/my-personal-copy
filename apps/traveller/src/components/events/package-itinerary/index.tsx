import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp } from "lucide-react";

// A dedicated component that will live inside the Itinerary tab
const ItineraryContent = () => {
  return (
    <div className="space-y-4">
      {/* Each section is wrapped in a collapsible component with consistent styling */}
      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-xl font-bold">Inclusions</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-gray-500">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-xl font-bold">Exclusions</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-gray-500">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-xl font-bold">Additional Notes</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-gray-500">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      <Collapsible className="w-full">
        <div className="w-full rounded-2xl border bg-white p-4">
          <CollapsibleTrigger className="flex w-full items-center justify-between group">
            <h2 className="text-xl font-bold">FAQs</h2>
            <ChevronUp className="h-5 w-5 text-cyan-500 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <p className="text-gray-500">Description here</p>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default ItineraryContent;
