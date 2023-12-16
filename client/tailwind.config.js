/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    fontFamily: {
      main: ["Roboto", "sans - serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        primary: "#f3f4f6",
        secondary: "#e5e7eb",
        third: "#d1d5db",
        main: "#111827",
      },
      colors: {
        primary: "#f3f4f6",
        secondary: "#e5e7eb",
        third: "#d1d5db",
        main: "#111827",
      },
    },
  },
  plugins: [],
};
