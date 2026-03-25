import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accelyx AI — Links",
  description: "All links in one place. Connect with Accelyx AI across platforms.",
};

const LINKS = [
  {
    title: "Book a Free Strategy Call",
    href: "https://accelyx.ai/#contact",
    accent: true,
  },
  {
    title: "Visit Our Website",
    href: "https://accelyx.ai",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/accelyx.ai/",
    icon: "instagram",
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@accelyx.ai",
    icon: "tiktok",
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@AccelyxAI",
    icon: "youtube",
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576396972075",
    icon: "facebook",
  },
  {
    title: "X (Twitter)",
    href: "https://x.com/AccelyxAI",
    icon: "x",
  },
  {
    title: "Email Us",
    href: "mailto:hello@accelyx.ai",
    icon: "email",
  },
];

/* ── Inline SVG icons ──────────────────────────────── */
function LinkIcon({ type }: { type?: string }) {
  const cls = "w-5 h-5 flex-shrink-0";
  switch (type) {
    case "instagram":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.48a8.27 8.27 0 004.76 1.5V7.53a4.83 4.83 0 01-1-.84z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "x":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "email":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
  }
}

export default function LinksPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "var(--bg)" }}
    >
      {/* Profile */}
      <div className="flex flex-col items-center mb-10">
        {/* Logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <path d="M18 4L7 32H12.5L18 18L23.5 32H29L18 4Z" fill="white" />
            <rect x="12" y="26" width="12" height="2.5" rx="1.25" fill="rgba(255,255,255,0.4)" />
          </svg>
        </div>

        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "'Syne', sans-serif", color: "var(--text)" }}
        >
          Acce<span className="gradient-text">lyx</span>{" "}
          <span style={{ color: "var(--accent)", fontSize: "0.85em" }}>AI</span>
        </h1>
        <p className="text-sm text-center max-w-xs" style={{ color: "var(--muted)" }}>
          AI-Powered Automation for Modern Businesses
        </p>
      </div>

      {/* Links */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {LINKS.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 w-full px-5 py-4 rounded-xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={
              (link as { accent?: boolean }).accent
                ? {
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
                  }
                : {
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }
            }
          >
            <LinkIcon type={(link as { icon?: string }).icon} />
            <span className="flex-1 text-center pr-5">{link.title}</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} Accelyx AI
      </p>
    </div>
  );
}
