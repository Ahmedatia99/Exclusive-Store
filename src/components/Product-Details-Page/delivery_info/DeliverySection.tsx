import { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface DeliverySectionProps {
  delivery: boolean;
  deliveryPostalCodes?: number[];
  selectedPostalCode?: string;
  setSelectedPostalCode?: (val: string) => void;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({
  delivery,
  deliveryPostalCodes,
  selectedPostalCode,
  setSelectedPostalCode,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [internalPostal, setInternalPostal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const postal =
    selectedPostalCode !== undefined ? selectedPostalCode : internalPostal;
  const setPostal = setSelectedPostalCode || setInternalPostal;

  const checkDelivery = (val: string) => {
    if (!val.match(/^\d+$/)) {
      setResult("Please enter a valid number");
      return;
    }
    const num = parseInt(val, 10);
    if (deliveryPostalCodes && deliveryPostalCodes.includes(num)) {
      setResult(t("🎉 Free Delivery Available!"));
    } else {
      setResult(t("No Free Delivery for this area"));
    }
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row items-center px-5 py-10 gap-5">
      <TbTruckDelivery className="text-display" />
      <div className="flex flex-col gap-2 max-sm:items-center md:items-start">
        <h3 className="text-h3 font-semibold">{t("delivery.title")}</h3>
        {delivery ? (
          <>
            <Link
              type="button"
              className="cursor-pointer text-black underline font-semibold text-center"
              onClick={() => setShowInput((v) => !v)}
              to=""
            >
              {t("Enter your postal code for Delivery Availability")}
            </Link>

            {showInput && (
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="border rounded px-2 py-1 w-40"
                  placeholder={t("Enter_postal_code")}
                  value={postal}
                  onChange={(e) => {
                    setPostal(e.target.value.replace(/[^0-9]/g, ""));
                    setResult(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && postal) {
                      checkDelivery(postal);
                    }
                  }}
                />
                <Button
                  className="w-full"
                  onClick={() => checkDelivery(postal)}
                  disabled={!postal}
                >
                  {t("Check")}
                </Button>
                {result && (
                  <span
                    aria-live="polite"
                    className={
                      result.includes("Free")
                        ? "text-red-600 font-medium"
                        : "text-green-500 font-medium"
                    }
                  >
                    {result}
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <span className="text-red-500 font-semibold">Not Available</span>
        )}
      </div>
    </div>
  );
};

export default DeliverySection;
