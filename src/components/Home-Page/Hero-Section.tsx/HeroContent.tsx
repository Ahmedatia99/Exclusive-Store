import { useTranslation } from "react-i18next";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

type HeroContentProps = {
  slide: {
    id: number;
    title: string;
    description: string;
  };
};

export default function HeroContent({ slide }: HeroContentProps) {
  const navigatHero = useNavigate();

  const handelShopNow = () => {
    navigatHero("/allproducts");
  };

  const { t } = useTranslation();
  return (
    <div className="z-10 text-center md:text-left mb-2 md:mb-0">
      <p className="text-sm md:text-xl flex items-center justify-center md:justify-start gap-2 md:gap-6">
        <span className="text-white text-lg sm:text-2xl md:text-5xl"> {t(slide.title)}</span>
      </p>
      <h1 className="specialHeading mt-1 md:mt-3 leading-tight md:leading-snug text-sm md:text-base">
        {t(slide.description)}
      </h1>
      <button
        onClick={handelShopNow}
        className="cursor-pointer group mt-2 md:mt-5 md:mb-0 mb-2 flex items-center gap-1 md:gap-2 py-1 md:py-2 mx-auto md:mx-0 
             border-b-2 border-white text-white font-medium text-caption md:text-body
             transition-all duration-300 ease-in-out
             hover:text-main hover:border-main"
      >
        {t("shopNow")}
        <GoArrowRight className="w-3 h-3 md:text-h3 transform transition-transform duration-300 group-hover:translate-x-2" />
      </button>
    </div>
  );
}
