import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CounterItemProps } from "./types";

export const CounterItem = ({
  guest,
  onIncrement,
  onDecrement,
  minValue = 0,
  maxValue = Infinity,
  className,
}: CounterItemProps) => {
  const isDecrementDisabled = guest.count <= minValue;
  const isIncrementDisabled = guest.count >= maxValue;

  return (
    <Card className={cn("px-4 py-6 bg-warmGray-100", className)}>
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
            className={cn(
              "h-8 w-8 rounded-full bg-[#27B9D74D] border-0 hover:bg-sky-100",
              isDecrementDisabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isDecrementDisabled && onDecrement(guest.id)}
            disabled={isDecrementDisabled}
            aria-label={`Decrease ${guest.title} count`}
          >
            <Minus className="h-4 w-4 text-sky-600" />
          </Button>
          <span className="w-4 text-center">{guest.count}</span>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full bg-[#27B9D74D] border-0 hover:bg-sky-100",
              isIncrementDisabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isIncrementDisabled && onIncrement(guest.id)}
            disabled={isIncrementDisabled}
            aria-label={`Increase ${guest.title} count`}
          >
            <Plus className="h-4 w-4 text-sky-600" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
