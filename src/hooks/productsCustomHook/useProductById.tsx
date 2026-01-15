import { useEffect, useState } from "react";
import { getProductById } from "@/services/productsService";
import type { productObject } from "@/types/product_Type";

export function useProductByID(productId?: number) {
  const [product, setProduct] = useState<productObject | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states when productId changes
    setProduct(undefined);
    setError(null);
    
    if (!productId || isNaN(productId) || productId <= 0) {
      setLoading(false);
      setError("Invalid product ID");
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then((data) => {
        // Ensure we have a valid product object
        if (data && typeof data === 'object' && 'id' in data) {
          setProduct(data as productObject);
          setError(null);
        } else {
          setError("Invalid product data received");
          setProduct(undefined);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to fetch product");
        setProduct(undefined);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
}
