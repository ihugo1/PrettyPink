import { useQuery } from "@tanstack/react-query";
import { getCartTotal } from "../api/cartService";
import { useAuth } from "../context/AuthContext";

export const useGetCartTotal = () => {
  const { session } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["CartTotal", session?.user.id],
    queryFn: async () => {
      const response = await getCartTotal(session?.access_token!);
      return response;
    },
    enabled: !!session?.user.id,
  });

  return { cartTotal: data, isLoading, error };
};