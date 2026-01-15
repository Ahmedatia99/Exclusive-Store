import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import Product_Card from "@/components/common/Product_Card/Product_Card";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useBestSellingSectionProducts } from "@/hooks/productsCustomHook/useBestSellingSectionProducts";
import { LoadingSpinner } from "@/components/common/Loading";

const BestProducts = () => {
  const { products, loading, error } = useBestSellingSectionProducts();
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  //  navigate to /product/best
  const toSalesPage = () => {
    navigate("/Allproducts/bestselling");
  };

  const productCardProps = {
    AddToCartBtnFixed: false,
    hasFavouriteIcon: true,
    hasviewIcon: true,
    hasDeleteIcon: false,
    hasReview: true,
    hasColors: false,
    ratingAndPriceInRow: false,
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-end justify-end w-full mt-20">
        <SectionHeader
          label={t("This Month")}
          title={t("Best Selling Products")}
          swiperRef={swiperRef}
          className="mb-10 gap-10"
        />
      </div>

      <div>
        {loading ? (
          <LoadingSpinner fullScreen={false} size={30} />
        ) : error ? (
          <p className="text-center text-main">
            {t("Failed to load products")}
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400">
            {t("No products available")}
          </p>
        ) : (
          <Swiper
            key={i18n.dir()}
            dir={i18n.dir()}
            modules={[Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 3, spaceBetween: 8 },
              480: { slidesPerView: 3, spaceBetween: 8 },
              640: { slidesPerView: 3, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 6, spaceBetween: 12 },
              1280: { slidesPerView: 6, spaceBetween: 12 },
              1536: { slidesPerView: 6, spaceBetween: 14 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p.id}>
                <Product_Card
                  products={[p]}
                  componentProps={productCardProps}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          className="h-15 hover transform hover:scale-105 transition duration-300"
          onClick={toSalesPage}
        >
          {t("View Best Selling")}
        </Button>
      </div>
    </div>
  );
};

export default BestProducts;
