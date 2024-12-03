import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { mockOrganizers } from ".";
import OrganizerCard from "@/components/organizers-listing/organizer-card";

export const Route = createFileRoute(
  "/home/_home/organizers/category/$category"
)({
  component: () => <OrganizerCategory />,
});

const titles = {
  top_organizers: "Top Organizers",
  beach: "Beach",
  hiking: "Hiking",
};

const OrganizerCategory = () => {
  const { category } = Route.useParams() as { category: keyof typeof titles };
  const navigate = useNavigate();

  return (
    <div>
      <nav className="w-full bg-white ">
        <div className="max-w-screen-xl border-b border-outline-primary flex items-center gap-x-2 px-4 py-2 pb-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-[32px]"
            onClick={() => navigate({ to: "/home/organizers" })}
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>
          <h1 className="text-lg font-medium">{titles[category]}</h1>
        </div>
      </nav>
      <div className="grid place-items-center grid-cols-auto-fit gap-4 p-4">
        {mockOrganizers.map(({ name, avatarUrl, noOfEvents, rating }) => (
          <OrganizerCard
            name={name}
            avatarUrl={avatarUrl}
            noOfEvents={noOfEvents}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizerCategory;
