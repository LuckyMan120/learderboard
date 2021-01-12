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
    boxShadow: {
      button: '0 0 4px 0 rgba(0,0,0,.3)',
    },
    extend: {
      colors: {
        'df-brown': '#451400',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
