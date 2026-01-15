import { useEffect, useMemo, useState } from "react";
import { useWishlist } from "../../hooks/WishListContext/useWishlist";
import { useTranslation } from "react-i18next";
import Product_Card from "@/components/common/Product_Card/Product_Card";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ShadPagination } from "./usePagination";
import { LoadingSpinner } from "@/components/common/Loading";

function RenderingDataFavourite() {
  const { wishlist } = useWishlist();

  const { t } = useTranslation();

  const { products, loading, error } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  //  Memoize favourite products so it's only recalculated when products or wishlist change

  const favouriteProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.id)),
    [products, wishlist]
  );
  //  Keep currentPage valid when favourites change
  useEffect(() => {
    const totalPages = Math.ceil(favouriteProducts.length / itemsPerPage);

    // If the current page is higher than the available pages,
    // reset it to the last available page (or 1 if no items)
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [favouriteProducts, currentPage, itemsPerPage]);
  //  Show loading or error messages
  if (loading) return <LoadingSpinner fullScreen={false} size={30} />;
  if (error)
    return <p className="text-red-500">{t("Failed to load products")}</p>;

  //  Filter products that exist in wishlist

  //  Calculate the last item index of the current page
  const indexOfLast = currentPage * itemsPerPage;

  //  Calculate the first item index of the current page
  const indexOfFirst = indexOfLast - itemsPerPage;

  //  Get only the products for the current page (slice from the full favourites list)

  const currentProducts = favouriteProducts.slice(indexOfFirst, indexOfLast);

  return (
    <section
      className="xl:my-20"
      aria-labelledby="wishlist-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Page heading with count */}
      <h1
        id="wishlist-heading"
        className="text-2xl font-bold mb-6 flex items-center gap-2"
      >
        {t("My Favourites")}
        <span
          className="text-main"
          aria-label={`${favouriteProducts.length} items`}
        >
          ({favouriteProducts.length})
        </span>
      </h1>

      {/* If no favourite products */}
      {favouriteProducts.length === 0 ? (
        <div className="flex justify-center items-center flex-col">
          <p className="text-gray-500 text-center my-20 text-4xl ">
            {t("No Favourite Products Yet")}
          </p>
          <Link
            className="font-semibold text-white px-10 p-6 bg-main hover:scale-105 transition duration-300 rounded-2xl"
            to={"/"}
          >
            {t("Home Page")}
          </Link>
        </div>
      ) : (
        <>
          {/* Accessibility: hidden text for screen readers */}
          <p className="sr-only">
            Showing {indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, favouriteProducts.length)} of{" "}
            {favouriteProducts.length} {t("favourites")}
          </p>

          {/* Render product cards with delete option */}
          <Product_Card
            className="grid grid-cols-2 max-sm:grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 justify-center items-center"
            products={currentProducts}
            componentProps={{ hasDeleteIcon: true }}
          />

          {/* Pagination component */}
          <nav
            className="mt-16"
            role="navigation"
            aria-label="Wishlist pagination"
          >
            <ShadPagination
              currentPage={currentPage}
              totalItems={favouriteProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </nav>
        </>
      )}
    </section>
  );
}

export default RenderingDataFavourite;
