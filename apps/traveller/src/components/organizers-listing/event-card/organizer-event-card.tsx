import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

interface OrganizerEventCardProps {
  image: string;
  avatarUrl: string;
  organizerName: string;
  date: string;
  travelers: number;
  attendees: number;
}

const OrganizerEventCard = ({
  image,
  avatarUrl,
  organizerName,
  date,
  travelers,
  attendees,
}: OrganizerEventCardProps) => (
  <Card className="mb-4 p-4 space-y-4">
    <img
      src={image}
      alt="Event location"
      className="w-full max-h-16 object-cover rounded-lg"
    />
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-4 w-4">
          <AvatarImage src={avatarUrl} alt="organizer" />
          <AvatarFallback>{organizerName.slice(0)}</AvatarFallback>
        </Avatar>
        <span className="text-base text-black font-medium">
          {organizerName}
        </span>
        <span className="text-base text-grayscale-300 font-medium">
          • {date}
        </span>
      </div>
      <h3 className="text-lg font-medium mb-2">Event name</h3>
      <div className="flex items-center gap-2 text-base text-grayscale-300">
        <Users size={16} className="text-teal-primary" />
        <span>{travelers} travelers</span>
        <span>• {attendees} attendees</span>
      </div>
    </div>
  </Card>
);

export default OrganizerEventCard;
