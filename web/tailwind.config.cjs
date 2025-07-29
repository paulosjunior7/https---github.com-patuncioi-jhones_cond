/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-red-500",
    "text-white",
    "text-2xl",
    "font-bold",
    "p-8",
    "mb-8",
    "rounded-xl",
    "text-center"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
