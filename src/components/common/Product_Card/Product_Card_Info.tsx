import StarRating from "./Product_Card_Rating";
import type { productObject } from "../../../types/product_Type";
import { Link } from "react-router-dom";
import React from "react";

function Product_Card_InfoComponent({
  product,
  hasReview,
  hasColors,
  ratingAndPriceInRow,
  selectedColor,
  onColorSelect,
}: {
  product: productObject;
  hasReview?: boolean;
  hasColors?: boolean;
  ratingAndPriceInRow?: boolean;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}) {
  return (
    <div className="mt-1.5 flex flex-col gap-1 ml-1.5 md:ml-0 min-h-[60px]">
      <Link to={`/product/${product.id}`}>
        <h3
          itemProp="name"
          className="font-semibold text-caption leading-tight"
          title={product.title}
        >
          {product.title.length > 14
            ? product.title.slice(0, 14) + "..."
            : product.title}
        </h3>
      </Link>

      <div
        className={`flex gap-4 ${
          ratingAndPriceInRow ? "flex-row" : "flex-col"
        } `}
      >
        {product.discountPrice ? (
          <div
            itemScope
            itemType="https://schema.org/Offer"
            className="flex gap-4"
          >
            <span
              className="productPrice text-[#DB4444] text-body-sm font-medium"
              itemProp="price"
            >
              {product.discountPrice}$
            </span>
            <meta itemProp="priceCurrency" content="EGP" />
            <del className="text-[#727272] text-caption font-medium">
              {product.price}
            </del>
          </div>
        ) : (
          <span className="productPrice text-[#DB4444] text-body-sm font-medium">
            {product.price}$
          </span>
        )}

        {hasReview && (
          <div
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
            className="flex items-center gap-2 mt-auto"
          >
            <StarRating rating={product.avgRate} />

            <span className="text-[#727272] font-medium text-caption">
              ({product.ratingCount})
            </span>

            <meta itemProp="ratingValue" content={product.avgRate.toString()} />
            <meta
              itemProp="reviewCount"
              content={product.ratingCount.toString()}
            />
          </div>
        )}
      </div>

      {product.colors && hasColors && (
        <div className="colors flex gap-2">
          {product.colors.map((colorVariant, index) => {
            return (
              <Link
                key={index}
                to={`/product/${product.id}?color=${colorVariant.color}`} // 👈 بنبعت اللون هنا
              >
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name={`color-${product.id}`} // 👈 عشان يبقى unique لكل كارت
                    value={colorVariant.color}
                    checked={selectedColor === colorVariant.color}
                    onChange={() => onColorSelect(colorVariant.color)}
                    className="peer hidden"
                  />

                  <span
                    className={`
                flex items-center justify-center
                w-7 h-7 rounded-full transition-all
                ${
                  selectedColor === colorVariant.color
                    ? "border-2 border-black"
                    : "border-2 border-transparent"
                }
                hover:border-2 hover:border-black
              `}
                  >
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: colorVariant.color }}
                      />
                    </span>
                  </span>
                </label>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

const Product_Card_Info = React.memo(Product_Card_InfoComponent);

export default Product_Card_Info;
