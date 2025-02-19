// hooks/useInfiniteProducts.js
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ["infinite-products"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/products?page=${pageParam}`);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
  });
}