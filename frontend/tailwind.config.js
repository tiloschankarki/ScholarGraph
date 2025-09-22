/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",    
        accent: "#fcb53b",    
        white: "#ffffff",     
      },
    },
  },
  plugins: [],
};