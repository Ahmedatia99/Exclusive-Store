import { memo, useState } from "react";
import { Heart, Heart as HeartFilled, Eye } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ProductCardProps } from "../../../types/Components_type";
import type { productObject } from "@/types/product_Type";
import { useTranslation } from "react-i18next";
import { useWishlist } from "@/hooks/WishListContext/useWishlist";

const ProductActions = ({
  componentProps,
  product,
}: {
  componentProps?: ProductCardProps;
  product: productObject;
}) => {
  // Access wishlist context

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const { t } = useTranslation();
  // Check if the product is already in the wishlist
  const liked = wishlist.includes(product.id);
  // Toggle wishlist status
  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const [mainImage, setMainImage] = useState(product.mainImgSRC);

  return (
    <div className="icons absolute right-2 top-2 flex flex-col gap-3">
      {/* Favourite button */}
      {componentProps?.hasFavouriteIcon && (
        <button
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          onClick={toggleWishlist}
          className="bg-white rounded-full w-7 h-7 flex items-center justify-center hover:scale-120 transition-transform"
        >
          {liked ? (
            <HeartFilled className="fill-red-500 cursor-pointer" />
          ) : (
            <Heart className="text-gray-700 cursor-pointer" />
          )}
        </button>
      )}

      {/* View product details in dialog */}
      {componentProps?.hasviewIcon && (
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label="View product details"
              className="bg-white rounded-full w-7 h-7 flex items-center justify-center hover:scale-120 transition-transform"
            >
              <Eye className="cursor-pointer" />
            </button>
          </DialogTrigger>

          <DialogContent className="border-5">
            <DialogHeader>
              <DialogTitle>{product.title}</DialogTitle>
              <DialogDescription>
                {t("Quick view of product details including images and price.")}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                <img
                  src={product.mainImgSRC}
                  alt="main thumb"
                  width={100}
                  height={100}
                  className="rounded cursor-pointer"
                  onClick={() => setMainImage(product.mainImgSRC)}
                />
                {product.colors
                  ?.flatMap((c) => c.images)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`thumb-${i}`}
                      width={100}
                      height={100}
                      className="rounded cursor-pointer"
                      onClick={() => setMainImage(img)}
                    />
                  ))}
              </div>

              {/* Main preview image */}
              <div className="col-span-2 flex items-center justify-center">
                <img
                  src={mainImage}
                  alt="main view"
                  width={400}
                  height={400}
                  className="rounded"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="mt-4 space-y-2">
              <p className="text-3xl font-semibold text-red-600">
                {product.discountPrice ? (
                  <>
                    {product.discountPrice}$
                    <span className="text-gray-500 text-lg line-through ml-2">
                      {product.price}$
                    </span>
                  </>
                ) : (
                  `${product.price}$`
                )}
              </p>
            </div>

            {/* 🟢 View More Details button */}
            <div className="mt-6">
              <a
                href={`/product/${product.id}`}
                className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-[#DB4444] transition"
              >
                {t("VIEW MORE DETAILS")}
              </a>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete button */}
      {componentProps?.hasDeleteIcon && (
        <button
          aria-label="Delete product"
          className="bg-white rounded-full w-7 h-7 flex cursor-pointer items-center justify-center hover:scale-120 transition-transform"
          onClick={() => {
            removeFromWishlist(product.id);
          }}
        >
          <BsTrash3 className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default memo(ProductActions);
