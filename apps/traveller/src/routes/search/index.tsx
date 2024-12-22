import { SearchLayout } from "@/components/search";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, XIcon } from "lucide-react";

export const Route = createFileRoute("/search/")({
  component: Search,
});

function Search() {
  return (
    <SearchLayout
      bgColor=""
      header={
        <header className="flex justify-between p-4 items-center">
          <h1 className="text-xl font-medium">Search</h1>
          <Button
            className="rounded-full bg-grayscale-600 border-none"
            variant="outline"
            size="icon"
          >
            <XIcon className="text-grayscale-300 w-5 h-5" />
          </Button>
        </header>
      }
      content={
        <div className="space-y-6">
          <div className="py-6 px-4 bg-white border border-outline-primary rounded-lg flex justify-between items-center">
            <h4 className="text-base font-medium text-grayscale-300">
              Destination
            </h4>
            <Link to="/search/destination" className="gap-4 flex">
              <h4 className="text-base font-medium">Anywhere</h4>
              <ChevronRight className="text-teal-secondary" />
            </Link>
          </div>
          <div className="py-6 px-4 bg-white border border-outline-primary rounded-lg flex justify-between items-center">
            <h4 className="text-base font-medium text-grayscale-300">Date</h4>
            <Link to="/search/date" className="gap-4 flex">
              <h4 className="text-base font-medium">Any Date</h4>
              <ChevronRight className="text-teal-secondary" />
            </Link>
          </div>
          <div className="py-6 px-4 bg-white border border-outline-primary rounded-lg flex justify-between items-center">
            <h4 className="text-base font-medium text-grayscale-300">
              Organizer
            </h4>
            <Link to="/search/organizer" className="gap-4 flex">
              <h4 className="text-base font-medium">Any Organizer</h4>
              <ChevronRight className="text-teal-secondary" />
            </Link>
          </div>
          <div className="py-6 px-4 bg-white border border-outline-primary rounded-lg flex justify-between items-center">
            <h4 className="text-base font-medium text-grayscale-300">
              Buddies
            </h4>
            <Link to="/search/group" className="gap-4 flex">
              <h4 className="text-base font-medium">Add Guests</h4>
              <ChevronRight className="text-teal-secondary" />
            </Link>
          </div>
        </div>
      }
      footer={
        <footer className="bg-[#EBB7040D] p-4 border-t border-t-outline-primary">
          <Button className="w-full bg-yellow-primary py-3 px-6 text-xl font-medium h-12">
            Search
          </Button>
        </footer>
      }
    />
  );
}
