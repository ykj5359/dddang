/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E6B3C",
        primaryLight: "#40916C",
        primaryDark: "#145A32",
        primaryBg: "#F0F7F4",
      },
    },
  },
  plugins: [],
};
