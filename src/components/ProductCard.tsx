"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-catch-gray">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Hover second image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-catch-white text-catch-black text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
              New
            </span>
          )}
          {product.isSoldOut && (
            <span className="bg-catch-mid text-catch-muted text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
              Sold Out
            </span>
          )}
          {product.originalPrice && !product.isSoldOut && (
            <span className="bg-catch-white text-catch-black text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-catch-muted text-[11px] tracking-widest uppercase">
          {product.category}
        </p>
        <p className="text-catch-white text-sm font-medium leading-snug group-hover:text-catch-light transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-catch-white text-sm">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-catch-muted text-sm line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
