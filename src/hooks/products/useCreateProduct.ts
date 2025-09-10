import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsService";
import { useAuth } from "../../context/AuthContext";
import type { NewProduct } from "../../types";
import { toast } from "react-hot-toast";

interface UseCreateProductReturn {
  createNewProduct: (variables: { Product: NewProduct }) => void;
  isPending: boolean;
}

export const useCreateProduct = (): UseCreateProductReturn => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate: createNewProduct, isPending } = useMutation({
    mutationFn: async (variables: { Product: NewProduct }) => {
      if (!session?.user.id || !session?.access_token) {
        throw new Error("User is not authenticated");
      }
      return createProduct(session.access_token, variables.Product);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"]});
      toast.success("Item has been created");
    },

    onError: () => {
      console.log("Error creating new product");
    },
  });

  return { createNewProduct, isPending };
};
