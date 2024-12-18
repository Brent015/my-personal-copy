import { PinAlt } from "@/assets/icons";

const DestinationItem = ({
  name,
  numberOfEvents,
}: {
  name: string;
  numberOfEvents: number;
}) => {
  return (
    <li className="flex items-center gap-2">
      <PinAlt />
      <div>
        <p className="text-base font-medium">{name}</p>
        <p className="text-sm font-medium text-grayscale-400">
          {numberOfEvents} events
        </p>
      </div>
    </li>
  );
};

export default DestinationItem;
