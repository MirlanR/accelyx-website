"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All"
  );
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let list =
      activeCategory === "All"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="bg-catch-black min-h-screen">
      {/* Page Header */}
      <div className="section-padding pt-32 pb-10 border-b border-catch-mid">
        <p className="label-xs text-catch-muted mb-2">Men&apos;s Collection</p>
        <h1 className="heading-display text-5xl md:text-7xl">Shop</h1>
      </div>

      {/* Filters Bar */}
      <div className="section-padding sticky top-16 md:top-20 z-30 bg-catch-black/95 backdrop-blur border-b border-catch-mid py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-catch-white text-catch-black border-catch-white"
                  : "bg-transparent text-catch-muted border-catch-mid hover:border-catch-muted hover:text-catch-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="label-xs">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border border-catch-mid text-catch-light text-xs tracking-wide px-3 py-1.5 focus:outline-none focus:border-catch-muted cursor-pointer"
          >
            <option value="default" className="bg-catch-dark">Featured</option>
            <option value="price-asc" className="bg-catch-dark">Price: Low to High</option>
            <option value="price-desc" className="bg-catch-dark">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <div className="section-padding pt-6 pb-2">
        <p className="label-xs text-catch-muted">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Product Grid */}
      <div className="section-padding py-6 md:py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="label-xs text-catch-muted">No items in this category yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="bg-catch-black min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
