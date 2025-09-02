import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productsService";

export const useGetProductById = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const data = await getProductById(id!);
      return data;
    },
    enabled: !!id,
  });

  return { product: data, isLoading, error };
};
