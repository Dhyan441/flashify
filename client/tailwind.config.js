/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#52796f",
          main: "#354f52",
          dark: "#2f3e46",
          background: "#FFFFFA",
        },
        secondary: {
          light: "#FCFBF4",
          main: "#cad2c5",
          dark: "#84a98c",
        },
      },
    },
  },
  plugins: [],
};
