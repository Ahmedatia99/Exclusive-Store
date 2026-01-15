import { Star, StarHalf } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRatingComponent: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  className,
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (rating >= i) {
      // Full star
      stars.push(
        <Star key={i} className="text-yellow-400 w-3 h-3" fill="currentColor" />
      );
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(
        <StarHalf key={i} className="text-yellow-400 w-3 h-3" fill="currentColor" />
      );
    } else {
      // Outline star
      stars.push(<Star key={i} className="text-gray-300 w-3 h-3" fill="none" />);
    }
  }

  return (
    <div className={`flex gap-0.5 items-center ${className || ""}`}>{stars}</div>
  );
};

const StarRating = React.memo(StarRatingComponent);

export default StarRating;
