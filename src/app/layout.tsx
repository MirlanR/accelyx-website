import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Accelyx AI — AI Automation Agency",
  description:
    "Accelyx AI helps companies eliminate repetitive work and scale smarter with custom AI automation solutions. Workflows, chatbots, and intelligent integrations — built for you.",
  keywords: [
    "AI automation",
    "workflow automation",
    "AI agency",
    "business automation",
    "chatbot development",
    "process automation",
    "Accelyx AI",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Accelyx AI — AI Automation Agency",
    description: "Automate your business with cutting-edge AI.",
    type: "website",
    url: "https://accelyx.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Accelyx AI — AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accelyx AI — AI Automation Agency",
    description: "Automate your business with cutting-edge AI.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Inline script to set dark class before paint — prevents flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var s = localStorage.getItem('accelyx-theme');
                  var p = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var t = s || p;
                  if (t === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
