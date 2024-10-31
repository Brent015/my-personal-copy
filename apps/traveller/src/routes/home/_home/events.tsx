import { FeaturedCard } from "@/components/events-listing";
import TopEventCard from "@/components/events-listing/top-event";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/home/_home/events")({
  component: Events,
});

const mockEvents = [
  {
    title: "Beach in Bohol",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    organizerName: "John Doe",
    organizerAvatarUrl: "/api/placeholder/100/100",
    minPrice: 1700,
  },
  {
    title: "Siargao Surfing",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    organizerName: "Sarah Smith",
    organizerAvatarUrl: "/api/placeholder/100/100",
    minPrice: 2500,
  },
  {
    title: "Palawan Island Hopping",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    organizerName: "Mike Johnson",
    organizerAvatarUrl: "/api/placeholder/100/100",
    minPrice: 3000,
  },
  {
    title: "Palawan Island Hopping",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    organizerName: "Mike Johnson",
    organizerAvatarUrl: "/api/placeholder/100/100",
    minPrice: 3000,
  },
  {
    title: "Palawan Island Hopping",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    organizerName: "Mike Johnson",
    organizerAvatarUrl: "/api/placeholder/100/100",
    minPrice: 3000,
  },
];

function Events() {
  return (
    <div className="py-6 px-4">
      <section className="w-full max-w-4xl mx-auto">
        <h1 className="text-xl font-medium mb-4">Featured</h1>

        <div className="flex gap-4 overflow-x-auto pb-4  px-4 snap-x scrollbar-hidden">
          {mockEvents.map((event, index) => (
            <div
              key={index}
              className="h-[356px] w-[315px] flex-shrink-0 snap-start"
            >
              <FeaturedCard {...event} />
            </div>
          ))}
        </div>
      </section>
      <section className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Top Events</h1>
          <Button variant="ghost" size="icon">
            <ArrowRight />
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4  px-4 snap-x scrollbar-hidden">
          {mockEvents.map((_, index) => (
            <div
              key={index}
              className="h-[200px] w-[110px] flex-shrink-0 snap-start"
            >
              <TopEventCard
                image="https://loremflickr.com/320/240/beach,bohol"
                title="Beach in Bohol"
                rating="4.95"
                organizer="Mike Johnson"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
