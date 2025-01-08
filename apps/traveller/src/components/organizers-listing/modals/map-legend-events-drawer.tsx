import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import OrganizerEventCard from '../event-card/organizer-event-card';

interface MapLegendEventsDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface Event {
  label: string;
  color: string;
  eventCount: number;
  location: string;
}

const events: Event[] = [
  {
    label: 'Has 1 event',
    color: 'bg-teal-100',
    eventCount: 1,
    location: 'Location A',
  },
  {
    label: 'Has 2 events',
    color: 'bg-teal-700',
    eventCount: 2,
    location: 'Location B',
  },
  {
    label: 'Has 3+ events',
    color: 'bg-yellow-secondary',
    eventCount: 3,
    location: 'Location C',
  },
];

const organizerEvent = [
  {
    image: 'https://loremflickr.com/320/240/beach,bohol',
    avatarUrl: 'https://github.com/shadcn.png',
    organizerName: 'Sarah Johnson',
    date: 'March 15, 2025',
    travelers: 3,
    attendees: 100,
    title: 'Beach Cleanup & Conservation Day',
  },
  {
    image: 'https://loremflickr.com/320/240/beach,bohol',
    avatarUrl: 'https://github.com/shadcn.png',
    organizerName: 'Mike Chen',
    date: 'March 20, 2025',
    travelers: 5,
    attendees: 75,
    title: 'Coastal Photography Workshop',
  },
  {
    image: 'https://loremflickr.com/320/240/beach,bohol',
    avatarUrl: 'https://github.com/shadcn.png',
    organizerName: 'Emma Rodriguez',
    date: 'March 25, 2025',
    travelers: 4,
    attendees: 120,
    title: 'Sunset Beach Yoga Retreat',
  },
];

const MapLegendEventsDrawer: React.FC<MapLegendEventsDrawerProps> = ({
  open,
  onClose,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onClose}
      onClose={() => setSelectedEvent(null)}
    >
      <DrawerContent className="rounded-t-[40px] pb-6 bg-grayscale-700">
        <div className="w-full">
          <DrawerHeader className="border-b border-b-outline-primary px-6">
            <div className="flex justify-between items-center">
              <DrawerTitle className="font-medium text-grayscale-black">
                {!selectedEvent
                  ? 'Map Legend'
                  : `${selectedEvent.eventCount} event(s) in ${selectedEvent.location}`}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button className="h-8 w-8 p-0 bg-grayscale-600 hover:text-grayscale-700 rounded-full">
                  <X className="!h-5 !w-5 text-grayscale-300" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="max-h-[630px] overflow-y-auto">
            {!selectedEvent ? (
              <div className="p-4 space-y-4">
                {events.map((event, index) => (
                  <Card
                    key={index}
                    className="flex items-center justify-between p-3 rounded-sm border border-outline-primary shadow-none"
                    onClick={() => handleEventClick(event)}
                  >
                    <span className="text-lg text-black">{event.label}</span>
                    <div className={`w-6 h-6 rounded ${event.color}`}></div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-4 space-y-4 overflow-y-auto">
                {organizerEvent.map((event, index) => (
                  <OrganizerEventCard key={index} {...event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MapLegendEventsDrawer;
