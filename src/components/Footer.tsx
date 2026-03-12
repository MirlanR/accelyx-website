import Link from "next/link";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?category=New" },
    { label: "T-Shirts", href: "/shop?category=T-Shirts" },
    { label: "Hoodies", href: "/shop?category=Hoodies" },
    { label: "Trousers", href: "/shop?category=Trousers" },
    { label: "Outerwear", href: "/shop?category=Jackets" },
  ],
  Help: [
    { label: "Size Guide", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Brand: [
    { label: "About CATCH", href: "/about" },
    { label: "Sustainability", href: "#" },
    { label: "Stockists", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-catch-dark border-t border-catch-mid">
      {/* Main Footer */}
      <div className="section-padding py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl text-catch-white tracking-ultrawide uppercase block mb-4"
            >
              CATCH
            </Link>
            <p className="text-catch-muted text-sm leading-relaxed mb-6 max-w-xs">
              Premium menswear crafted for the modern man. Quality that endures. Style that&apos;s yours.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-catch-muted hover:text-catch-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" aria-label="X" className="text-catch-muted hover:text-catch-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-catch-muted hover:text-catch-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="label-xs text-catch-white mb-5">{heading}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-catch-muted text-sm hover:text-catch-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-catch-mid section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-catch-muted text-xs">
          © {new Date().getFullYear()} CATCH. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="#" className="text-catch-muted text-xs hover:text-catch-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-catch-muted text-xs hover:text-catch-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
