import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-PH").format(amount);
};

interface EventCardProps {
  title: string;
  imageUrl: string;
  organizerName: string;
  organizerAvatarUrl: string;
  minPrice: number;
  currency?: string;
}

const FeaturedCard: React.FC<EventCardProps> = ({
  title,
  imageUrl,
  organizerName,
  organizerAvatarUrl,
  minPrice,
  currency = "₱",
}) => {
  return (
    <Card className="relative w-full h-full overflow-hidden rounded-lg aspect-[4/3] group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-base font-medium text-white">{title}</h3>

        <div className="flex gap-1 justify-between flex-col">
          {/* Organizer Info */}
          <div className="flex items-center gap-2">
            <Avatar className="w-4 h-4">
              <AvatarImage src={organizerAvatarUrl} alt={organizerName} />
              <AvatarFallback>{organizerName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-warmGray-500">Organizer</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-white/90">min.</span>
            <span className="text-2xl font-semibold text-white">
              {currency} {formatCurrency(minPrice)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedCard;
