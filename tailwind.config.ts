import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#080D1A",
          dim: "#0B1120",
          low: "#0F1629",
          container: "#141C35",
          high: "#1A2340",
          bright: "#212B4A",
        },
        primary: {
          DEFAULT: "#F97316",
          dim: "#EA580C",
          glow: "rgba(249,115,22,0.15)",
        },
        secondary: {
          DEFAULT: "#2563EB",
          dim: "#1D4ED8",
          glow: "rgba(37,99,235,0.15)",
        },
        "on-surface": {
          DEFAULT: "#E2E8F0",
          variant: "#94A3B8",
        },
        outline: {
          DEFAULT: "#64748B",
          variant: "#334155",
        },
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-label)", "sans-serif"],
      },
      fontSize: {
        "hero-xl": ["96px", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "800" }],
        hero: ["80px", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "800" }],
        "hero-tablet": ["56px", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "hero-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        h1: ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["26px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.8", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.14em", fontWeight: "400" }],
      },
      spacing: {
        xs: "4px",
        s: "8px",
        m: "16px",
        l: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px",
      },
      transitionDuration: {
        hover: "250ms",
        entrance: "500ms",
        modal: "300ms",
        focus: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
