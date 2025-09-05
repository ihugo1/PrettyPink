import { apiFetch, type APIResponse } from "./client";
import type { Cart } from "../types";

export const getCart = async (userId: string) => {
  const endpoint = `/rest/v1/carts?user_id=eq.${userId}&select=*,cart_items(*, product:products(*))`;
  const response = await apiFetch<Cart[]>(endpoint);
  return response;
};

const createCart = async (userId: string, accessToken: string) => {
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
  return response.data[0];
};

export const addItemToCart = async (
  userId: string,
  productId: string,
  size: string,
  accessToken: string
) => {
  const cartRespose = await getCart(userId);
  let cart = cartRespose.data ? cartRespose.data[0] : null;

  if (!cart) {
    console.log("No hay carrito");
    cart = await createCart(userId, accessToken);
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
  const response = await apiFetch<Cart>(endpoint, options);
  return response.data;
};

export const removeItemFromCart = async (
  cartItemId: string,
  accessToken: string
) => {
  const endpoint = `/rest/v1/cart_items?id=eq.${cartItemId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
  };

  const response = await apiFetch<Cart>(endpoint, options);
  return response.data;
};

export const getCartTotal = async (accessToken: string) => {
  const endpoint = "/rest/v1/rpc/get_user_cart_total";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    }
  }

  const response = await apiFetch<number>(endpoint, options);
  console.log(response.data);
  return response.data || 0;
}