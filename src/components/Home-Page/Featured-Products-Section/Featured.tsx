import SectionHeader from "@/components/common/SectionHeader";
import CategoryCard from "./CategoryCard";

import { useTranslation } from "react-i18next";
import Products from "../../../product.json";
import type { productObject } from "@/types/product_Type";
import { getCloudinaryUrl } from "@/utils/ProductStats";

function Featured() {
  const products = Products as productObject[];
  const previewProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  const { t } = useTranslation();
  return (
    <section className="my-20">
      <SectionHeader
        label={t("featured")}
        title={t("Featured Products")}
        className="mb-20"
      />

      <div className="grid grid-cols-1  md:grid-cols-2 gap-5 md:gap-8 ">
        {/* Left big card */}
        <CategoryCard
          category="electronics"
          title="PlayStation 5"
          description="Black and White version of the PS5 coming out on sale."
          image={getCloudinaryUrl(previewProducts[0].mainImgSRC, {
            h: 0,
            w: 0,
          })}
          className=""
        />

        {/* Right side grid */}
        <div className="grid grid-rows-2 gap-5 md:gap-8">
          <CategoryCard
            category="womenfashion"
            title="Women’s Collections"
            description="Featured woman collections that give you another vibe."
            image={getCloudinaryUrl(previewProducts[1].mainImgSRC, {
              h: 0,
              w: 0,
            })}
          />

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 md:gap-8">
            <CategoryCard
              category="electronics"
              title="Speakers"
              description="Amazon wireless speakers"
              image={getCloudinaryUrl(previewProducts[2].mainImgSRC, {
                h: 0,
                w: 0,
              })}
              className="h-full"
            />
            <CategoryCard
              category=""
              title="Perfume"
              description="GUCCI INTENSE OUD EDP"
              image={getCloudinaryUrl(previewProducts[3].mainImgSRC, {
                h: 0,
                w: 0,
              })}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
