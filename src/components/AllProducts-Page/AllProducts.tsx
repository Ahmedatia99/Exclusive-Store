"use client";

import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import Product_Card from "@/components/common/Product_Card/Product_Card";
import CategoryFeature from "./CategoryFeature";
import { BrandFeature } from "./BrandFeature";
import { PriceRangeFeature } from "./PriceRangeFeature";
import { SortFeature } from "./SortFeature";
import { filterProducts, getFiltersFromUrl } from "@/utils/filteredProducts";
import { useAllProducts } from "@/hooks/productsCustomHook/useAllProducts";
import type { Filters } from "@/types/product_Type";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AllProductsPagination from "./AllProductsPagination";
import { LoadingSpinner } from "@/components/common/Loading";

const productCardProps = {
  hasFavouriteIcon: true,
  hasviewIcon: true,
  hasReview: true,
};

export default function AllProducts() {
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    brand: [],
    priceRange: [0, 3000],
    search: "",
    sort: "none",
    discountOnly: false,
    rating: "",
  });

  const { products, loading, error } = useAllProducts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() ?? "";

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!products.length) return;
    const newFilters = getFiltersFromUrl(location, products, searchQuery);
    if (newFilters) setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters or URL change
  }, [location.pathname, location.search, products, searchQuery, location]);

  // Apply filters
  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  // Slice products for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFilters((prev) => ({ ...prev, search: value }));
    setCurrentPage(1);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 container mx-auto">
      {/* Sidebar Filters */}
      <aside className="md:col-span-2 space-y-4 md:sticky top-6 h-fit">
        <Input
          value={filters.search || searchQuery}
          placeholder="Search products..."
          onChange={handleSearchChange}
          className="border"
        />

        <Accordion type="multiple">
          <CategoryFeature filters={filters} setFilters={setFilters} />
          <BrandFeature filters={filters} setFilters={setFilters} />
          <PriceRangeFeature filters={filters} setFilters={setFilters} />
          <SortFeature filters={filters} setFilters={setFilters} />
        </Accordion>
      </aside>

      {/* Products Section */}
      <section className="md:col-span-10 space-y-4">
        <Breadcrumbs />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 min-h-[400px]">
          {/* Loading */}
          {loading && (
            <div className="col-span-full">
              <LoadingSpinner fullScreen={false} size={35} />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="col-span-full text-center mt-10 text-red-500 text-body-lg font-medium">
              Failed to load products: {error}
            </p>
          )}

          {/* Empty */}
          {!loading && !error && paginatedProducts.length === 0 && (
            <p className="col-span-full text-center mt-10 text-gray-500 text-body-lg font-medium">
              No products found
            </p>
          )}

          {/* Products */}
          {!loading &&
            !error &&
            paginatedProducts.length > 0 &&
            paginatedProducts.map((p) => (
              <Product_Card
                key={p.id}
                products={[p]}
                componentProps={productCardProps}
                className="shadow-sm border border-gray-200 p-2 rounded-lg overflow-hidden"
              />
            ))}
        </div>

        {/* Pagination */}
        {!loading && !error && filteredProducts.length > itemsPerPage && (
          <AllProductsPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={filteredProducts.length}
          />
        )}
      </section>
    </section>
  );
}
