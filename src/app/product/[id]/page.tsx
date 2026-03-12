"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-catch-black min-h-screen">
      {/* Breadcrumb */}
      <div className="section-padding pt-24 md:pt-28 pb-4">
        <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-catch-muted">
          <Link href="/" className="hover:text-catch-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-catch-white transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-catch-white transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-catch-light">{product.name}</span>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="section-padding py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Images ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-catch-gray">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-catch-white text-catch-black text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
                  New
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-24 flex-shrink-0 overflow-hidden border-2 transition-colors duration-200 ${
                      activeImage === i
                        ? "border-catch-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="label-xs text-catch-muted mb-3">{product.category}</p>

            {/* Name */}
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-catch-white text-xl font-medium">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-catch-muted text-lg line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-catch-muted text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="label-xs">
                  Select Size{" "}
                  {sizeError && (
                    <span className="text-red-400 normal-case tracking-normal">
                      — Please select a size
                    </span>
                  )}
                </span>
                <button className="label-xs hover:text-catch-white transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-catch-white text-catch-black border-catch-white"
                        : "bg-transparent text-catch-muted border-catch-mid hover:border-catch-muted hover:text-catch-light"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.isSoldOut}
              className={`btn-primary w-full mb-3 ${
                product.isSoldOut ? "opacity-40 cursor-not-allowed" : ""
              } ${added ? "bg-catch-light" : ""}`}
            >
              {product.isSoldOut
                ? "Sold Out"
                : added
                ? "Added to Bag ✓"
                : "Add to Bag"}
            </button>

            {/* Product Details Accordion */}
            <div className="mt-8 border-t border-catch-mid">
              <button
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="label-xs text-catch-light">Product Details</span>
                {detailsOpen ? (
                  <ChevronUp size={16} className="text-catch-muted" />
                ) : (
                  <ChevronDown size={16} className="text-catch-muted" />
                )}
              </button>

              {detailsOpen && (
                <ul className="pb-4 space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-catch-muted">
                      <span className="mt-1.5 w-1 h-1 bg-catch-muted rounded-full flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-catch-mid py-4">
              <p className="text-xs text-catch-muted leading-relaxed">
                Free standard shipping on orders over $200. Returns accepted within 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding py-16 border-t border-catch-mid">
          <p className="label-xs text-catch-muted mb-2">You Might Also Like</p>
          <h2 className="heading-display text-3xl md:text-4xl mb-10">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
