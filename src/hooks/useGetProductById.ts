import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productsService";

export const useGetProductById = (id: string | undefined) => {
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
