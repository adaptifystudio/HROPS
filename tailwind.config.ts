const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // ✅ Include HeroUI theme from node_modules
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // ✅ HeroUI uses class-based dark mode
  plugins: [
    heroui(), // ✅ HeroUI plugin
    require("@tailwindcss/typography"), // optional but recommended
  ],
};
