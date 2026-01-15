import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SectionHeader from "../../common/SectionHeader/SectionHeader";
import i18n from "@/i18n";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { categoriesData } from "@/components/CategroyComponents/categoriesData";

function Categories() {
  const { t } = useTranslation(); // Translation hook
  const swiperRef = useRef<SwiperType | null>(null); // Swiper reference
  const navigate = useNavigate(); // React Router navigation hook

  // Navigate to selected category page
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section className="px-2">
      {/* Header with title and swiper navigation controls */}
      <div className="mt-10 flex justify-between w-full mb-5 md:mb-10">
        <SectionHeader
          label={t("Categories")}
          title={t("Browse By Category")}
          swiperRef={swiperRef}
        />
      </div>

      {/* Swiper carousel for displaying category cards */}
      <Swiper
        key={i18n.dir()} // Re-render when language direction changes (LTR/RTL)
        dir={i18n.dir()}
        modules={[Navigation]} // Enable navigation module
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 24 },
          1280: { slidesPerView: 6, spaceBetween: 28 },
        }}
      >
        {/* Loop through all categories */}
        {categoriesData.map((category) => (
          <SwiperSlide
            key={category.key}
            onClick={() => handleNavigate(category.url)} // Go to category page
          >
            {/* Category card */}
            <div className="flex flex-col items-center justify-center border py-6 sm:py-8 rounded-lg hover:text-white hover:bg-main cursor-pointer transition">
              <div className="rounded-md flex items-center justify-center text-h1 sm:text-display md:text-display mb-2">
                {category.icon}
              </div>
              <span className="font-medium text-center px-1 w-full xl:text-body-lg sm:text-body md:text-body-sm">
                {t(category.name)}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Categories;
