/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: { 500: "#7C5DFA", 400: "#9277FF" },
        dark: {
          100: "#1E2139",
          200: "#252945",
          300: "#141625",
          400: "#0C0E16",
        },
        gray: {
          100: "#F8F8FB",
          200: "#DFE3FA",
          300: "#888EB0",
          400: "#7E88C3",
        },
        danger: "#EC5757",
        success: "#33D69F",
        warning: "#FF8F00",
      },
    },
  },
  plugins: [],
};
