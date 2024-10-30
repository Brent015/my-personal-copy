import { Categories, EventCard } from "@/components/events-listing";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/types/event";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { CategoryFilter } from "@/components/events-listing/types";

// Event table filter schema
const listingSearchSchema = z.object({
  category: fallback(
    z.enum([
      CategoryFilter.POPULAR,
      CategoryFilter.NEARBY,
      CategoryFilter.UPCOMING,
    ]),
    CategoryFilter.POPULAR
  ).default(CategoryFilter.POPULAR),
});

export const Route = createFileRoute("/home/_home/listing")({
  component: EventListing,
  validateSearch: zodSearchValidator(listingSearchSchema),
});

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

function EventListing() {
  const loading = false;
  if (loading) {
    return (
      <div className="flex flex-col space-y-3 p-4">
        <div className="flex gap-2">
          <Skeleton className="w-[114px] h-10 rounded-7xl" />
          <Skeleton className="w-[114px] h-10 rounded-7xl" />
          <Skeleton className="w-[114px] h-10 rounded-7xl" />
        </div>
        <Skeleton className="w-full h-[380px]" />
        <Skeleton className="w-full h-[380px]" />
      </div>
    );
  }
  return (
    <>
      {/* Filter Buttons */}
      <div className="px-4 pb-2 pt-4">
        <Categories />
      </div>
      {/* Event Cards */}
      <div className="space-y-8 px-4 py-6">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {/* Pending UI */}
    </>
  );
}

export default EventListing;
