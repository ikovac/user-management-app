/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: "#2463eb",
      },
    },
  },
  plugins: [],
};
