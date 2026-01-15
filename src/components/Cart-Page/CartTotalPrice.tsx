import { useCart } from "@/hooks/useCart";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function CartTotalPrice() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getTotalPrice } = useCart();
  const subtotal = getTotalPrice();

  return (
    <div
      className="border rounded-md p-5"
      id="cart-summary"
      aria-label="Cart total summary"
    >
      <h2 className="font-semibold text-body-lg mb-3">{t("cart_total")}</h2>

      <div className="flex justify-between mb-2">
        <span>{t("shipping")}:</span>
        <span className="text-green-600">{t("free")}</span>
      </div>
      <div className="flex justify-between font-semibold text-body-lg">
        <span>{t("total")}:</span>
        <span>${subtotal}</span>
      </div>
      <Button
        onClick={() => {
          navigate("/checkout");
        }}
        className="!py-0 !px-3 max-sm:!text-xs w-full mt-5"
      >
        {t("proceed_checkout")}
      </Button>
    </div>
  );
}

export default React.memo(CartTotalPrice);
