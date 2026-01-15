import type { cartProduct } from "@/types/cart";
import React from "react";
type CartProductProps = {
  item: cartProduct;
};
function CartProduct({ item }: CartProductProps) {


  return (
    <div className="flex relative flex-col items-center gap-3 ml-2">
      
      <img
        src={item.mainImage}
        alt={item.title}
        loading="lazy"
        className="w-32 h-auto md:w-24  mt-3 sm:mt-0 object-contain rounded"
      />
      <span className="font-semibold text-body-sm text-center">{item.title}</span>
    </div>
  );
}

export default React.memo(CartProduct);
