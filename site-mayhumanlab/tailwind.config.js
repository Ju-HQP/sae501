/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif', // Adds a new `font-display` class
      }
    },
  },
  plugins: [],
}