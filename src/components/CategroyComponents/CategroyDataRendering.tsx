import SidebarCategories from "@/components/Home-Page/Hero-Section.tsx/SidebarCategories";
import Product_Card from "../common/Product_Card/Product_Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductByCategory } from "@/hooks/useProductByCategory";
import { categoriesData } from "./categoriesData";
import { ShadPagination } from "../FavouriteComponent/usePagination";
import { LoadingSpinner } from "@/components/common/Loading";

export default function CategroyDataRendering() {
  // Get the current category name from the URL (e.g., /category/electronics)
  const { categoryName } = useParams();

  // Track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of items displayed per page
  const itemsPerPage = 6;

  // Fetch products based on category and pagination
  const { products, loading, error } = useProductByCategory(
    categoryName || "",
    currentPage,
    itemsPerPage
  );

  // Reset pagination when category changes
  useEffect(() => setCurrentPage(1), [categoryName]);

  // Show loading state while fetching
  if (loading)
    return <LoadingSpinner fullScreen={false} size={35} />;

  // Show error message if something goes wrong
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="">
      <div className="flex justify-between md:flex-row flex-col gap-5 items-center sm:items-start">
        {/* Sidebar with category links */}
        <SidebarCategories
          categories={categoriesData.map(({ key, url, name }) => ({
            key,
            url,
            name,
          }))}
        />

        {/* Product grid */}
        <div className="flex">
          {products && products.length > 0 ? (
            <Product_Card
              className="grid grid-cols-2 max-sm:grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 justify-center items-center"
              products={products}
              componentProps={{
                hasFavouriteIcon: true, // show favorite icon
                hasviewIcon: true, // show view icon
                hasReview: true, // show review section
              }}
            />
          ) : (
            // Fallback if no products found
            <p className="text-gray-600 flex border justify-center items-center">
              No products found in this category.
            </p>
          )}
        </div>
      </div>

      {/* Pagination section */}
      {products && products.length >= itemsPerPage && (
        <div className="flex justify-center mt-15">
          <ShadPagination
            currentPage={currentPage} // current page
            totalItems={products.length} // total number of items
            itemsPerPage={itemsPerPage} // items per page
            onPageChange={setCurrentPage} // handle page change
          />
        </div>
      )}
    </div>
  );
}
