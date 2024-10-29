import { dark } from "@mui/material/styles/createPalette";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        text: ['var(--font-inter)'],
        mono: ['var(--font-monospace)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        okz: "#6ACCE1",
        brand: {
          dark: "#14081C",
          primary: "#FF1D8E",
          secondary: "#F5576C",
          accent: "#5E29F9",
          light: "#FFD1D7",
        }
      }
    },
  },
  plugins: [],
};
export default config;
