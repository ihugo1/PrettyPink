import { apiFetch, type APIResponse } from "./client";
import type { ProductCategory } from "../types";

export const getProductCategories = async (): Promise<APIResponse<ProductCategory[]>> => {
  const response = await apiFetch<ProductCategory[]>("/rest/v1/categories?select=*");
  return response;
}