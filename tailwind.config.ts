import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#f8f5ef",
        forest: "#4f5e45",
        coral: "#bf6f74",
      },
      boxShadow: {
        card: "0 10px 35px rgba(41, 51, 36, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
