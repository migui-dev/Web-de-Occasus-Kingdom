/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esta línea es la importante
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}