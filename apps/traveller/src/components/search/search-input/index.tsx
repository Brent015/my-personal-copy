import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const EventsSearchInput = ({
  placeHolder,
  onChange,
}: {
  placeHolder: string;
  onChange: (value: string) => void;
}) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className="w-full max-w-2xl relative">
      <div className="relative flex items-center ">
        {/* Search Icon */}
        <span className="absolute left-4">
          <SearchIcon className="h-6 w-6 text-teal-primary" />
        </span>

        {/* Search Input */}
        <Input
          onChange={onInputChange}
          type="text"
          placeholder={placeHolder}
          className="w-full pl-12 pr-16 h-[52px] py-2 bg-grayscale-700 border-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400/70 text-gray-600 placeholder:font-medium text-base"
        />
      </div>
    </div>
  );
};

export default EventsSearchInput;
