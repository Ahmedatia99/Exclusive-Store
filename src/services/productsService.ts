import axios from "axios";
import type { productObject } from "@/types/product_Type";

const API_URL = "https://exclusive-server-uo6k.onrender.com";

function extractArray<T = any>(responseData: unknown): T[] {
  if (Array.isArray(responseData)) return responseData as T[];
  if (!responseData || typeof responseData !== "object") return [];
  const obj = responseData as Record<string, unknown>;
  if (Array.isArray(obj.data)) return obj.data as T[];
  if (Array.isArray(obj.products)) return obj.products as T[];
  if (Array.isArray(obj.items)) return obj.items as T[];
  // fallback: try to find the first array value
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    if (Array.isArray(v)) return v as T[];
  }
  return [];
}

export async function getHookProducts() {
  const response = await axios.get(`${API_URL}/products?isHook=true`);
  const arr = extractArray<productObject>(response.data);
  return arr.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    mainImgSRC: product.mainImgSRC,
  }));
}

export async function getAllProducts(
  pageNumber: number = 1,
  pageSize: number = 22
) {
  const response = await axios.get(
    `${API_URL}/products?pagenumber=${pageNumber}&pageSize=${pageSize}`
  );
  return extractArray<productObject>(response.data);
}
export async function getProductsByCategory(
  category: string,
  pageNumber: number = 1,
  pageSize: number = 24
) {
  const response = await axios.get(
    `${API_URL}/products?category=${category}&pagenumber=${pageNumber}&pageSize=${pageSize}`
  );
  return extractArray<productObject>(response.data);
}

export async function getFlashSalesProducts(pageNumber = 1, pageSize = 12) {
  const response = await axios.get(
    `${API_URL}/products?isflash=true&pagenumber=${pageNumber}&pageSize=${pageSize}`
  );
  return extractArray<productObject>(response.data);
}

export async function getFlashSalesSectionProducts() {
  const response = await axios.get(
    `${API_URL}/products?isflash=true&pagesize=7&sort=random`
  );
  return extractArray<productObject>(response.data);
}
export async function getBestSellingSectionProducts() {
  const response = await axios.get(
    `${API_URL}/products?pagesize=7&sort=ratingCount`
  );
  return extractArray<productObject>(response.data);
}

export async function getExploreOurProuctsSectionProducts() {
  const response = await axios.get(`${API_URL}/products?pagesize=7&sort=random`);
  return extractArray<productObject>(response.data);
}
export async function getProductById(id: number) {
  const response = await axios.get<productObject>(`${API_URL}/products/${id}`);
  return response.data;
}
