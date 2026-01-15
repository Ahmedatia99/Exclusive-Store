import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; // ⬅️ استدعاء الأيقونة
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      localStorage.setItem("i18nextLng", lang);
    });
  };
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <header className="bg-black text-white py-2  z-[60] ">
      <div className="container mx-auto flex flex-col gap-3 items-center justify-between px-4 md:flex-row ">
        {/* Left / Centered Text */}
        <h2 className="text-body-sm sm:text-body text-center flex-1">
          {t("summerSale")}
          <Link
            to={"/AllProducts"}
            className="underline font-bold hover:text-gray-200 transition-colors mx-3"
          >
            {t("shopNow")}
          </Link>
        </h2>

        {/* Right Side: Language Selector */}
        <div className="flex items-center gap-4 ml-4 bg-">
          <DropdownMenu
            modal={false}
            onOpenChange={(isOpen) => setOpen(isOpen)}
          >
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-body-sm font-semibold cursor-pointer hover:text-gray-200 transition-colors">
                {i18n.language === "ar" ? "العربية" : "English"}
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 py-2 px-2 
               backdrop-blur-md bg-white/50 text-start dark:bg-neutral-900/60 
               border border-white/20 dark:border-neutral-800/40 
               shadow-lg rounded-xl 
               animate-in fade-in-0 zoom-in-95 
               transition-all duration-300"
            >
              <DropdownMenuItem
                className="cursor-pointer capitalize text-body-sm font-medium 
        text-neutral-800 dark:text-neutral-100
        hover:text-red-400 hover:bg-transparent 
        rounded-md transition-all duration-200"
                onClick={() => changeLanguage("en")}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer capitalize text-body-sm font-medium 
        text-neutral-800 dark:text-neutral-100
        hover:text-red-400 hover:bg-transparent 
        rounded-md transition-all duration-200"
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
