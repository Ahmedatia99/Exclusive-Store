import { useCart } from "@/hooks/useCart";
import type { cartProduct } from "@/types/cart";
import React from "react";
import { useTranslation } from "react-i18next";

type CartQuantityProps = {
  item: cartProduct;
};
function CartQuantity({ item }: CartQuantityProps) {
  const { editQuantity } = useCart();
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <label
        htmlFor={`qty-${item.key}`}
        className="max-sm:flex items-center mr-2 text-main font-semibold hidden"
      >
        {t("quantity")}:
      </label>
      <input
        id={`qty-${item.key}`}
        type="number"
        value={item.quantity}
        min={1}
        max={20}
        onChange={(e) => editQuantity(item.key, parseInt(e.target.value))}
        onKeyDown={(e) => e.preventDefault()}
        className="border-2 rounded p-1.5 w-20 text-center "
      />
    </div>
  );
}

export default React.memo(CartQuantity);
