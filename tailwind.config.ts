import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/frontend/**/*.{ts,tsx}",
    "./src/apps/**/*.{ts,tsx}",
    "./src/core/ui/**/*.{ts,tsx}",
    "./src/shared/ui/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1"
        },
        ink: {
          900: "#111827",
          700: "#374151",
          500: "#6b7280"
        }
      },
      borderRadius: {
        DEFAULT: "0.5rem"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
