import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { useTranslation } from "react-i18next";

// import qrCode from "../../assets/images/Qr Code.png";
const socialLinks = [
  { icon: <FaFacebook className="size-6" />, label: "Facebook", url: "#" },
  { icon: <FaInstagram className="size-6" />, label: "Instagram", url: "#" },
  { icon: <FaTwitter className="size-6" />, label: "Twitter", url: "#" },
  { icon: <FaGithub className="size-6" />, label: "GitHub", url: "#" },
  { icon: <FaDribbble className="size-6" />, label: "Dribbble", url: "#" },
];

function Footer() {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t("Support"),
      links: [
        { label: t("111 Bijoy Sarani, Dhaka, Bangladesh"), url: "/Contact" },
        { label: "exclusive@gmail.com", url: "/Contact" },
        { label: "+88015-88888-9999", url: "/Contact" },
      ],
    },
    {
      title: t("Account"),
      links: [
        { label: t("My Account"), url: "/account" },
        { label: t("Login / Register"), url: "/SignUp" },
        { label: t("Cart"), url: "/cart" },
        { label: t("Wishlist"), url: "/Favourites" },
        { label: t("Shop"), url: "/AllProducts" },
      ],
    },
    {
      title: t("Quick Links"),
      links: [
        { label: t("Privacy Policy"), url: "/about" },
        { label: t("Terms Of Use"), url: "/about" },
        { label: t("FAQ"), url: "/about" },
        { label: t("Contact"), url: "/Contact" },
      ],
    },
  ];

  return (
    <footer
      className="bg-black text-white overflow-hidden mt-20"
      role="contentinfo"
    >
      <div className="  container mx-auto px-2 pt-16 pb-6 sm:px-2 lg:px-8 lg:pt-24">
        <div className="grid  grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Brand & Social */}
          <section
            aria-labelledby="footer-brand"
            className="flex  flex-col items-center md:items-start"
          >
            <h2
              id="footer-brand"
              className="text-h3 font-bold text-center sm:text-left"
            >
              Exclusive
            </h2>
            <p className="mt-6 max-w-md text-center sm:text-left text-body leading-relaxed">
              {t(" Subscribe to our newsletter and get")}{" "}
              <strong>{t("10% off")}</strong> {t("your first order.")}
            </p>
            <div className="w-full md:max-w-[200px] mt-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-400 text-gray-600 text-body-sm border-2 border-gray-200 rounded-xs transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300"
                  placeholder={t("Enter your email")}
                />

                <AiOutlineSend className="absolute w-5 h-5 top-2.5 right-2.5 text-white" />
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="grid max-[370px]:grid-cols-1 grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2"
          >
            {footerSections.map((section, index) => (
              <section
                className=""
                key={index}
                aria-labelledby={`footer-${section.title}`}
              >
                <h3
                  id={`footer-${section.title}`}
                  className="text-h5 font-medium text-white"
                >
                  {section.title}
                </h3>
                <ul className="mt-6 space-y-4 text-body-sm">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        className="text-gray-300 transition hover:text-gray-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Download App */}
            <section
              aria-labelledby="footer-download"
              className="flex flex-col items-start"
            >
              <h3
                id="footer-download"
                className="text-h5 font-medium text-white"
              >
                {t("downloadapp")}
              </h3>
              <p className="text-caption text-gray-300">{t("saveapp")}</p>
              <div className="mt-4 flex items-center gap-4">
                {/* <img src={qrCode} className="w-24 h-24 mt-8 max-sm:hidden md:hidden lg:block" /> */}
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#"
                    className="flex items-center gap-2 border border-gray-300 p-2 rounded-md w-40"
                    aria-label="Download on Google Play"
                  >
                    <FaGooglePlay className="size-6" />
                    <div className="text-caption text-gray-400 leading-tight">
                      Get it on
                      <span className="block text-body text-white font-semibold">
                        Google Play
                      </span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 border border-gray-300 p-2 rounded-md w-40"
                    aria-label="Download on App Store"
                  >
                    <FaApple className="size-6" />
                    <div className="text-caption text-gray-400 leading-tight">
                      Download on the
                      <span className="block text-body text-white font-semibold">
                        App Store
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social media */}
              <ul className="mt-8 flex justify-center gap-3 sm:justify-start md:gap-4">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      aria-label={social.label}
                      className="text-white transition hover:text-white/75"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </nav>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12   border-t border-gray-800 pt-6">
          <div className="text-center ">
            <p className="mt-4 text-body-sm text-gray-400 sm:order-first sm:mt-0">
              {t("copyright Rimel ")} {new Date().getFullYear()}&
              {t(" All rights reserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
