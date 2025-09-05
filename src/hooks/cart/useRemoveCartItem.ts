import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemFromCart } from "../../api/cartService";
import { useAuth } from "../../context/AuthContext";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate: removeCartItem, isPending } = useMutation({
    mutationFn: async (variables: { cartItemId: string }) => {
      if (!session?.user.id) {
        throw new Error("User is not authenticated");
      }
      return removeItemFromCart(variables.cartItemId, session.access_token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cart", session?.user.id] });
    },

    onError: () => {
      console.log("Error removing item from cart");
    },
  });

  return { removeCartItem, isPending };
};
