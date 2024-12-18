import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GuestType {
  id: string;
  title: string;
  description: string;
  count: number;
}

const GroupsCounter = () => {
  const [guests, setGuests] = useState<GuestType[]>([
    {
      id: "adults",
      title: "Adults",
      description: "Ages 13 or above",
      count: 1,
    },
    { id: "children", title: "Children", description: "Ages 2-12", count: 0 },
    { id: "infants", title: "Infants", description: "Under 2", count: 0 },
  ]);

  const updateCount = (id: string, increment: boolean) => {
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id
          ? {
              ...guest,
              count: increment ? guest.count + 1 : Math.max(0, guest.count - 1),
            }
          : guest
      )
    );
  };

  return (
    <div className="w-full max-w-md space-y-4 ">
      {guests.map((guest) => (
        <Card key={guest.id} className="px-4 py-6 bg-warmGray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{guest.title}</h3>
              <p className="text-sm text-grayscale-300 font-medium">
                {guest.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-[#27B9D74D] border-0 hover:bg-sky-100"
                onClick={() => updateCount(guest.id, false)}
                aria-label={`Decrease ${guest.title} count`}
              >
                <Minus className="h-4 w-4 text-sky-600" />
              </Button>
              <span className="w-4 text-center">{guest.count}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-[#27B9D74D] border-0 hover:bg-sky-100"
                onClick={() => updateCount(guest.id, true)}
                aria-label={`Increase ${guest.title} count`}
              >
                <Plus className="h-4 w-4 text-sky-600" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GroupsCounter;
