import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItemFromCart } from "../../api/cartService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

interface UseRemoveCartItemReturn {
  removeCartItem: (variables: { cartItemId: string }) => void;
  isPending: boolean;
}

export const useRemoveCartItem = (): UseRemoveCartItemReturn => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate: removeCartItem, isPending } = useMutation({
    mutationFn: async (variables: { cartItemId: string }) => {
      if (!session?.user.id || !session.access_token) {
        throw new Error("User is not authenticated");
      }
      return removeItemFromCart(variables.cartItemId, session.access_token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cart", session?.user.id] });
      toast.success("Item removed from cart");
    },

    onError: () => {
      console.log("Error removing item from cart");
    },
  });

  return { removeCartItem, isPending };
};
