import { Link, useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
// import { mockUser } from "../common/mockUser";
import projectData from "../../product.json";
import React from "react";
import type { productObject } from "@/types/product_Type";

function BreadcrumbsComponent() {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const { t } = useTranslation();

  const paths = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname]
  );

  const getEntityName = (type: string, id: string): string | undefined => {
    const productsData: productObject[] = projectData as productObject[];
    if (type === "product") {
      const numericId = Number(id);
      return productsData.find((p) => p.id === numericId)?.title;
    }

    return undefined;
  };

  const entityName = useMemo(() => {
    if (!id || paths.length < 2) return undefined;
    const type = paths[0];
    return getEntityName(type, id);
  }, [id, paths]);

  return (
    <nav
      className="text-body-sm text-gray-500 my-7 md:my-10"
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex space-x-2">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" className="hover:underline" itemProp="item">
            <span itemProp="name">{t("home")}</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {paths.map((path, index) => {
          const fullPath = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const name = id && path === id && entityName ? entityName : path;
          const translatedName = t(name.toLowerCase()) || "";

          return (
            <li
              key={index}
              className="flex items-center space-x-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span>/</span>
              {isLast ? (
                <span
                  className="font-semibold text-black capitalize"
                  itemProp="name"
                >
                  {translatedName}
                </span>
              ) : (
                <Link
                  to={fullPath}
                  className="hover:underline capitalize"
                  itemProp="item"
                >
                  {translatedName}
                </Link>
              )}
              <meta itemProp="position" content={`${index + 2}`} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const Breadcrumbs = React.memo(BreadcrumbsComponent);
export default Breadcrumbs;
