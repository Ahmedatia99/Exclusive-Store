import React from "react";
import { GoHeart } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/WishListContext/useWishlist";

interface LikeButtonProps {
  productId: number;
}

const LikeButtonDetails: React.FC<LikeButtonProps> = ({ productId }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const liked = wishlist.includes(productId);

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <Button
      type="button"
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={liked}
      className={`w-fit h-fit border ring-2 ring-gray-300 transition 
        ${liked ? "bg-main border-main" : "bg-white"}`}
      onClick={toggleWishlist}
    >
      <GoHeart className={`text-h1 ${liked ? "text-white" : "text-black"}`} />
    </Button>
  );
};

export default LikeButtonDetails;
