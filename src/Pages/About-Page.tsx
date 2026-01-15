import Breadcrumbs from "@/components/common/Breadcrumbs";
import OurFeatures from "@/components/common/OurFeatures";
import { useTranslation } from "react-i18next";
import { FaStore, FaShippingFast, FaHeadset, FaAward } from "react-icons/fa";

const aboutCards = [
  {
    id: 1,
    icon: FaStore,
    titleKey: "aboutStore",
    descKey: "aboutStoreDesc",
  },
  {
    id: 2,
    icon: FaShippingFast,
    titleKey: "aboutShipping",
    descKey: "aboutShippingDesc",
  },
  {
    id: 3,
    icon: FaHeadset,
    titleKey: "aboutSupport",
    descKey: "aboutSupportDesc",
  },
  {
    id: 4,
    icon: FaAward,
    titleKey: "aboutQuality",
    descKey: "aboutQualityDesc",
  },
];

function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-3">
      <Breadcrumbs />
      <div className="container mx-auto px-3  py-10">
        <section
          className="bg-white rounded-lg shadow-lg py-8 px-5 flex flex-col items-center gap-10"
          aria-labelledby="about-title"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <img
              src="https://res.cloudinary.com/dx07dkalc/image/upload/v1760563858/eCommerce_Platform_yh3aqk.png"
              alt={t("aboutTitle")}
              className="w-40 h-40 object-cover rounded-full shadow-xl mb-10"
              loading="lazy"
            />
            <h1 id="about-title" className="heading text-black mb-10">
              {t("aboutTitle")}
            </h1>
            <p className="text-gray-700 text-body-lg font-semibold max-w-2xl mb-4">
              {t("aboutDesc")}
            </p>
          </div>

          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-10"
            aria-label={t("aboutHighlights")}
          >
            {aboutCards.map(({ id, icon: Icon, titleKey, descKey }) => (
              <article
                key={id}
                className="flex flex-col hover:scale-105 transition duration-300 items-center bg-gray-200 rounded-lg p-6 shadow text-center"
                role="region"
                aria-labelledby={`about-card-${id}`}
              >
                <Icon className="text-main text-h1 mb-2" aria-hidden="true" />
                <h2 id={`about-card-${id}`} className="font-bold text-h4 mb-1">
                  {t(titleKey)}
                </h2>
                <p className="text-gray-600">{t(descKey)}</p>
              </article>
            ))}
          </section>

          <OurFeatures />
        </section>
      </div>
    </div>
  );
}

export default About;
