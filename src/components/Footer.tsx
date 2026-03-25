"use client";

import { Mail, Linkedin, Phone, Instagram, Youtube } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const LogoMark = ({ theme }: { theme: string }) => (
  <img
    src={theme === "dark" ? "/logo.png" : "/logo-dark.png"}
    alt="Accelyx AI"
    width={38}
    height={38}
    style={{ objectFit: "contain", borderRadius: "8px" }}
  />
);

const COMPANY_EMAIL = "hello@accelyx.ai";

const footerLinks = {
  Services: [
    { label: "AI Chatbots",           href: "#services" },
    { label: "Workflow Automation",   href: "#services" },
    { label: "Email Automation",      href: "#services" },
    { label: "CRM Integration",       href: "#services" },
    { label: "Document Processing",   href: "#services" },
  ],
  Company: [
    { label: "How It Works",  href: "#how-it-works" },
    { label: "Case Studies",  href: "#results" },
    { label: "Industries",    href: "#industries" },
    { label: "Pricing",       href: "#pricing" },
    { label: "FAQ",           href: "#faq" },
    { label: "Book a Call",   href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/cookies" },
  ],
};

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.27 8.27 0 004.76 1.5V7.53a4.83 4.83 0 01-1-.84z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const socials = [
  { icon: Instagram,    href: "https://www.instagram.com/accelyx.ai/", label: "Instagram"   },
  { icon: TikTokIcon,   href: "https://www.tiktok.com/@accelyx.ai",   label: "TikTok"      },
  { icon: Youtube,       href: "https://www.youtube.com/@AccelyxAI",   label: "YouTube"     },
  { icon: FacebookIcon,  href: "https://www.facebook.com/profile.php?id=61576396972075", label: "Facebook" },
  { icon: XIcon,         href: "https://x.com/AccelyxAI",               label: "X (Twitter)" },
  { icon: Linkedin,      href: "#",                                    label: "LinkedIn"    },
  { icon: Mail,          href: `mailto:${COMPANY_EMAIL}`,              label: "Email"       },
];

export default function Footer() {
  const { theme } = useTheme();
  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Not on homepage — navigate there with anchor
        window.location.href = "/" + href;
      }
    }
  };

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      {/* Main */}
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); if (window.location.pathname === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); } else { window.location.href = "/"; } }}
              className="flex items-center gap-2.5 mb-5 group w-fit"
            >
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <LogoMark theme={theme} />
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Syne',sans-serif", color: "var(--text)" }}
              >
                Acce<span className="gradient-text">lyx</span>{" "}
                <span style={{ color: "var(--accent)", fontSize: "0.85em" }}>AI</span>
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--muted)" }}>
              We help companies eliminate repetitive work and grow faster with
              custom AI automation — built to fit your exact workflow.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                <Mail size={13} />
                {COMPANY_EMAIL}
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--text)" }}
              >
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          handleClick(link.href);
                        }
                      }}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--accent)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--muted)"; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-max section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Accelyx AI. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Built with ⚡ to automate the world
        </p>
      </div>
    </footer>
  );
}
