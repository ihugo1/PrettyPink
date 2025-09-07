import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/productsService";
import type { Product } from "../../types";

interface UseGetProductByIdReturn {
  product: Product | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useGetProductById = (id: string | undefined): UseGetProductByIdReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await getProductById(id!);
      return response.data[0];
    },
    enabled: !!id,
  });

  return { product: data, isLoading, error };
};
