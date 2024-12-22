import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

const OrganizerItem = ({
  imageSrc,
  name,
  numberOfEvents,
  rating,
}: {
  imageSrc: string;
  name: string;
  numberOfEvents: number;
  rating: number;
}) => {
  return (
    <li className="flex items-center gap-2">
      <Avatar className="">
        <AvatarImage className="rounded-lg w-[72px] h-[72px] " src={imageSrc} />
        <AvatarFallback className="w-8 h-8 rounded-lg">{name}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-base font-medium">{name}</p>
        <p className="text-sm font-medium text-grayscale-400">
          {numberOfEvents} events
        </p>
        <p className="gap-2 text-sm font-medium text-grayscale-400 flex items-center">
          <Star className="text-yellow-primary fill-current w-3 h-3" />
          
          {rating}
        </p>
      </div>
    </li>
  );
};

export default OrganizerItem;
