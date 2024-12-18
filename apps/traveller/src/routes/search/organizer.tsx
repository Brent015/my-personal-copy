import { OrganizerResults, SearchLayout } from "@/components/search";
import EventsSearchInput from "@/components/search/search-input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Star } from "lucide-react";

export const Route = createFileRoute("/search/organizer")({
  component: SearchByOrganizer,
});

function SearchByOrganizer() {
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
          <h1 className="text-xl font-medium">Organizer</h1>
        </header>
      }
      content={
        <div className="space-y-6">
          <EventsSearchInput
            placeHolder="Search organizer"
            onChange={(val) => console.log(val)}
          />
          <div>
            <h3 className="text-base font-medium mb-2">Recent Searches</h3>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" className="rounded-7xl">
                Organizer 1
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Organizer 2
              </Button>
              <Button variant="outline" className="rounded-7xl">
                Organizer 3
              </Button>
            </div>
          </div>
          <OrganizerResults />
        </div>
      }
      footer={
        <footer className="bg-[#EBB7040D] p-4 flex items-center border-t border-t-outline-primary">
          <div className="flex items-center gap-2 flex-1">
            <Avatar>
              <AvatarImage src="https://loremflickr.com/100/100/filipino,man" />
              <AvatarFallback className="ounded-lg">
                organizer name
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-base font-medium">Organizer</p>

              <p className="gap-2 text-sm font-medium text-grayscale-400 flex items-center">
                <Star className="text-yellow-primary fill-current w-3 h-3" />
                4.95
              </p>
            </div>
          </div>
          <Button className="bg-yellow-primary py-3 px-6 text-xl font-medium h-12">
            Confirm
          </Button>
        </footer>
      }
    />
  );
}
