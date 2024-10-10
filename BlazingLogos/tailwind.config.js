/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{razor, html}'],
  theme: {
      extend: {
          colors: {
              'bl-primary': '#1991ee',
              'bl-black': '#303030',
              'bl-black-accent': '#141516',
              'bl-white': '#edf1fa'
          }
      },
      fontFamily: {
          sans: ["'Oswald'", "sans-serif"]
      }
  },
  plugins: [],
}

