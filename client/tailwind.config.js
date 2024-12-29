/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#283593',
        'vibrant-orange': '#FF5722',
        'teal': '#008080',
        'cool-gray': '#B0BEC5',
        'light-green': '#8BC34A',
        'soft-yellow': '#FFEB3B',
        'light-gray': '#F5F5F5',
        'white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
