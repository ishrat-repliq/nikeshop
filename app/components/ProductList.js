// components/ProductList.js
"use client";

import { useProducts } from "../hooks/useProducts";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { Observer } from "mobx-react-lite";
import cartStore from "../store/cartStore";
import { Button } from "@/components/ui/button";

export function ProductList() {
  const { data, isLoading, isError } = useProducts();
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteProducts();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <Observer>
      {() => (
        <div>
          <h1>Products</h1>
          <div>
            {data?.products.map((product) => (
              <div key={product.id}>
                {product.name} - ${product.price}
                <Button onClick={() => cartStore.addToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>

          <h2>Infinite Products</h2>
          <ul>
            {infiniteData?.pages.map((page, i) => (
              <div key={i}>
                {page.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                    <button onClick={() => cartStore.addToCart(product)}>
                      Add to Cart
                    </button>
                  </li>
                ))}
              </div>
            ))}
          </ul>
          {hasNextPage && (
            <button onClick={() => fetchNextPage()}>Load More</button>
          )}
        </div>
      )}
    </Observer>
  );
}