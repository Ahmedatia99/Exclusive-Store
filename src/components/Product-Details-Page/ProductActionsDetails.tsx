import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShoppingCart, Ban } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

interface ProductActionsProps {
  stock: number;
  onBuyNow: () => Promise<void> | void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ stock, onBuyNow }) => {
  const { t } = useTranslation();
  const isOutOfStock = stock === 0;

  const buttonLabel = isOutOfStock ? t("Out of Stock") : t("Add to Cart");

  const Icon = isOutOfStock ? Ban : ShoppingCart;

  const handleClick = async () => {
    if (isOutOfStock) {
      toast.error(t("product.out_of_stock"), {
        style: {
          background: "#dc2626",
          color: "#fff",
          border: "1px solid #dc2626",
        },
      });
      return;
    }

    try {
      await onBuyNow();
      toast.success(t("product.add_to_cart"), {
        description: t("product Added to Cart check it"),
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #166534",
        },
      });
    } catch {
      toast.error(t("something_went_wrong"));
    }
  };

  return (
    <div className="w-full h-full">
      <Toaster position="bottom-right" />
      <Button
        type="button"
        disabled={isOutOfStock}
        onClick={handleClick}
        aria-disabled={isOutOfStock}
        aria-label={
          isOutOfStock
            ? t("product.aria_out_of_stock")
            : t("product.aria_buy_now")
        }
        variant="default"
        className={`w-full h-full text-caption md:text-body-sm max-sm:px-2 ${
          isOutOfStock ? "bg-gray-400 text-white cursor-not-allowed" : ""
        }`}
      >
        {/* Text → shown on medium+ screens only */}
        <span className="hidden md:inline">{buttonLabel}</span>

        {/* Icon → shown on small screens only */}
        <Icon className="inline md:hidden w-5 h-5" />
      </Button>
    </div>
  );
};

export default ProductActions;
