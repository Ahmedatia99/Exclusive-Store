/**
 * Component that displays available sizes for a product and allows the user to select one.
 *
 * @component
 * @example
 * <ProductSizes sizes={['S', 'M', 'L']} onSelectSize={handleSelectSize} />
 *
 * @param {Object} props - Component props
 * @param {string[]} props.sizes - Array of available sizes for the product
 * @param {(size: string) => void} props.onSelectSize - Callback function invoked when a size is selected
 *
 * @returns {JSX.Element} Rendered component for selecting product sizes
 */
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTranslation } from "react-i18next";
interface ProductSizesProps {
  sizes: string[];
  selectedSize?: string;
  setSelectedSize: (val: string) => void;
}

const ProductSizes: React.FC<ProductSizesProps> = ({
  sizes,
  selectedSize,
  setSelectedSize,
}) => {
  const { t } = useTranslation();

  if (!sizes?.length) return null;

  return (
    <div className="flex flex-col gap-3 pt-1 pb-2">
      {/* Label */}
      <div className="flex items-center gap-2 sm:gap-9">
        <p className="text-h3 font-semibold" id="product-size-label">
          {t("Size")}:
        </p>

        {/* Toggle Group */}
        <ToggleGroup
          type="single"
          value={selectedSize}
          onValueChange={(val) => val && setSelectedSize(val)}
          className="flex-wrap gap-4 w-full !flex"
          aria-labelledby="product-size-label"
        >
          {sizes.map((size) => (
            <ToggleGroupItem
              key={size}
              value={size}
              aria-label={`Select size ${size}`}
              className="w-10 h-10 sm:w-12 sm:h-12 text-h5 cursor-pointer rounded-md transition-colors duration-200
                data-[state=off]:border-2 data-[state=off]:border-[#0000005e]
                data-[state=on]:text-white data-[state=on]:bg-[#DB4444] data-[state=on]:border-[#DB4444]"
            >
              {size}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ProductSizes;
