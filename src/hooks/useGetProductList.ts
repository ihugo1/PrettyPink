import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsService";
import type { ProductSortOptions } from "../api/productsService";

interface useGetProductsParams {
  itemsPerPage?: number;
  sortedBy?: ProductSortOptions;
}

export const useGetProductList = ({ itemsPerPage = 5, sortedBy = "name.asc", }: useGetProductsParams = {}) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", { sortedBy, itemsPerPage }],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getProducts({
        page: pageParam,
        limit: itemsPerPage,
        sortedBy: sortedBy,
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < itemsPerPage) return undefined;
      return allPages.length + 1;
    },
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  return {
    products, 
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
