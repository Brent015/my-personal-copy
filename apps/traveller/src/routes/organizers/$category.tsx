import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import OrganizerCard from '@/components/organizers-listing/organizer-card';
import { mockOrganizers } from '../home/_home/organizers';
import { EventsSearchBar } from '@/components/events-listing';

export const Route = createFileRoute('/organizers/$category')({
  component: () => <OrganizerCategory />,
});

const titles = {
  top_organizers: 'Top Organizers',
  beach: 'Beach',
  hiking: 'Hiking',
};

const OrganizerCategory = () => {
  const { category } = Route.useParams() as { category: keyof typeof titles };
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-4 pb-0 fixed w-full z-10">
        <div className="mb-4">
          <EventsSearchBar />
        </div>
        <nav className="w-full bg-white">
          <div className="max-w-screen-xl border-b border-outline-primary flex items-center gap-x-2 px-1 py-2 pb-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-[32px]"
              onClick={() => navigate({ to: '/home/organizers' })}
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <h1 className="text-lg font-medium">{titles[category]}</h1>
          </div>
        </nav>
      </div>
      <div className="min-h-[calc(100vh_-_65px)] pt-[145px]">
        <div className="grid place-items-center grid-cols-auto-fit gap-4 p-4">
          {mockOrganizers.map(({ name, avatarUrl, noOfEvents, rating, id }) => (
            <OrganizerCard
              key={id}
              id={id}
              name={name}
              avatarUrl={avatarUrl}
              noOfEvents={noOfEvents}
              rating={rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerCategory;
