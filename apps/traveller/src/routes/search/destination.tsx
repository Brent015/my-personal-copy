import { DestinationResults, SearchLayout } from "@/components/search";
import EventsSearchInput from "@/components/search/search-input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/search/destination")({
  component: SearchByDestionation,
});

function SearchByDestionation() {
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
          <h1 className="text-xl font-medium">Destination</h1>
        </header>
      }
      content={
        <div className="space-y-6">
          <EventsSearchInput
            placeHolder="Search destination"
            onChange={(val) => console.log(val)}
          />
          <div>
            <h3 className="text-base font-medium mb-2">Recent Searches</h3>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" className="rounded-7xl">
                Pangasinan
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Cebu
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Palawan
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Mindanao
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Visayas
              </Button>
            </div>
          </div>
          <DestinationResults />
        </div>
      }
      footer={
        <footer className="bg-[#EBB7040D] p-4 flex items-center border-t border-t-outline-primary">
          <div className="flex-1 flex items-center gap-2">
            <Avatar className="w-8 h-8 rounded-lg">
              <AvatarImage src="https://loremflickr.com/320/240/beach,boracay" />
              <AvatarFallback className="w-8 h-8 rounded-lg">
                Destination Title
              </AvatarFallback>
            </Avatar>
            <p className="text-base font-medium">Metro Manila</p>
          </div>
          <Button className="bg-yellow-primary py-3 px-6 text-xl font-medium h-12">
            Confirm
          </Button>
        </footer>
      }
    />
  );
}
