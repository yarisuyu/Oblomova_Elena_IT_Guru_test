/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'blue': {
        600: '#367AFF',
        700: '#242EDB',
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '5xl': '2.5rem',
      }
    }
  },
}