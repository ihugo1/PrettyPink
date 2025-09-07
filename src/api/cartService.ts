import { apiFetch, type APIResponse } from "./client";
import type { Cart, CartItem } from "../types";

/* Get a cart by its user id*/
export const getCart = async (userId: string): Promise<APIResponse<Cart[]>> => {
  const endpoint = `/rest/v1/carts?user_id=eq.${userId}&select=*,cart_items(*, product:products(*))`;
  const response = await apiFetch<Cart[]>(endpoint);
  return response;
};

/* Create and return a new cart for a user */
const createCart = async (
  userId: string,
  accessToken: string
): Promise<APIResponse<Cart[]>> => {
  const endpoint = "/rest/v1/carts";
  const requestBody = {
    user_id: userId,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<Cart[]>(endpoint, options);
  return response;
};

/* Add a product to a cart, if theres no cart this function calls createCart */
export const addItemToCart = async (
  userId: string,
  productId: string,
  size: string,
  accessToken: string
): Promise<APIResponse<CartItem[]>> => {
  const getCartResponse = await getCart(userId);
  let cart = getCartResponse.data ? getCartResponse.data[0] : null;

  if (!cart) {
    const createCartResponse = await createCart(userId, accessToken);
    cart = createCartResponse.data[0];
  }

  const endpoint = "/rest/v1/cart_items";
  const requestBody = {
    cart_id: cart.id,
    product_id: productId,
    size: size,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<CartItem[]>(endpoint, options);
  return response;
};

/* Removes an item from a cart by using its id*/
export const removeItemFromCart = async (
  cartItemId: string,
  accessToken: string
): Promise<APIResponse<CartItem[]>> => {
  const endpoint = `/rest/v1/cart_items?id=eq.${cartItemId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<CartItem[]>(endpoint, options);
  return response;
};

/* Gets the carts total items price */
export const getCartTotal = async (
  accessToken: string
): Promise<APIResponse<number>> => {
  const endpoint = "/rest/v1/rpc/get_user_cart_total";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<number>(endpoint, options);
  return response;
};
