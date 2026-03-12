import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const featuredProduct = products[3]; // Leather Bomber

  return (
    <div className="bg-catch-black">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#0e0e0e]">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1800&q=90"
          alt="CATCH Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Left dark gradient — like Fear of God */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/90 via-[#0e0e0e]/30 to-[#0e0e0e]/70" />
        {/* Bottom fade to black */}
        <div className="absolute inset-0 bg-gradient-to-t from-catch-black via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 section-padding w-full flex flex-col justify-between h-full py-28">
          <div>
            <p className="label-xs text-catch-muted">New Collection — 2024</p>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xs">
              <Link href="/shop" className="btn-primary inline-block text-center">
                Shop Now
              </Link>
              <Link href="/about" className="btn-outline inline-block text-center">
                Our Story
              </Link>
            </div>
          </div>

          {/* Bottom right tagline — FOG style */}
          <p className="self-end heading-display text-right text-2xl md:text-4xl text-catch-white/60 max-w-xs leading-tight">
            DEFINE
            <br />
            YOUR LOOK
          </p>
        </div>
      </section>

      {/* ─── MARQUEE / ANNOUNCEMENT ───────────────────────── */}
      <div className="bg-catch-dark border-y border-catch-mid py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="label-xs text-catch-muted px-12">
              FREE SHIPPING ON ORDERS OVER $200 &nbsp;·&nbsp; NEW ARRIVALS NOW LIVE
              &nbsp;·&nbsp; MADE IN PORTUGAL &amp; ITALY &nbsp;·&nbsp; PREMIUM MENSWEAR
            </span>
          ))}
        </div>
      </div>

      {/* ─── NEW ARRIVALS ─────────────────────────────────── */}
      <section className="section-padding py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-xs text-catch-muted mb-2">Just Dropped</p>
            <h2 className="heading-display text-4xl md:text-5xl">New Arrivals</h2>
          </div>
          <Link href="/shop?category=New" className="btn-ghost hidden md:block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/shop" className="btn-ghost">
            View All →
          </Link>
        </div>
      </section>

      {/* ─── FEATURE BANNER ───────────────────────────────── */}
      <section className="relative h-[70vh] md:h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&q=85"
          alt="CATCH Feature"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-catch-black/80 via-catch-black/20 to-transparent" />

        <div className="relative z-10 section-padding h-full flex flex-col justify-center max-w-lg">
          <p className="label-xs text-catch-muted mb-4">Featured Piece</p>
          <h2 className="heading-display text-4xl md:text-6xl mb-4">
            {featuredProduct.name}
          </h2>
          <p className="text-catch-muted text-sm leading-relaxed mb-8 max-w-sm">
            {featuredProduct.description}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/product/${featuredProduct.id}`}
              className="btn-primary inline-block"
            >
              Shop Now — ${featuredProduct.price}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="section-padding py-20 md:py-28">
        <p className="label-xs text-catch-muted mb-2">Browse by Category</p>
        <h2 className="heading-display text-4xl md:text-5xl mb-12">The Collection</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {[
            {
              name: "Outerwear",
              query: "Jackets",
              img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            },
            {
              name: "Hoodies",
              query: "Hoodies",
              img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
            },
            {
              name: "T-Shirts",
              query: "T-Shirts",
              img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
            },
            {
              name: "Trousers",
              query: "Trousers",
              img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.query}`}
              className="group relative aspect-[3/4] overflow-hidden bg-catch-gray block"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-catch-black/40 group-hover:bg-catch-black/20 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4">
                <p className="heading-display text-xl md:text-2xl">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── BRAND VALUES ─────────────────────────────────── */}
      <section className="bg-catch-dark border-y border-catch-mid section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {[
            {
              title: "Premium Materials",
              body: "Every CATCH piece uses only the finest fabrics — sourced from Portugal, Italy, and Japan.",
            },
            {
              title: "Built to Last",
              body: "We design for longevity. No fast fashion. Pieces that become part of your identity.",
            },
            {
              title: "For the Modern Man",
              body: "Silhouettes that move with you. From the street to wherever you're going.",
            },
          ].map((val) => (
            <div key={val.title} className="border-t border-catch-mid pt-6">
              <h3 className="heading-display text-xl mb-3">{val.title}</h3>
              <p className="text-catch-muted text-sm leading-relaxed">{val.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────── */}
      <section className="section-padding py-20 md:py-28 text-center">
        <p className="label-xs text-catch-muted mb-4">Stay in the Loop</p>
        <h2 className="heading-display text-4xl md:text-6xl mb-4">
          Early Access &
          <br />
          Exclusive Drops
        </h2>
        <p className="text-catch-muted text-sm mb-8 max-w-md mx-auto">
          Be first to know about new collections, limited releases, and members-only offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-catch-gray border border-catch-mid text-catch-white placeholder:text-catch-muted px-4 py-3 text-sm focus:outline-none focus:border-catch-muted transition-colors"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
