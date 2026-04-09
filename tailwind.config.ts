import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#030304",
          900: "#101011",
          850: "#141417",
          800: "#1a1b1f",
          700: "#222329",
          600: "#2e3035",
          500: "#3f4148"
        },
        sand: {
          50: "#fcfaf4",
          100: "#f3f1e8",
          300: "#cac8bd"
        },
        brass: {
          400: "#f2c14e",
          500: "#d6a32f"
        },
        mist: {
          400: "#58c4dd"
        },
        sage: {
          400: "#8fd694",
          500: "#95e0a4"
        },
        ember: {
          400: "#f09a84"
        },
        slate: {
          400: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.42)",
        glow: "0 12px 30px rgba(242, 193, 78, 0.2)"
      }
    }
  },
  plugins: []
} satisfies Config;
