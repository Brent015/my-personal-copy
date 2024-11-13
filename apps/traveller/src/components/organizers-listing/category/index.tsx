import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface Organizer {
  name: string;
  avatarUrl: string;
  noOfEvents: number;
  rating: string;
}

interface CategoryProps {
  title: string;
  organizers: Organizer[];
}

const Category: React.FC<CategoryProps> = ({ title, organizers }) => {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">{title}</h1>
        <Button variant="ghost" size="icon">
          <ArrowRight />
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4  px-4 snap-x scrollbar-hidden">
        {organizers.map((organizer, index) => (
          <div
            key={index}
            className="h-[200px] w-[110px] flex-shrink-0 snap-start flex flex-col gap-1"
          >
            <div className="relative h-[110px] w-[110px] rounded-full overflow-hidden">
              <img
                src={organizer.avatarUrl}
                alt={organizer.name}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="mt-2 text-sm font-medium">{organizer.name}</div>
            <div className="text-xs text-gray-500">
              {organizer.noOfEvents} Events
            </div>
            {organizer.rating && (
              <span className="flex items-center gap-1 text-sm">
                <Star className="text-yellow-primary fill-current w-3 h-3" />
                {organizer.rating}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
