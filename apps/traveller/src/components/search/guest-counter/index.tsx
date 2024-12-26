import { cn } from "@/lib/utils";
import { GuestCounterProps } from "./types";
import { CounterItem } from "./counter-item";

const GuestCounter = ({
  guests,
  onChange,
  className,
  minValue = 0,
  maxValue = Infinity,
}: GuestCounterProps) => {
  const handleIncrement = (id: string) => {
    onChange(
      guests.map((guest) =>
        guest.id === id && guest.count < maxValue
          ? { ...guest, count: guest.count + 1 }
          : guest
      )
    );
  };

  const handleDecrement = (id: string) => {
    onChange(
      guests.map((guest) =>
        guest.id === id && guest.count > minValue
          ? { ...guest, count: guest.count - 1 }
          : guest
      )
    );
  };

  return (
    <div className={cn("w-full max-w-md space-y-4", className)}>
      {guests.map((guest) => (
        <CounterItem
          key={guest.id}
          guest={guest}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          minValue={minValue}
          maxValue={maxValue}
        />
      ))}
    </div>
  );
};

export default GuestCounter;
