import { useQuery } from "@tanstack/react-query";
import { getCart, getCartTotal } from "../../api/cartService";
import { useAuth } from "../../context/AuthContext";
import type { Cart } from "../../types";

interface CartData {
  cart: Cart | null;
  total: number;
}

interface UseGetCartReturn {
  data: CartData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useGetCart = (): UseGetCartReturn => {
  const { session } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Cart", session?.user.id],
    queryFn: async () => {
      if (!session?.user.id || !session.access_token) {
        return { cart: null, total: 0 };
      }

      const cartResponse = await getCart(session.user.id);
      const cartTotalResponse = await getCartTotal(session.access_token);

      return { cart: cartResponse.data[0], total: cartTotalResponse.data };
    },
    enabled: !!session?.user.id && !!session?.access_token,
  });

  return { data, isLoading, error };
};
