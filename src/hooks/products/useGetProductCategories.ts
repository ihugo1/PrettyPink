import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../api/categoriesService";
import type { ProductCategory } from "../../types";

interface UseGetProductCategoriesReturn {
  categories: ProductCategory[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useGetProductCategories = (): UseGetProductCategoriesReturn => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getProductCategories();
      return response.data;
    },
  });

  return {
    categories: data,
    isLoading,
    error,
  };
};
