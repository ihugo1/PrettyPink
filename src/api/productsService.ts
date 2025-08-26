import { apiFetch, type APIResponse } from "./client";
import type { Product } from "../types";

export type ProductSortOptions = 
| "name.asc"
| "name.desc"
| "price.asc"
| "price.desc"
| "created_at.asc"
| "created_at.desc"
| "sales_count.asc"
| "sales_count.desc"

interface GetProductsParams {
  page?: number;
  limit: number;
  sortedBy: ProductSortOptions;
}

export const getProducts = async ({ page = 1, limit, sortedBy }: GetProductsParams): Promise<APIResponse<Product[]>> => {
  const rangeStart = (page - 1) * limit;
  const rangeEnd = page * limit - 1;

  const response = await apiFetch<Product[]>(`/products?select=*&order=${sortedBy}`, {
    headers: {
      Range: `${rangeStart}-${rangeEnd}`,
      Prefer: "count=exact",
    },
  });

  return response;
};
