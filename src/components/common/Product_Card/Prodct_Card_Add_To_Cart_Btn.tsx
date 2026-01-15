import { memo, useContext, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

import { useTranslation } from "react-i18next";
import type { cartProduct } from "@/types/cart";
import { CartContext } from "@/hooks/CartContext";

const AddToCartButton = ({
  fixed,
  ProductToAdd,
  className,
}: {
  fixed?: boolean;
  ProductToAdd: cartProduct;
  className?: string;
}) => {
  const cartContext = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);

  const exists = cartContext?.cartProducts.some(
    (p) => p.key === ProductToAdd.key
  );
  const { t } = useTranslation();

  const HandleAddToCartBtn = () => {
    if (exists) {
      cartContext?.editQuantity(
        ProductToAdd.key,
        (cartContext?.cartProducts.find((p) => p.key === ProductToAdd.key)
          ?.quantity || 0) + 1
      );
    } else {
      cartContext?.addToCart(ProductToAdd);
    }

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const buttonClasses = `addToCartBtn text-center p-2 flex items-center justify-center gap-2 rounded-b w-full cursor-pointer text-caption ${
    className || ""
  }`;

  const renderContent = () => {
    if (justAdded) {
      return (
        <>
          <Check aria-hidden="true" />
          <span>{t("Added to Cart")}</span>
        </>
      );
    }
    if (exists) {
      return (
        <>
          <ShoppingCart aria-hidden="true" />
          <span>{t("Increase Quantity")}</span>
        </>
      );
    }
    return (
      <>
        <ShoppingCart aria-hidden="true" />
        <span>{t("Add to Cart")}</span>
      </>
    );
  };

  return (
    <button
      className={`${buttonClasses} ${
        justAdded ? "bg-green-600 text-white" : "bg-black text-white"
      } ${fixed ? "" : "invisible group-hover:visible"}`}
      aria-label="Add this product to your shopping cart"
      onClick={HandleAddToCartBtn}
      disabled={justAdded}
    >
      {renderContent()}
    </button>
  );
};

export default memo(AddToCartButton);
