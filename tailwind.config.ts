import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A2540",
          50: "#EEF3F8",
          100: "#D6E1ED",
          200: "#A9BFD7",
          300: "#7B9CC0",
          400: "#4D79AA",
          500: "#2F5C8C",
          600: "#1E436B",
          700: "#143251",
          800: "#0A2540",
          900: "#061830",
        },
        accent: {
          DEFAULT: "#FF7A59",
          50: "#FFF2EE",
          100: "#FFDFD3",
          200: "#FFC2AC",
          300: "#FFA585",
          400: "#FF8C6B",
          500: "#FF7A59",
          600: "#E45F3F",
          700: "#B84B30",
        },
        surface: {
          DEFAULT: "#F6F8FA",
          raised: "#FFFFFF",
          sunken: "#EEF1F4",
        },
        ink: {
          DEFAULT: "#1A1F36",
          muted: "#6B7280",
          subtle: "#9AA3B2",
        },
        success: "#0F9D58",
        warning: "#F4B400",
        danger: "#D93025",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["Lora", "Georgia", "serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["24px", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.55" }],
        small: ["14px", { lineHeight: "1.5" }],
        micro: ["12px", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,37,64,0.04), 0 4px 16px rgba(10,37,64,0.06)",
        "card-hover": "0 2px 4px rgba(10,37,64,0.06), 0 12px 32px rgba(10,37,64,0.10)",
        drawer: "-12px 0 32px rgba(10,37,64,0.18)",
        focus: "0 0 0 3px rgba(255,122,89,0.35)",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right": "slide-in-right 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
