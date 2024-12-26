import * as React from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  children: React.ReactNode;
  activeColor?: string;
  className?: string;
}

const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>(
  (
    {
      isSelected = false,
      children,
      activeColor = "border-yellow-400",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-3 relative justify-between flex gap-2",
          isSelected && activeColor,
          className
        )}
        {...props}
      >
        {children}
        <div
          className={cn(
            "shrink-0 w-6 h-6 rounded-full border flex items-center justify-center",
            isSelected ? "border-yellow-400 bg-yellow-400" : "border-gray-200"
          )}
        >
          {isSelected && <Check className="h-4 w-4 text-black " />}
        </div>
      </Card>
    );
  }
);

SelectableCard.displayName = "SelectableCard";

export { SelectableCard };
export type { SelectableCardProps };
