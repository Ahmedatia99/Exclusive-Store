import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Product_Card from "@/components/common/Product_Card/Product_Card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Swiper as SwiperType } from "swiper";
import SectionHeader from "@/components/common/SectionHeader";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useExploreOurProductsSectionProducts } from "@/hooks/productsCustomHook/useExploreOurProductsSectionProducts";
import { LoadingSpinner } from "@/components/common/Loading";

const FlashSales = () => {
  const { products, loading, error } = useExploreOurProductsSectionProducts(); //  + flashSaleEndTime
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);
  const { t } = useTranslation();

  const toSalesPage = () => navigate("/AllProducts/flashsales");

  const productCardProps = {
    hasFavouriteIcon: true,
    hasviewIcon: true,
    hasReview: true,
  };

  return (
    <div>
      <SectionHeader
        label={t("Today's")}
        title={t("Flash Sales")}
        swiperRef={swiperRef}
        countdownTarget={new Date(new Date().getTime() + 24 * 60 * 60)}
        className="mb-10"
      />

      {loading ? (
        <LoadingSpinner fullScreen={false} size={30} />
      ) : error ? (
        <div className="flex justify-center items-center h-75">
          <p className="text-main text-body-lg">Error: {error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-75">
          <p className="text-gray-400 text-body-lg">No products found</p>
        </div>
      ) : (
        <Swiper
          key={i18n.dir()}
          dir={i18n.dir()}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={4}
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
              <Product_Card products={[p]} componentProps={productCardProps} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-center mt-12">
        <Button
          className="h-15 hover transform capitalize hover:scale-105 transition duration-300"
          onClick={toSalesPage}
        >
          {t("See More Deals")}
        </Button>
      </div>
    </div>
  );
};

export default FlashSales;
