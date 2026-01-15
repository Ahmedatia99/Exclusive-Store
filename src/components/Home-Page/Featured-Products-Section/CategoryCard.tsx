import { t } from "i18next";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description?: string;
  image: string;
  buttonText?: string;
  className?: string;
  category: string;
}

export default function CategoryCard({
  title,
  category,
  image,
  buttonText = t("Shop Now"),
  className = "",
}: CategoryCardProps) {
  return (
    <div
      className={`relative py-10 group flex justify-center items-center overflow-hidden ${className} bg-black rounded-sm px-4 md:px-5 lg:px-10 py-0 md:py-4`}
    >
      <img
        src={image}
        alt={title}
        className="w-3/4 h-full aspect-auto object-cover rounded-xl brightness-50 
                   transition-all duration-500 ease-in-out 
                   group-hover:scale-110 group-hover:brightness-100"
      />

      <div className="absolute bottom-6 left-6 text-white">
        {/* <h2 className="text-body md:text-h4 lg:text-h3 font-bold">{title}</h2> */}
        <Link
          to={`AllProducts/${category}`}
          className="mt-4 text-body-sm text-white font-medium transition border-b border-gray-600 border-dashed"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
