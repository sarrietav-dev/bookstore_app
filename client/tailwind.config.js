/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#bc3729",
        secondary: "#d48d4d",
        tertiary: "#f7d6bf",
        text: "#303f4f",
        subtext: "#677c93",
      },
    },
  },
  plugins: [],
};
