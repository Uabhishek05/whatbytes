import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        mist: "#F6F7FB",
        line: "#E6E9F2",
        coral: "#FF6B5F",
        leaf: "#2F9E73",
        gold: "#F7B731"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
