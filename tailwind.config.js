/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#fdf8f0',
          100: '#faebd7',
          200: '#f5d5a8',
          300: '#edb96f',
          400: '#e09a3e',
          500: '#c47e22',
          600: '#9e631a',
          700: '#7c4d18',
          800: '#643e18',
          900: '#533318',
        }
      }
    },
  },
  plugins: [],
}

