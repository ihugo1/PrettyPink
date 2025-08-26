const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface APIResponse<T> {
  data: T;
  count: number | null;
}

export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or Key are missing from .env.local");
  }

  const response = await fetch(supabaseUrl + endpoint, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred with the Supabase request"
    );
  }

  const contentRange = response.headers.get("Content-Range");
  const count = contentRange ? parseInt(contentRange.split("/")[1]) : null;

  const data = await response.json();

  return { data, count };
};
