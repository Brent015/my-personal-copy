import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EventCardProps {
  image: string;
  name: string;
  eventCount: number;
}

const EventCard: React.FC<EventCardProps> = ({ image, name, eventCount }) => {
  const getRandomColor = () => {
    const colors = ['#27B9D733', '#D77B2733', '#40D72733', '#BE27D733'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Card
        className="w-[172px] h-[168px] flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
        style={{ backgroundColor: getRandomColor() }}
      >
        <CardContent className="text-center p-0">
          <img src={image} alt={name} width={48} height={48} />
        </CardContent>
      </Card>
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm font-normal text-[#858384]">
          {eventCount} Events
        </p>
      </div>
    </div>
  );
};

export default EventCard;
