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
        midnight: "#0B1120",
        "midnight-deep": "#080D1A",
        blue: "#2563EB",
        "blue-dark": "#1D4ED8",
        orange: "#F97316",
        cloud: "#F4F7FD",
        green: "#10B981",
        red: "#EF4444",
        slate: "#64748B",
        "slate-light": "#94A3B8",
        border: "#D5DCEE",
        "blue-tint": "#EEF3FF",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        editorial: ["var(--font-lora)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
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
        badge: "4px",
        input: "6px",
        button: "8px",
        card: "12px",
        panel: "16px",
        pill: "9999px",
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
