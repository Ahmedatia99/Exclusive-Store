import { useTranslation } from "react-i18next";

function OurFeatures() {
  const { t } = useTranslation();
  const features = [
    {
      id: 1,
      title: t("FREE AND FAST DELIVERY"),
      description: t("Free delivery for all orders over $140"),
      img: "https://res.cloudinary.com/dx07dkalc/image/upload/v1759138333/Services_1_snklaw.png",
      alt: "Icon representing fast delivery with a headset",
    },
    {
      id: 2,
      title: t("24/7 CUSTOMER SERVICE"),
      description: t("Friendly 24/7 customer support"),
      img: "https://res.cloudinary.com/dx07dkalc/image/upload/v1759138373/Services_2_hfhsc1.png",
      alt: "Icon representing customer service support",
    },
    {
      id: 3,
      title: t("MONEY BACK GUARANTEE"),
      description: t("We return money within 30 days"),
      img: "https://res.cloudinary.com/dx07dkalc/image/upload/v1759138299/Services_wjpk0n.png",
      alt: "Icon representing money-back guarantee",
    },
  ];

  return (
    <section
      className="mb-20 max-w-full w-full self-center"
      aria-labelledby="our-features-heading"
    >
      <h2 id="our-features-heading" className="sr-only">
        {t("Our Store Features")}
      </h2>

      <ul className="flex justify-center items-start gap-20 max-sm:flex-col">
        {features.map((feature) => (
          <li
            key={feature.id}
            className="flex flex-col w-full md:px-5 items-center justify-center text-center"
          >
            <img
              src={feature.img}
              alt={feature.alt}
              loading="lazy"
              width={81}
              height={80}
              className="mb-4"
            />
            <h3 className="font-semibold text-h4 mb-2">{feature.title}</h3>
            <p className="text-body ">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OurFeatures;
