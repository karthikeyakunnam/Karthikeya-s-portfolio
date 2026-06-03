import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        primary: "#00E5FF",
        secondary: "#7C3AED",
        accent: "#00FFC8",
        danger: "#FF4444",
        warning: "#FFD93D",
        success: "#6BCB77",
        text: {
          DEFAULT: "#FFFFFF",
          primary: "#FFFFFF",
          muted: "#8B8B8B",
        },
        muted: "#8B8B8B",
        surface: "#0A0F1A",
        border: "#1A1F2E",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'SF Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        glass:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 20px rgba(0, 229, 255, 0.5)" },
          "50%": { textShadow: "0 0 40px rgba(0, 229, 255, 1)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "hud-scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 229, 255, 0.2)" },
          "50%": { borderColor: "rgba(0, 229, 255, 0.6)" },
        },
        "terminal-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "0.06" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "data-stream": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "node-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(0, 229, 255, 0.3)" },
          "50%": { boxShadow: "0 0 24px rgba(0, 229, 255, 0.8)" },
        },
        "orbit-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "hud-scan": "hud-scan 3s linear infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "terminal-blink": "terminal-blink 1s step-end infinite",
        "scan-line": "scan-line 4s linear infinite",
        "data-stream": "data-stream 2s linear infinite",
        "node-pulse": "node-pulse 2s ease-in-out infinite",
        "orbit-rotate": "orbit-rotate 20s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
