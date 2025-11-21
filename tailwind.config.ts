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
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      // @ts-ignore
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            lineHeight: "1.75",
            h1: { fontWeight: "700", color: theme("colors.gray.900") },
            h2: { fontWeight: "600", color: theme("colors.gray.800") },
            h3: { fontWeight: "600", color: theme("colors.gray.800") },
            strong: { color: theme("colors.gray.900") },
            p: { marginTop: "0.5em", marginBottom: "0.5em" },
            ul: { marginTop: "0.5em", marginBottom: "1em" },
            li: { marginTop: "0.25em", marginBottom: "0.25em" },
            a: { color: theme("colors.orange.600"), textDecoration: "none" },
          },
        },
      }),
    },
  },

  darkMode: "class", // ✅ HeroUI uses class-based dark mode

  plugins: [
    heroui(), // ✅ HeroUI plugin
    require("@tailwindcss/typography"), // ✅ Clean typographic layouts
  ],
};
