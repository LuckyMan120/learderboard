module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#EDEEF0',
    }),
    fontFamily: {
      Roboto: ['Roboto'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
