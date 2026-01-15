import { TfiReload } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CircleAlert } from "lucide-react";

interface ReturnPolicySectionProps {
  returnDelivery: number;
}

const ReturnPolicySection: React.FC<ReturnPolicySectionProps> = ({
  returnDelivery,
}) => {
  const { t } = useTranslation();
  return (
    <div className="border-t-2 flex-col sm:flex-row border-t-black flex items-center px-5  py-10 gap-5">
      <TfiReload className="text-display" />
      <div className="flex flex-col gap-2 item-start ">
        <h3 className="text-h3 font-semibold max-sm:text-center">{t("Return Delivery")}</h3>
        {returnDelivery > 0 ? (
          <span className="font-semibold flex gap-2">
            <HoverCard>
              <HoverCardTrigger className="underline cursor-pointer">
                <CircleAlert />
              </HoverCardTrigger>
              {returnDelivery} {t("Days Return Policy")}
              <HoverCardContent className="text-left max-w-sm">
                {t("Details")}
              </HoverCardContent>
            </HoverCard>
          </span>
        ) : (
          <span className="text-red-500 font-semibold">
            {t("Not Available")}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReturnPolicySection;
