import CountdownTimer from "../CountdownTimer/CountdownTimer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCloudinaryUrl } from "@/utils/ProductStats";

function SpecialCard() {
  const navigate = useNavigate();
  const navigateSpecialProduct = () => {
    navigate("/product/9");
  };
  const { t } = useTranslation();

  return (
    <section
      className="my-10 bg-black overflow-hidden"
      aria-labelledby="special-offer-title"
    >
      <div className="w-full flex flex-col-reverse md:flex-row justify-around items-center py-14 px-4 md:px-20 gap-5 md:gap-10">
        {/* Texts */}
        <div className="flex flex-col justify-center items-start gap-4 md:gap-8 max-w-lg">
          <span
            className="text-green-400 text-h4 font-semibold    tracking-wide"
            aria-label="Product category"
          >
            {t("Categories")}
          </span>

          <h2
            id="special-offer-title"
            className="font-semibold text-h3 md:text-h2 lg:text-h1 text-white leading-tight"
          >
            Enhance Your Music Experience
          </h2>

          {/* Accessible countdown timer */}
          <CountdownTimer
            targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
            className="mt-4"
          />

          {/* CTA Button */}
          <Button
            size="sm"
            variant="small"
            aria-label="Buy special product now"
            className="bg-green-400 mt-5 hover:scale-110 hover:text-black transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
            onClick={navigateSpecialProduct}
          >
            {t("Buy Now")}
          </Button>
        </div>

        {/* Product Image */}
        <div className="w-full md:w-auto flex justify-center">
          <img
            src={getCloudinaryUrl(
              "https://res.cloudinary.com/dx07dkalc/image/upload/v1759137493/JBL_BOOMBOX_2_HERO_020_x1_mpjgk8.png",
              { w: 320, h: 320 }
            )}
            alt="Limited-time special music boombox product"
            loading="lazy"
            decoding="async"
            width={320}
            height={320}
            className="w-64 sm:w-80 md:w-115 rounded-xl object-contain
             transition-all duration-500 ease-in-out
             drop-shadow-[0_15px_40px_rgba(255,255,255,0.4)]
             hover:drop-shadow-[0_25px_60px_rgba(0,255,102,0.6)]
             hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

export default SpecialCard;
