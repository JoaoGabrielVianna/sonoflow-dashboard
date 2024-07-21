/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'gray-color': '#67676B',
        'white-color': '#F8F8F9',

      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif']
      },
      colors: {
        'black-color': '#22232A',
        'sidebar-background': '#F8F8F9',
        'dark-blue-color': '#1C2D39'
      }
    },
  },
  plugins: [],
}