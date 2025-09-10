import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteAProduct } from "../../api/productsService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

interface UseDeleteProductReturn {
  deleteProduct: (varaibles: { id: string }) => void;
  isPending: boolean;
}

export const useDeleteProduct = (): UseDeleteProductReturn => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: async (variables: { id: string }) => {
      if (!session?.user.id || !session?.access_token) {
        throw new Error("User is not authenticated");
      }
      return deleteAProduct(variables.id, session.access_token);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Item has been deleted");
    },

    onError: () => {
      console.log("Error deleting product");
    },
  });

  return { deleteProduct, isPending };
};
