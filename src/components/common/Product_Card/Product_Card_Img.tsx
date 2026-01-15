import { getCloudinaryUrl } from "@/utils/ProductStats";
import { memo } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  itemProp?: string;
};

const ProductImage = ({ src, alt, itemProp }: ProductImageProps) => (
  <div className="px-3 py-2.5 flex justify-center items-center mt-1.5 h-[100px]">
    <img
      src={getCloudinaryUrl(src, { w: 120, h: 87 })}
      alt={alt}
      itemProp={itemProp}
      fetchPriority="high"
      width={120}
      height={87}
      loading="eager"
      decoding="async"
      className="transition-transform duration-300 hover:scale-105 object-contain max-h-full max-w-full"
    />
  </div>
);

export default memo(ProductImage);
