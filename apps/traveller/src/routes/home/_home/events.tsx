import { FeaturedCard } from "@/components/events-listing";
import { createFileRoute } from "@tanstack/react-router";

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
];

function Events() {
  return (
    <div className="py-6 px-4">
      <section className="w-full max-w-4xl mx-auto ">
        <h1 className="text-xl font-medium mb-4">Featured</h1>

        <div className="flex gap-4 overflow-x-auto pb-4  px-4 snap-x scrollbar-hidden">
          {mockEvents.map((event, index) => (
            <div
              key={index}
              className="min-w-[280px] w-[280px] flex-shrink-0 snap-start"
            >
              <FeaturedCard {...event} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
