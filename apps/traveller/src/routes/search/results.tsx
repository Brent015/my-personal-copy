import { Filter } from "@/assets/icons";
import { EventCard } from "@/components/events-listing";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, Search } from "lucide-react";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Beach in Bohol",
    address: "Bohol, Philippines",
    image: "https://loremflickr.com/320/240/beach,bohol",
    price: 1700,
    rating: 4.95,
    organizer: "Travel Agency",
    bookings: 10,
    isNew: true,
    category: "🏖️ Beach",
  },
  {
    id: "2",
    title: "Nasugbu",
    address: "Batangas, Philippines",
    image: "https://loremflickr.com/320/240/beach,batangas",
    price: 1700,
    rating: 4.95,
    organizer: "Travel Agency",
    bookings: 10,
    category: "🏖️ Beach",
  },
  {
    id: "3",
    title: "Boracay",
    address: "Aklan, Philippines",
    image: "https://loremflickr.com/320/240/beach,boracay",
    price: 1700,
    rating: 4.95,
    organizer: "Travel Agency",
    bookings: 10,
    category: "🏖️ Beach",
  },
];

export const Route = createFileRoute("/search/results")({
  component: SearchResult,
});

function SearchResult() {
  return (
    <div>
      <header className="flex gap-4 p-4 items-center">
        <Button
          className="rounded-full bg-grayscale-600 border-none"
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="text-grayscale-300 w-5 h-5" />
        </Button>
        <h1 className="text-base font-medium text-grayscale-400">
          Showing <span className="font-bold text-black">50 events</span>
        </h1>
      </header>

      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-full px-4 py-3 w-full">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 min-w-0 mr-4">
              <h2 className="text-base font-bold text-cyan-500 truncate">
                Pangasinan
              </h2>
              <p className="text-sm text-gray-500 truncate">
                Oct 5 - 10 • Organizer name • 2 buddies
              </p>
            </div>
          </div>
          <button
            className="flex-shrink-0 bg-cyan-500 p-2 rounded-full hover:bg-cyan-600 transition-colors"
            aria-label="Filter"
          >
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-8 px-4 py-6 h-[calc(100vh_-_229px)] overflow-auto">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
