/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem',
        ...defaultTheme.fontSize,
      },
      // fontFamily: {
      //   sans: ['Inter var', 'Noto Sans JP', ...defaultTheme.fontFamily.sans],
      //   serif: ['Shippori Mincho', ...defaultTheme.fontFamily.serif],
      //   en: ['Reem Kufi', 'sans-serif'],
      // },
      colors: {
        current: 'currentColor',
        primary: {
          light: 'hsla(212, 100%, 50%, 1)',
          DEFAULT: 'hsla(212, 100%, 28%, 1)',
          dark: 'hsla(212, 100%, 10%, 1)',
        },
        secondary: {
          light: 'hsla(212, 30%, 60%, 1)',
          DEFAULT: 'hsla(212, 30%, 47%, 1)',
          dark: 'hsla(212, 30%, 10%, 1)',
        },
        tertiary: {
          light: 'hsla(212, 41%, 70%, 1)',
          DEFAULT: 'hsla(212, 41%, 58%, 1)',
          dark: 'hsla(212, 41%, 30%, 1)',
        },
        ...defaultTheme.colors,
      },
      container: {
        center: true,
        screens: {
          DEFAULT: '540px',
          // sm: '640px',
          // md: '640px',
          // lg: '640px',
          // xl: '640px',
          // '2xl': '640px',
        },
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
