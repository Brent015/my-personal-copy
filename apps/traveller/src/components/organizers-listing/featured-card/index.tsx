import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface FeaturedOrganizerCardProps {
  title: string;
  imageUrl: string;
  noOfEvents: number;
}

const FeaturedOrganizerCard: React.FC<FeaturedOrganizerCardProps> = ({
  title,
  imageUrl,
  noOfEvents,
}) => {
  return (
    <Card className="group relative w-full h-full overflow-hidden rounded-lg">
      <CardContent className="p-0">
        {/* Main Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Event Count Badge */}
          <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            {noOfEvents} events
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedOrganizerCard;
