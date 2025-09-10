import { apiFetch, type APIResponse } from "./client";
import type { Product, NewProduct } from "../types";
import type { ProductSortOptions } from "../constants/productSort";

interface GetProductsParams {
  page?: number;
  limit: number;
  categoryId?: string;
  sortedBy: ProductSortOptions;
}

/* Get an array of products that can be filtered */
export const getProducts = async ({
  page = 1,
  limit,
  categoryId,
  sortedBy,
}: GetProductsParams): Promise<APIResponse<Product[]>> => {
  const rangeStart = (page - 1) * limit;
  const rangeEnd = page * limit - 1;

  let endpoint = `/rest/v1/products?select=*`;
  if (categoryId) endpoint += `&category_id=eq.${categoryId}`;
  endpoint += `&order=${sortedBy}`;

  const options = {
    headers: {
      Range: `${rangeStart}-${rangeEnd}`,
      Prefer: "count=exact",
    },
  };

  const response = await apiFetch<Product[]>(endpoint, options);
  return response;
};

/* Get a product by its id*/
export const getProductById = async (
  id: string
): Promise<APIResponse<Product[]>> => {
  const response = await apiFetch<Product[]>(
    `/rest/v1/products?id=eq.${id}&select=*,product_images(*),category:category_id(*)`
  );
  return response;
};

/* Create a new product */
export const createProduct = async (
  accessToken: string,
  product: NewProduct
): Promise<APIResponse<Product[]>> => {
  const endpoint = "/rest/v1/products";
  const options = {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<Product[]>(endpoint, options);
  return response;
};

/* Update a Product */
export const updateProduct = async (
  id: string,
  product: NewProduct,
  accessToken: string
): Promise<APIResponse<Product[]>> => {
  const endpoint = `/rest/v1/products?id=eq.${id}`;
  const options = {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<Product[]>(endpoint, options);
  return response;
};

/* Delete a product */
export const deleteProduct = async (
  id: string,
  accessToken: string
): Promise<APIResponse<Product[]>> => {
  const endpoint = `/rest/v1/products?id=eq.${id}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const respose = await apiFetch<Product[]>(endpoint, options);
  return respose;
};
