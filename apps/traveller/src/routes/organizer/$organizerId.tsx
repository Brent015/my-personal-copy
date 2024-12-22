import { useRef, useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Star, Users, Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { mockOrganizers } from '../home/_home/organizers';
// import { OrganizerTabNavigation } from '@/components/organizers-listing';
import OrganizerTab from '@/components/organizers-listing/organizer-tab';

export const Route = createFileRoute('/organizer/$organizerId')({
  component: OrganizerProfile,
});

function OrganizerProfile() {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // const [activeTab, setActiveTab] = useState('events');

  const { organizerId } = Route.useParams() as { organizerId: string };
  const organizer = mockOrganizers.find((o) => o.id === organizerId);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex flex-col bg-grayscale-700">
      <div className="relative w-full h-64 bg-gray-100 touch-pan-y">
        <div className="flex h-full">
          <img
            src={organizer?.imageUrl}
            alt={`organizer ${organizerId}`}
            className="w-full h-full object-cover flex-shrink-0"
            draggable="false"
          />
        </div>
        <div className="absolute top-2 right-4">
          <Button
            variant="ghost"
            className="p-2 rounded-full bg-gray-200/50 hover:bg-gray-500/50"
          >
            <Ellipsis className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-t-3xl relative mb-16">
        <div className="h-full flex flex-col">
          <div className="p-4 pt-6 bg-white">
            <div className="flex items-center space-x-4">
              <Avatar className="flex-shrink-0 absolute top-[-52px] h-[74px] w-[74px]">
                {organizer?.imageUrl ? (
                  <AvatarImage src={organizer.imageUrl} alt={organizer.name} />
                ) : (
                  <AvatarFallback>
                    <Users className="h-6 w-6" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                variant="default"
                className="bg-yellow-primary text-black text-lg font-medium px-4 py-2 absolute right-4 top-[-19px] hover:bg-yellow-600 focus:bg-yellow-700"
              >
                Follow
              </Button>
            </div>
            <div>
              <h1 className="text-xl font-medium">{organizer?.name}</h1>
              <span className="text-sm font-medium text-grayscale-300">
                @username
              </span>
            </div>
            <div>
              <div
                ref={containerRef}
                className="flex justify-between items-center px-5 my-5"
              >
                <div className="text-center flex flex-col gap-y-1">
                  <p className="text-gray-500">Rating</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-2" />
                    <span className="text-2xl font-medium">
                      {organizer?.rating}
                    </span>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="border-l border-gray-300"
                  style={{ height: `${containerHeight}px` }}
                />
                <div className="text-center flex flex-col gap-y-1">
                  <p className="text-gray-500">Events</p>
                  <p className="text-2xl font-medium">
                    {organizer?.noOfEvents}
                  </p>
                </div>
                <Separator
                  orientation="vertical"
                  className="border-l border-gray-300"
                  style={{ height: `${containerHeight}px` }}
                />
                <div className="text-center flex flex-col gap-y-1">
                  <p className="text-gray-500">Bookings</p>
                  <p className="text-2xl font-medium">69</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
          </div>

          {/* Tab */}
          <div className="flex-1 bg-grayscale-700">
            <OrganizerTab />
          </div>
        </div>
      </div>
    </div>
  );
}
