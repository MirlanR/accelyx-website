"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import PricingModal from "./PricingModal";

/* ── Accelyx AI branded logo mark ──────────────────── */
const LogoMark = ({ theme }: { theme: string }) => (
  <img
    src={theme === "dark" ? "/logo.png" : "/logo-dark.png"}
    alt="Accelyx AI"
    width={38}
    height={38}
    style={{ objectFit: "contain", borderRadius: "8px" }}
  />
);

const navLinks = [
  { label: "Services",     href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results",      href: "#results" },
  { label: "Industries",   href: "#industries" },
  { label: "Pricing",      href: "#pricing-modal" },
  { label: "FAQ",          href: "#faq" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href === "#pricing-modal") {
      setPricingOpen(true);
      return;
    }
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = isScrolled
    ? theme === "dark"
      ? "rgba(7,7,26,0.88)"
      : "rgba(248,250,252,0.88)"
    : "transparent";

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: navBg,
        backdropFilter: isScrolled ? "blur(16px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="container-max section-padding py-0">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ── Logo ────────────────────────────── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); if (window.location.pathname === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); } else { window.location.href = "/"; } }}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <LogoMark theme={theme} />
            </div>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: "var(--text)" }}
            >
              Acce<span className="gradient-text">lyx</span>{" "}
              <span style={{ color: "var(--accent)", fontSize: "0.85em" }}>AI</span>
            </span>
          </a>

          {/* ── Desktop Nav ──────────────────────── */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="nav-link bg-transparent border-none outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── Desktop Actions ──────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Book a Call
            </button>
          </div>

          {/* ── Mobile Controls ──────────────────── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "420px" : "0",
          background: theme === "dark" ? "rgba(7,7,26,0.96)" : "rgba(248,250,252,0.96)",
          backdropFilter: "blur(16px)",
          borderTop: mobileOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="container-max section-padding py-0 flex flex-col gap-1 pb-6 pt-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left px-4 py-3 rounded-xl font-medium transition-all duration-200"
              style={{ color: "var(--muted)", background: "transparent" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary mt-2 justify-center text-sm"
          >
            Book a Call
          </button>
        </div>
      </div>
    </header>

    <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
}
