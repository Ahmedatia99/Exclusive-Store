import React from "react";
import { useTranslation } from "react-i18next";

/**
 * ProductLabel component
 *
 * Renders SEO-friendly product labels:
 * - "NEW" → shown if the product is newly released
 * - "Discount" → shown if the product has a discount percentage
 *
 * SEO:
 * - Uses <span> with itemProp instead of <button>
 * - Helps search engines understand product status and offers
 */

const ProductLabel = React.memo(
    

  ({ type, value }: { type: "new" | "discount"; value?: number }) => {
    const { t } = useTranslation();
    if (type === "new") {
      
      return (
        <span
          itemProp="releaseStatus"
          className="bg-[#00FF66] text-white rounded absolute top-1 left-2 px-1.5 py-0.5 text-caption font-semibold"
        >
          {t("NEW")}
        </span>
      );
    }

    if (type === "discount" && value) {
      return (
        <span
          itemProp="discount"
          className="bg-[#DB4444] text-white rounded absolute top-1 left-2 px-2 py-0.5 text-caption font-semibold"
        >
          -{value}%
        </span>
      );
    }

    return null;
  }
);

export default ProductLabel;
