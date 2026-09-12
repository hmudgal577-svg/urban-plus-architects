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
        background: "var(--background)",
        foreground: "var(--foreground)",
        sand: {
          50: "#fcfbfa",
          100: "#f7f6f2",
          200: "#efece4",
          300: "#e3dfd4",
          400: "#c7c2b5",
          500: "#9e9889",
          600: "#6e695c",
          700: "#4d493f",
          800: "#2d2a23",
          900: "#181714",
        },
        studio: {
          950: "#0e1014",
          900: "#16181e",
          850: "#1e2128",
          800: "#282c35",
          700: "#3d4250",
          600: "#555b6c",
          500: "#71798e",
          400: "#9aa2b5",
          300: "#c8cfde",
          200: "#e5e9f2",
          100: "#f2f4f8",
          50: "#fafbfe",
        },
        accent: {
          DEFAULT: "#9e7b4f",
          hover: "#89673d",
          light: "#cbb390",
          dark: "#6f512c",
          muted: "rgba(158, 123, 79, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
        ultra: "0.28em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-subtle": "scaleSubtle 20s ease-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleSubtle: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
