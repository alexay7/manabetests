/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "N5": "#EF4444",
        "N4": "#F97316",
        "N3": "#22C55E",
        "N2": "#3B82F6",
        "N1": "#EC4899"
      }
    },
  },
  plugins: [],
  important: true,
}