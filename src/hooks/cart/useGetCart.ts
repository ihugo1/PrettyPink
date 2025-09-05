import { useQuery } from "@tanstack/react-query";
import { getCart, getCartTotal } from "../../api/cartService";
import { useAuth } from "../../context/AuthContext";

export const useGetCart = () => {
  const { session } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Cart", session?.user.id],
    queryFn: async () => {
      if (!session?.user.id || !session.access_token) {
        return { cart: null, total: 0 };
      }

      const cartResponse = await getCart(session.user.id);
      const cartTotalResponse = await getCartTotal(session.access_token);

      return { cart: cartResponse.data[0], total: cartTotalResponse};
    },
    enabled: !!session?.user.id && !!session?.access_token,
  });

  return { data, isLoading, error };
};
