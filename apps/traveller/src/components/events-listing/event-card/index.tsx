import { DotSeparator } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Event } from "@/types/event";
import { useNavigate } from "@tanstack/react-router";
import { Star } from "lucide-react";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="overflow-hidden mb-4 rounded-lg border border-outline-primary"
      onClick={() => {
        navigate({ to: "/events/$eventId", params: { eventId: "1" } });
      }}
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[224px] object-cover"
        />
        {event.isNew && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
            New!
          </Badge>
        )}
      </div>
      <div className="p-4 px-3">
        <div className="flex items-center gap-2 mb-2 justify-between">
          <Badge
            variant="secondary"
            className="bg-[#27B9D71A] rounded-7xl py-2 px-3 text-[#27B9D7] text-sm font-medium m-0"
          >
            {event.category}
          </Badge>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-warmGray-700">
              starts at
            </span>
            <h1 className="text-grayscale-black font-medium text-2xl">
              ₱{event.price.toLocaleString()}
            </h1>
          </div>
        </div>

        <h3 className="text-base font-medium">{event.title}</h3>
        <p className="text-sm font-medium text-warmGray-700 mb-2">
          {event.address}
        </p>

        <div className="flex items-center gap-4 text-sm text-grayscale-300 font-medium">
          {event.rating && (
            <span className="flex items-center gap-1">
              {" "}
              <Star className="text-yellow-primary fill-current w-3 h-3" />{" "}
              {event.rating}
            </span>
          )}
          <DotSeparator />
          <span className="flex items-center gap-1">👤 {event.organizer}</span>
          <DotSeparator />
          <span>{event.bookings} bookings</span>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
