import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DateOption } from "./types";
import { Label } from "@/components/ui/label";

interface PackageDatePickerProps {
  dates: DateOption[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const PackageDatePicker = ({
  dates,
  selectedDate,
  onDateChange,
}: PackageDatePickerProps) => (
  <RadioGroup
    value={selectedDate}
    onValueChange={(v) => {
      console.log(v);
      onDateChange(v);
    }}
    className="flex gap-2 mb-4 text-sm"
  >
    {dates.map((dateOption) => (
      <Label key={dateOption.date}>
        <RadioGroupItem className="hidden" value={dateOption.date} asChild />
        <Button
          onClick={() => onDateChange(dateOption.date)}
          variant="outline"
          className={cn(
            "p-2",
            dateOption.date === selectedDate
              ? "bg-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:border-yellow-400 text-black"
              : "bg-white"
          )}
        >
          {dateOption.label}
        </Button>
      </Label>
    ))}
    <Label>
      <RadioGroupItem value="all hidden" asChild />
      <Button
        onClick={() => onDateChange("All")}
        variant="outline"
        className={cn("p-2", {
          "bg-black text-white hover:bg-black hover:text-white":
            selectedDate === "All",
        })}
      >
        <CalendarIcon className="h-4 w-4" />
        All dates
      </Button>
    </Label>
  </RadioGroup>
);
