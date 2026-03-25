/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        // Dark theme surface colors
        dark: {
          bg:     "#07071a",
          surface:"#0e0e2e",
          card:   "#12122e",
          border: "#1e1e4a",
          muted:  "#4b5563",
        },
        // Light theme surface colors
        light: {
          bg:     "#f8fafc",
          surface:"#ffffff",
          card:   "#f1f5f9",
          border: "#e2e8f0",
          muted:  "#94a3b8",
        },
      },
      fontFamily: {
        sans:    ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Syne'", "'Inter'", "sans-serif"],
        mono:    ["'Space Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-brand":   "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
        "gradient-radial":  "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-hero":    "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)",
        "grid-pattern":     "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "fade-in":     "fadeIn 0.8s ease-in-out forwards",
        "slide-up":    "slideUp 0.6s ease-out forwards",
        "slide-in":    "slideIn 0.5s ease-out forwards",
        "marquee":     "marquee 30s linear infinite",
        "marquee2":    "marquee2 30s linear infinite",
        "pulse-glow":  "pulseGlow 3s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "spin-slow":   "spin 8s linear infinite",
        "gradient":    "gradientShift 6s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%":   { transform: "translateX(50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99,102,241,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(99,102,241,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};
