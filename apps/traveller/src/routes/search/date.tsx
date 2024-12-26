import { DatePicker, SearchLayout } from "@/components/search";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/search/date")({
  component: SearchByDate,
});

function SearchByDate() {
  return (
    <SearchLayout
      bgColor="white"
      header={
        <header className="flex gap-4 p-4 items-center">
          <Link to="/search">
            <Button
              className="rounded-full bg-grayscale-600 border-none"
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="text-grayscale-300 w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium">Date</h1>
        </header>
      }
      content={<DatePicker />}
      footer={
        <footer className="bg-[#EBB7040D] p-4 flex items-center border-t border-t-outline-primary">
          <div className="flex-1 flex items-center gap-2">
            <p className="text-base font-medium">October 14-18</p>
          </div>
          <Button className="bg-yellow-primary py-3 px-6 text-xl font-medium h-12">
            Confirm
          </Button>
        </footer>
      }
    />
  );
}
