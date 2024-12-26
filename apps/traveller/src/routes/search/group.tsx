import { createFileRoute, Link } from "@tanstack/react-router";

import { GuestCounter, SearchLayout } from "@/components/search";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { GuestType } from "@/components/search/guest-counter/types";
import { useState } from "react";
import { defaultGuests } from "@/components/search/guest-counter/defaultGuests";

export const Route = createFileRoute("/search/group")({
  component: SearchByGroup,
});

function SearchByGroup() {
  const [guests, setGuests] = useState<GuestType[]>(defaultGuests);

  const handleGuestsChange = (newGuests: GuestType[]) => {
    setGuests(newGuests);
    // Additional logic here if needed
  };
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
          <h1 className="text-xl font-medium">Group</h1>
        </header>
      }
      content={
        <GuestCounter
          guests={guests}
          onChange={handleGuestsChange}
          minValue={0}
          maxValue={10}
        />
      }
      footer={
        <footer className="bg-[#EBB7040D] p-4 flex items-center border-t border-t-outline-primary">
          <div className="flex-1">
            <Button className="underline text-lg px-0" variant="ghost">
              Clear Selection
            </Button>
          </div>
          <Button className="bg-yellow-primary py-3 px-6 text-xl font-medium h-12">
            Confirm
          </Button>
        </footer>
      }
    />
  );
}
