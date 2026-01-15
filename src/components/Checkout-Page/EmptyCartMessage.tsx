import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

/**
 * EmptyCartMessage Component
 * ---------------------------------------
 * This component is displayed when the shopping cart is empty.
 * It shows:
 * - An illustration of an empty cart.
 * - A heading and a description message.
 * - A button (Link) to redirect users back to the homepage for shopping.
 *
 * Improvements:
 * - Added descriptive alt text for SEO and accessibility.
 * - Used `loading="lazy"` for the image to improve performance.
 * - Added `aria-live="polite"` to announce empty cart state for screen readers.
 * - Wrapped with `React.memo` to avoid unnecessary re-renders.
 * - Converted to a regular function instead of React.FC (no children/props).
 */
function EmptyCartMessage() {
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col items-center justify-center  text-center"
      aria-live="polite" // Accessibility: announce updates politely
    >
      {/* 🛒 Empty cart illustration */}
      <img
        src="https://res.cloudinary.com/dx07dkalc/image/upload/w_300,q_auto,f_auto/v1759134952/Empty-Cart_k6tnyi.jpg
"
        alt="Illustration of an empty shopping cart"
        className=" mb-6"
        loading="lazy" // Performance: lazy load image
      />

      {/* 📝 Heading */}
      <h2 className="text-h3 font-bold text-gray-800 mb-2">
        {t("emptyCartMessage")}
      </h2>

      {/* 🔗 Redirect to homepage button */}
      <Button className="mt-5">
        <Link to="/">{t("goShoppingBtn")}</Link>
      </Button>
    </div>
  );
}

// ✅ Optimization: prevent re-rendering when parent re-renders unnecessarily
export default React.memo(EmptyCartMessage);
