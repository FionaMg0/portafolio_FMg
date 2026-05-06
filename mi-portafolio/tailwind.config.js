/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jacarta': '#3A345B',
        'queen-pink': '#F3C8DD',
        'middle-purple': '#D183A9',
        'old-lavender': '#71557A',
        'brown-chocolate': '#4B1535',
      }
    },
  },
  plugins: [],
}