/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#954bb4",
          main: "#7b1fa2",
          dark: "#561571",
        },
        secondary: {
          light: "#f73378",
          main: "#f50057",
          dark: "#ab003c",
        },
      },
    },
  },
  plugins: [],
};
