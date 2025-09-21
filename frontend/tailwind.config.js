/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#19183B",   // Deep Navy
        secondary: "#708993", // Blue-gray
        accent: "#A1C2BD",    // Teal highlight
        light: "#E7F2EF",     // Soft mint background
      },

    },
  },
  plugins: [],
};