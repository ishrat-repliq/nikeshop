// hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("/api/products");
      return data;
    },
  });
}