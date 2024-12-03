import {
  Category,
  FeaturedOrganizerCard,
} from "@/components/organizers-listing";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/_home/organizers/")({
  component: () => <Organizers />,
});

type Organizer = {
  title: string;
  imageUrl: string;
  name: string;
  avatarUrl: string;
  noOfEvents: number;
  rating: string;
};

export const mockOrganizers: Organizer[] = [
  {
    name: "John Doe",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    title: "img1",
    avatarUrl: "https://loremflickr.com/320/240/beach,bohol",
    noOfEvents: 6,
    rating: "4.5",
  },
  {
    name: "Sarah Smith",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    title: "img2",
    avatarUrl: "https://loremflickr.com/320/240/beach,bohol",
    noOfEvents: 9,
    rating: "4.5",
  },
  {
    name: "Mike Johnson",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    title: "img3",
    avatarUrl: "https://loremflickr.com/320/240/beach,bohol",
    noOfEvents: 3,
    rating: "4.5",
  },
  {
    name: "Mike Johnson",
    imageUrl: "https://loremflickr.com/320/240/beach,bohol",
    title: "img4",
    avatarUrl: "https://loremflickr.com/320/240/beach,bohol",
    noOfEvents: 2,
    rating: "4.5",
  },
];

function Organizers() {
  const getInitial = (name: string) => {
    return name?.trim().charAt(0).toUpperCase() || "O"; // Fallback to 'O' for Organizer
  };

  return (
    <div className="py-6 px-4">
      <section className="w-full max-w-4xl mx-auto">
        <h1 className="text-xl font-medium mb-4">Featured</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hidden">
          {mockOrganizers.map(({ name, avatarUrl, ...rest }, index) => (
            <div
              key={index}
              className="h-[280px] w-[196px] flex-shrink-0 snap-start flex flex-col"
            >
              {/* Organizer Avatar */}
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-7 w-7 border-2 border-white">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="bg-gray-200 text-gray-600">
                    {getInitial(name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{name}</span>
              </div>
              <FeaturedOrganizerCard {...rest} />
            </div>
          ))}
        </div>
      </section>

      <Category title="Top Organizers" organizers={mockOrganizers} />
      <Category title="Beach" organizers={mockOrganizers} />
      <Category title="Hiking" organizers={mockOrganizers} />
    </div>
  );
}
