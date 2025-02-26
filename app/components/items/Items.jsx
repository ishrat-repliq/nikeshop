"use client";
import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PopularProductCard } from "..";

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: "Nike Air Jordan-01", price: "$200.20" },
  { id: 2, name: "Nike Air Jordan-10", price: "$210.20" },
  { id: 3, name: "Nike Air Jordan-100", price: "$220.20" },
  { id: 4, name: "Nike Air Jordan-001", price: "$230.20" },
  { id: 5, name: "Nike Air Jordan-02", price: "$240.20" },
  { id: 6, name: "Nike Air Jordan-20", price: "$250.20" },
  { id: 7, name: "Nike Air Jordan-200", price: "$260.20" },
  { id: 8, name: "Nike Air Jordan-002", price: "$270.20" },
  { id: 9, name: "Nike Air Jordan-01", price: "$200.20" },
  { id: 10, name: "Nike Air Jordan-10", price: "$210.20" },
  { id: 11, name: "Nike Air Jordan-100", price: "$220.20" },
  { id: 12, name: "Nike Air Jordan-001", price: "$230.20" },
  { id: 13, name: "Nike Air Jordan-02", price: "$240.20" },
  { id: 14, name: "Nike Air Jordan-20", price: "$250.20" },
  { id: 15, name: "Nike Air Jordan-200", price: "$260.20" },
  { id:18, name: "Nike Air Jordan-002", price: "$270.20" },
  { id: 10, name: "Nike Air Jordan-01", price: "$200.20" },
  { id: 20, name: "Nike Air Jordan-10", price: "$210.20" },
  { id: 30, name: "Nike Air Jordan-100", price: "$220.20" },
  { id: 40, name: "Nike Air Jordan-001", price: "$230.20" },
  { id: 50, name: "Nike Air Jordan-02", price: "$240.20" },
  { id: 60, name: "Nike Air Jordan-20", price: "$250.20" },
  { id: 70, name: "Nike Air Jordan-200", price: "$260.20" },
  { id: 80, name: "Nike Air Jordan-002", price: "$270.20" },
  { id: 90, name: "Nike Air Jordan-01", price: "$200.20" },
  { id: 100, name: "Nike Air Jordan-10", price: "$210.20" },
  { id: 112, name: "Nike Air Jordan-100", price: "$220.20" },
  { id: 123, name: "Nike Air Jordan-001", price: "$230.20" },
  { id: 134, name: "Nike Air Jordan-02", price: "$240.20" },
  { id: 147, name: "Nike Air Jordan-20", price: "$250.20" },
  { id: 159, name: "Nike Air Jordan-200", price: "$260.20" },
  { id:188, name: "Nike Air Jordan-002", price: "$270.20" },
];

// Mock API function to simulate pagination
const getPostsPage = async (pageParam = 1, pageSize = 6) => {
  // Simulate a delay to mimic network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Calculate start and end indices for pagination
  const startIndex = (pageParam - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Return a slice of the mock data for the current page
  return mockProducts.slice(startIndex, endIndex);
};

// Product card component
// const PopularProductCard = ({ product, ref }) => (
//   <div ref={ref} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
//     <h3>{product.name}</h3>
//     <p>{product.price}$</p>
//   </div>
// );

// Main component
const Items = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["product"],
    queryFn: ({ pageParam = 1 }) => getPostsPage(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has data, return the next page number
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (product) => {
      if (isFetchingNextPage) return;

      // Disconnect the previous observer
      if (intObserver.current) intObserver.current.disconnect();

      // Create a new IntersectionObserver
      intObserver.current = new IntersectionObserver((products) => {
        if (products[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          fetchNextPage();
        }
      });

      // Observe the last product element
      if (product) intObserver.current.observe(product);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === "error") return <p className="center">Error: {error.message}</p>;

  const content = data?.pages.map((page, pageIndex) =>
    page.map((product, productIndex) => {
      // If this is the last product in the last page, attach the ref
      if (page.length === productIndex + 1) {
        return (
          <PopularProductCard
            ref={lastPostRef}
            key={product.id}
            product={product}
          />
        );
      }
      return <PopularProductCard key={product.id} product={product} />;
    })
  );

  return (
    <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
      
      {content}
      {isFetchingNextPage && <p className="center">Loading More Products...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </div>
  );
};

export default Items;