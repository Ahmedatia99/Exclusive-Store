import React from "react";
import { Button } from "../ui/button";
import type { PlaceOrderButtonProps } from "@/types/order";
import { useTranslation } from "react-i18next";

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  cartProducts,
  subtotal,
  paymentMethod,
  setSuccessOpen,
}) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    console.log("🚀 handleSubmit called"); // Function entry log

    // 1. Get the form element by ID
    const form = document.getElementById("billing-form") as HTMLFormElement;

    // 2. Validate form before submission
    if (!form.checkValidity()) {
      form.reportValidity(); // Show browser's built-in validation messages
      return;
    }

    // 3. Collect form data
    const formData = new FormData(form);
    console.log("📦 Raw FormData collected:", formData);

    // 4. Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    // 5. Build the final order object
    const orderData = {
      customer: data,
      items: cartProducts,
      total: subtotal,
      paymentMethod,
    };
    console.log("📝 Final order object created:", orderData);
    if (localStorage.getItem("billingInfo")) {
      localStorage.setItem("billingInfo", JSON.stringify(data));
    }

    // 6. Show success dialog
    setSuccessOpen(true);

    // 8. Reset form after submission
    if (form) {
      form.reset();
      console.log("♻️ Form reset");
    }

    // future
  };

  return (
    <Button
      type="button"
      className="w-full mt-5 bg-[#DB4444] transition duration-300 text-white py-3 rounded hover:bg-red-700 text-body-lg font-semibold"
      onClick={handleSubmit}
    >
      {t("placeOrderBtn")}
    </Button>
  );
};

export default React.memo(PlaceOrderButton);
