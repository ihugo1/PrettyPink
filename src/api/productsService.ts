import { apiFetch, type APIResponse } from "./client";
import type { Product } from "../types";

export const productSortOptionsArray = [
  "name.asc",
  "name.desc",
  "price.asc",
  "price.desc",
  "created_at.asc",
  "created_at.desc",
  "sales_count.asc",
  "sales_count.desc",
] as const;

export type ProductSortOptions = (typeof productSortOptionsArray)[number];

interface ProductSortDisplayOption {
  value: ProductSortOptions;
  label: string;
}

export const productSortDisplayOptions: ProductSortDisplayOption[] = [
  { value: "sales_count.desc", label: "Best Selling" },
  { value: "name.asc", label: "Name (A-Z)" },
  { value: "name.desc", label: "Name (Z-A)" },
  { value: "price.asc", label: "Price (Low to High)" },
  { value: "price.desc", label: "Price (High to Low)" },
  { value: "created_at.asc", label: "Date (Old to New)" },
  { value: "created_at.desc", label: "Date (New to Old)" },
];

interface GetProductsParams {
  page?: number;
  limit: number;
  categoryId?: string;
  sortedBy: ProductSortOptions;
}

export const getProducts = async ({
  page = 1,
  limit,
  categoryId,
  sortedBy,
}: GetProductsParams): Promise<APIResponse<Product[]>> => {
  const rangeStart = (page - 1) * limit;
  const rangeEnd = page * limit - 1;

  let url = `/products?select=*`;
  if (categoryId) {
    url += `&category_id=eq.${categoryId}`;
  }
  url += `&order=${sortedBy}`;

  console.log(url);

  const response = await apiFetch<Product[]>(url, {
    headers: {
      Range: `${rangeStart}-${rangeEnd}`,
      Prefer: "count=exact",
    },
  });
  console.log(url);
  return response;
};

export const getProductById = async (id: string) => {
  const response = await apiFetch<Product[]>(
    `products?id=eq.${id}&select=*,product_images(*),category:category_id(*)`
  );
  /*
  console.log(`products?id=eq.${id}&select=*,product_images(*)`);
  */
  return response.data[0];
};
