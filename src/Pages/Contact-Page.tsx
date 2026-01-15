import React from "react";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
    // TODO: Send form data to API or email service
  };

  return (
    <div className="container mx-auto px-5">
      <Breadcrumbs />

      <section
        className="flex flex-col md:flex-row items-stretch justify-center gap-5"
        aria-labelledby="contact-title"
      >
        {/* Left Section */}
        <aside
          className="shadow-sm flex flex-col justify-center p-7 gap-10 w-full md:w-1/3 bg-white"
          aria-label="Contact Information"
        >
          {/* Phone Contact */}
          <div className="flex flex-col gap-7">
            <div className="flex gap-3 items-center">
              <div
                className="bg-[#DB4444] rounded-full flex items-center justify-center p-2"
                aria-hidden="true"
              >
                <Phone color="white" />
              </div>
              <h2 id="contact-title" className="font-semibold text-body-lg">
                {t("callToUs")}
              </h2>
            </div>
            <div className="flex flex-col gap-5 font-medium text-body">
              <p>{t("available247")}</p>
              <p>
                {t("phone")}:{" "}
                <a
                  href="tel:+8801611112222"
                  className="text-[#ff7979] underline"
                >
                  +8801611112222
                </a>
              </p>
            </div>
          </div>

          <hr className="h-0.5 w-full bg-gray-300 my-5" />

          {/* Email Contact */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <div
                className="bg-[#DB4444] rounded-full flex items-center justify-center p-2"
                aria-hidden="true"
              >
                <Mail color="white" />
              </div>
              <h2 className="font-semibold text-body-lg">{t("writeToUs")}</h2>
            </div>
            <div className="flex flex-col gap-5 font-medium text-body">
              <p>{t("fillFormContact")}</p>
              <p>
                {t("email")}:{" "}
                <a
                  href="mailto:customer@exclusive.com"
                  className="text-[#ff7979] underline"
                >
                  customer@exclusive.com
                </a>
              </p>
              <p>
                {t("email")}:{" "}
                <a
                  href="mailto:support@exclusive.com"
                  className="text-[#ff7979] underline"
                >
                  support@exclusive.com
                </a>
              </p>
            </div>
          </div>
        </aside>

        {/* Right Section */}
        <div className="shadow-sm p-7 w-full md:w-2/3 flex flex-col justify-center bg-white">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            aria-label="Contact Form"
          >
            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder={t("yourName") + " *"}
                className="bg-[#F5F5F5] rounded-sm py-3 px-4 w-full"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("yourEmail") + " *"}
                className="bg-[#F5F5F5] rounded-sm py-3 px-4 w-full"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("yourPhone") + " *"}
                className="bg-[#F5F5F5] rounded-sm py-3 px-4 w-full"
                required
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder={t("yourMessage") + " *"}
              className="bg-[#F5F5F5] rounded-sm py-3 px-4 w-full min-h-[280px] max-h-[400px]"
              required
            />

            {/* Submit Button */}
            <div className="flex justify-center md:justify-end">
              <Button type="submit" className="py-7">
                {t("sendMessage")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
