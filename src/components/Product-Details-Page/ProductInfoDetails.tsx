import { useTranslation } from "react-i18next";
import StarRating from "../common/Product_Card/Product_Card_Rating";

interface ProductInfoProps {
  product: {
    title: string;
    rating: number;
    reviews: number;
    stock: number;
    price: number;
    description: string;
    discountPrice?: number; // represents discount percentage
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="product-title" className="flex flex-col gap-3">
      <h1 id="product-title" className="heading ">
        {product.title}
      </h1>

      {/* Rating and stock info */}
      <div className="flex items-center gap-3 flex-wrap">
        <StarRating rating={product.rating} />
        <span className="text-gray-700 text-h4">
          ({product.reviews} {t("reviews")})
        </span>
        <hr className="h-5 border-1 border-gray-600" />

        {/* Accessible stock status */}
        <span
          className={`text-h4 font-semibold ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
          aria-live="polite"
        >
          {product.stock > 0
            ? t("inStock", { stock: product.stock })
            : t("Out of Stock")}
        </span>
      </div>

      {/* Price with discount */}
      <span className="text-h1 font-semibold">
        ${product.price}
        {product.discountPrice && product.discountPrice > 0 && (
          <span className="ml-4 text-h5 text-gray-400 line-through font-normal">
            ${product.discountPrice}
          </span>
        )}
      </span>

      {/* Description */}
      <p>{product.description}</p>
      <hr className="w-full border-1 border-gray-300 mt-5" />
    </section>
  );
};

export default ProductInfo;
