import { Filter, Search } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EventsSearchBar = () => {
  return (
    <div className="w-full max-w-2xl relative">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <span className="absolute left-3">
          <Search className="h-6 w-6 text-grayscale-300" />
        </span>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search for events, categories, organizers"
          className="w-full pl-10 pr-16 h-[52px] py-2 bg-grayscale-700 border-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400/70 text-gray-600 placeholder:font-medium text-base"
        />

        {/* Filter Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 p-2 bg-cyan-400 hover:bg-cyan-400/90 rounded-full shadow-none"
        >
          <Filter className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default EventsSearchBar;
