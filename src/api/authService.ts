const baseURL = import.meta.env.VITE_SUPABASE_URL;
import type { User } from "../types/auth";
import { apiFetch, type APIResponse } from "./client";

export const authSignInWithGoogle = () => {
  const redirectUrl = import.meta.env.PROD
    ? `${window.location.origin}/PrettyPink/`
    : window.location.origin;
  const supabaseAuthUrl = `${baseURL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`;
  window.location.href = supabaseAuthUrl;
};

export const getUser = async (accessToken: string): Promise<APIResponse<User>> => {
  const endpoint = "/auth/v1/user";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await apiFetch<User>(endpoint, options);
  return response;
};

export const authSignOut = async (accessToken: string): Promise<APIResponse<any>> => {
  const endpoint = "/auth/v1/logout";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  console.log("Signing out with accessToken:", accessToken); 
  const response = await apiFetch<any>(endpoint, options);
  return response;
};

