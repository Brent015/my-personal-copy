import { Star } from "lucide-react";

const TopEventCard: React.FC<{
  image: string;
  title: string;
  rating: string;
  organizer: string;
}> = ({ image, organizer, rating, title }) => {
  return (
    <div className="overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-[112px] object-cover rounded"
      />

      <div className="py-4 border-none bg-transparent flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>

        {rating && (
          <span className="flex items-center gap-1 text-sm">
            <Star className="text-yellow-primary fill-current w-3 h-3" />
            {rating}
          </span>
        )}
        <span className="flex items-center gap-1 text-sm">👤 {organizer}</span>
      </div>
    </div>
  );
};

export default TopEventCard;
