/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "catch-black": "#0a0a0a",
        "catch-dark": "#111111",
        "catch-gray": "#1a1a1a",
        "catch-mid": "#2a2a2a",
        "catch-muted": "#6b6b6b",
        "catch-light": "#e5e5e5",
        "catch-white": "#f5f5f5",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      letterSpacing: {
        widest: "0.3em",
        ultrawide: "0.5em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
