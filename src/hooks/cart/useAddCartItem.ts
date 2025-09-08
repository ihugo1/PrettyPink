import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart } from "../../api/cartService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

interface UseAddCartItemReturn {
  addCartItem: (variables: { productId: string; size: string }) => void;
  isPending: boolean;
}

export const useAddCartItem = (): UseAddCartItemReturn => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate: addCartItem, isPending } = useMutation({
    mutationFn: async (variables: { productId: string; size: string }) => {
      if (!session?.user.id || !session.access_token) {
        throw new Error("User is not authenticated");
      }
      return addItemToCart(
        session.user.id,
        variables.productId,
        variables.size,
        session.access_token
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Cart", session?.user.id] });
      toast.success("Item added to cart");
    },

    onError: () => {
      console.log("Error adding item to cart");
    },
  });

  return { addCartItem, isPending };
};
