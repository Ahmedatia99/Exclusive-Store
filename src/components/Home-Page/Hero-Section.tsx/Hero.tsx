import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import i18n from "@/i18n";
import SidebarCategories from "./SidebarCategories";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import { useHookProducts } from "@/hooks/productsCustomHook/useHookProducts";
import type { hookProductObject } from "@/types/product_Type";
import { categoriesData } from "@/components/CategroyComponents/categoriesData";
import { LoadingSpinner } from "@/components/common/Loading";

export default function Hero() {
  const { products, loading, error } = useHookProducts();

  return (
    <section className="flex flex-col md:flex-row  ">
      <SidebarCategories categories={categoriesData} />

      <div
        className="w-full cursor-grab bg-black text-white flex md:flex-row 
        items-center justify-between flex-col-reverse md:mt-8 ltr:md:ml-4 rtl:md:mr-4
        px-4 md:px-10 pt-4 md:pt-10 pb-2 min-h-[200px] md:h-96 overflow-hidden bg-[url('@/assets/images/icon-dotted-map-2.png')] bg-cover bg-center md:rounded-lg sm:rounded-none relative"
      >
        <div className="absolute top-1/2 left-1/2 max-sm:right-0 translate-x-1/2 -translate-y-1/2">
          <img
            src="/assets/circle-lines.png"
            alt="Dotted Map"
            className="w-xl hidden xl:block"
          />
        </div>
        {loading ? (
          <LoadingSpinner fullScreen={false} size={35} />
        ) : error ? (
          <p className="text-red-500 text-body-lg m-auto">Error: {error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-body-lg m-auto">No products found</p>
        ) : (
          <Swiper
            key={i18n.dir()}
            dir={i18n.dir()}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            spaceBetween={20}
            className="w-full h-full cursor-pointer hero-swiper"
            style={
              {
                "--swiper-pagination-bullet-size": "16px",
                "--swiper-pagination-bullet-horizontal-gap": "8px",
                "--swiper-pagination-bullet-inactive-color": "#d1d5db",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-color": "#DB4444",
              } as React.CSSProperties
            }
          >
            {products.map((slide: hookProductObject) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col gap-4 md:gap-20 md:flex-row-reverse items-center justify-center md:justify-between h-full py-2 md:py-0">
                  <HeroImage slide={slide} />
                  <HeroContent slide={slide} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
