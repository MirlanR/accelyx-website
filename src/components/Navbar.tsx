"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=New", label: "New Arrivals" },
  { href: "/shop?category=Jackets", label: "Outerwear" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-catch-black/95 backdrop-blur-md border-b border-catch-mid"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-16 md:h-20">
          {/* Left — Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label-xs hover:text-catch-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-catch-light hover:text-catch-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Center — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl text-catch-white tracking-ultrawide uppercase"
          >
            CATCH
          </Link>

          {/* Right — Actions */}
          <div className="flex items-center gap-5 ml-auto">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="label-xs hover:text-catch-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              aria-label="Search"
              className="text-catch-muted hover:text-catch-white transition-colors"
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Open cart"
              onClick={openCart}
              className="relative text-catch-muted hover:text-catch-white transition-colors"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-catch-white text-catch-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-catch-black border-t border-catch-mid">
            <nav className="section-padding py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="label-xs text-catch-light hover:text-catch-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
