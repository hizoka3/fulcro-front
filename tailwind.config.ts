import type { Config } from "tailwindcss";

/**
 * Fulcro · Identidad institucional
 * Paleta gubernamental moderna: tinta institucional + papel oficial + sello rojo reservado.
 * Tokens semánticos (primary/accent/surface/ink) preservados para compat con rutas existentes.
 */

const ink = "oklch(0.24 0.05 245 / <alpha-value>)";
const inkSoft = "oklch(0.45 0.04 245 / <alpha-value>)";
const inkMuted = "oklch(0.50 0.02 245 / <alpha-value>)";
const inkSubtle = "oklch(0.65 0.015 245 / <alpha-value>)";

const paper = "oklch(0.975 0.005 85 / <alpha-value>)";
const paperWarm = "oklch(0.95 0.012 75 / <alpha-value>)";
const paperRaised = "oklch(0.99 0.003 85 / <alpha-value>)";
const paperSunken = "oklch(0.93 0.012 80 / <alpha-value>)";

const seal = "oklch(0.50 0.16 28 / <alpha-value>)";
const sealSoft = "oklch(0.65 0.12 28 / <alpha-value>)";

const rule = "oklch(0.82 0.012 245 / <alpha-value>)";
const ruleStrong = "oklch(0.55 0.04 245 / <alpha-value>)";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Marca institucional
        ink: {
          DEFAULT: ink,
          deep: ink,
          soft: inkSoft,
          muted: inkMuted,
          subtle: inkSubtle,
        },
        paper: {
          DEFAULT: paper,
          warm: paperWarm,
          raised: paperRaised,
          sunken: paperSunken,
        },
        seal: {
          DEFAULT: seal,
          soft: sealSoft,
        },
        rule: {
          DEFAULT: rule,
          strong: ruleStrong,
        },

        // Compat: tokens semánticos remapeados a la paleta institucional
        primary: {
          DEFAULT: ink,
          50: "oklch(0.97 0.008 245 / <alpha-value>)",
          100: "oklch(0.92 0.014 245 / <alpha-value>)",
          200: "oklch(0.82 0.022 245 / <alpha-value>)",
          300: "oklch(0.70 0.032 245 / <alpha-value>)",
          400: "oklch(0.55 0.04 245 / <alpha-value>)",
          500: "oklch(0.42 0.05 245 / <alpha-value>)",
          600: "oklch(0.34 0.05 245 / <alpha-value>)",
          700: "oklch(0.28 0.05 245 / <alpha-value>)",
          800: ink,
          900: "oklch(0.18 0.045 245 / <alpha-value>)",
        },
        accent: {
          DEFAULT: seal,
          50: "oklch(0.96 0.025 28 / <alpha-value>)",
          100: "oklch(0.90 0.06 28 / <alpha-value>)",
          200: "oklch(0.80 0.10 28 / <alpha-value>)",
          300: "oklch(0.70 0.13 28 / <alpha-value>)",
          400: "oklch(0.60 0.15 28 / <alpha-value>)",
          500: seal,
          600: "oklch(0.42 0.16 28 / <alpha-value>)",
          700: "oklch(0.36 0.14 28 / <alpha-value>)",
        },
        surface: {
          DEFAULT: paper,
          raised: paperRaised,
          sunken: paperWarm,
        },
        success: "oklch(0.55 0.13 150 / <alpha-value>)",
        warning: "oklch(0.74 0.15 80 / <alpha-value>)",
        danger: seal,
      },
      fontFamily: {
        sans: [
          "'Inter Tight'",
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
        serif: [
          "'Fraunces'",
          "'GT Sectra'",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        mono: [
          "'Geist Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // Display serif (Fraunces) — encabezados oficiales
        display: ["56px", { lineHeight: "1.0", letterSpacing: "-0.025em", fontWeight: "400" }],
        h1: ["32px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        h2: ["24px", { lineHeight: "1.2", letterSpacing: "-0.018em", fontWeight: "500" }],
        h3: ["20px", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "500" }],
        body: ["15px", { lineHeight: "1.55" }],
        small: ["13px", { lineHeight: "1.5" }],
        // Mono institucional — etiquetas, folios, citas legales
        meta: ["10px", { lineHeight: "1.4", letterSpacing: "0.22em" }],
        nano: ["9px", { lineHeight: "1.4", letterSpacing: "0.28em" }],
        // Compat con rutas existentes
        micro: ["12px", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      boxShadow: {
        card: "0 1px 2px oklch(0.24 0.05 245 / 0.04), 0 4px 16px oklch(0.24 0.05 245 / 0.06)",
        "card-hover":
          "0 2px 4px oklch(0.24 0.05 245 / 0.06), 0 12px 32px oklch(0.24 0.05 245 / 0.10)",
        drawer: "-12px 0 32px oklch(0.24 0.05 245 / 0.18)",
        focus: "0 0 0 3px oklch(0.50 0.16 28 / 0.30)",
        seal: "0 0 0 1px oklch(0.55 0.04 245 / 0.20), 0 1px 0 oklch(0.99 0.003 85 / 0.4) inset",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "10px",
        xl: "16px",
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
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 300ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right":
          "slide-in-right 280ms cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
