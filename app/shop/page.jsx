"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { PopularProductCard } from "../components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";


const initialProducts = [
  { name: "Elegant Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { name: "Leather Bag", price: 149.99, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { name: "Sunglasses", price: 79.99, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { name: "Smartphone", price: 499.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
  { name: "T-shirt", price: 29.99, image: "/placeholder.svg?height=200&width=200", category: "Clothing" },
  { name: "Garden Tools", price: 59.99, image: "/placeholder.svg?height=200&width=200", category: "Home & Garden" },
];

export default function ProductPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const loadMoreProducts = () => {
    // Simulate an API call to fetch more products
    const newProducts = [
      { name: "New Product 1", price: 99.99, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
      { name: "New Product 2", price: 199.99, image: "/placeholder.svg?height=200&width=200", category: "Electronics" },
      // Add more products as needed
    ];
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage((prevPage) => prevPage + 1);
  };

  const { observe, unobserve } = useIntersectionObserver(loadMoreProducts);

  useEffect(() => {
    if (loadMoreRef.current) {
      observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, observe, unobserve]);

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearchQuery && matchesCategory && matchesPriceRange;
  });

  return (
    <div className="container mx-auto px-4 py-8 pt-[94px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button variant="outline" className="lg:hidden" onClick={() => setIsMobileFilterOpen(true)}>
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 space-y-6">
          <FilterSection
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
          />
        </aside>

        {/* Mobile filter modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
            <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-background p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterSection
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <PopularProductCard key={index} name={product.name} price={product.price} imgURL={product.image} />
          ))}
          <div ref={loadMoreRef} style={{ height: '20px' }} />
        </div>
      </div>
    </div>
  );
}

function FilterSection({ searchQuery, onSearchChange, selectedCategories, onCategoryChange, priceRange, onPriceRangeChange }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search products..." value={searchQuery} onChange={onSearchChange} />
      </div>
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider defaultValue={priceRange} max={500} step={1} onValueChange={onPriceRangeChange} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Categories</Label>
        <div className="space-y-1">
          {["Electronics", "Clothing", "Home & Garden", "Accessories"].map((category) => (
            <Label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
              <span>{category}</span>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
}