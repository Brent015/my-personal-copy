import React from 'react';
import { Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface OrganizerCardProps {
  id: string;
  name: string;
  avatarUrl: string;
  noOfEvents: number;
  rating: string;
}

const OrganizerCard: React.FC<OrganizerCardProps> = ({
  id,
  name,
  avatarUrl,
  noOfEvents,
  rating,
}) => {
  return (
    <Link to="/organizer/$organizerId" params={{ organizerId: id }}>
      <div className="h-[200px] w-[110px] flex-shrink-0 snap-start flex flex-col gap-1">
        <div className="relative h-[110px] w-[110px] rounded-full overflow-hidden">
          <img
            src={avatarUrl}
            alt={name}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="mt-2 text-sm font-medium">{name}</div>
        <div className="text-xs text-gray-500">{noOfEvents} Events</div>
        {rating && (
          <span className="flex items-center gap-1 text-sm">
            <Star className="text-yellow-primary fill-current w-3 h-3" />
            {rating}
          </span>
        )}
      </div>
    </Link>
  );
};

export default OrganizerCard;
