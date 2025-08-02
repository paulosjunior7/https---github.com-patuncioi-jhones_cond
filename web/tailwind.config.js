/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui"],
      },
      screens: {
        xs: "475px",
        sm: "800px", // 800x450
        md: "1200px", // 1200x675
        lg: "1333px", // 1333x750
        xl: "1920px", // 1920x1080
        "2xl": "1920px",
      },
    },
  },
  plugins: [],
};
