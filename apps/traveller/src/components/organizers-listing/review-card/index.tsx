import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export interface ReviewCardProps {
  avatar: string;
  name: string;
  rating: number;
  date: string;
  description: string;
}

const ReviewCard = ({
  avatar,
  name,
  rating,
  date,
  description,
}: ReviewCardProps) => {
  return (
    <Card className="flex-1 mb-4 p-2">
      <div className="flex flex-col items-center mb-2">
        <div className="w-full flex items-start gap-x-2">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <h3 className="text-sm font-medium text-grayscale-400">{date}</h3>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-y-1 mt-4">
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="text-yellow-primary fill-current w-3 h-3" />
            {rating}
          </span>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
