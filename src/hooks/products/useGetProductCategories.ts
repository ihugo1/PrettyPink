import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../api/categoriesService";

export const useGetProductCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getProductCategories();
      return data.data;
    },
  });

  return {
    categories: data,
    isLoading,
    error,
  };
};
