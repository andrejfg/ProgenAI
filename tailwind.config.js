/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}', './app/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        space: 'SpaceMono',
        robotoMono: 'RobotoMono',
      },
      colors: {
        light: {
          c10: '#000010',
          c10_alt: '#ccdedb',
          c30: '#051752',
          c60: '#F0F8FF',
        },
        dark: {
          c10: '#ccdedb',
          c10_alt: '#274973',
          c30: '#051752',
          c60: '#000010',
        },
        balloon: {
          user: '#1976f0',
          system: '#363636',
          date: {
            user: '#a4b2af',
            system: '#9daba8',
          },
        },
        chat: {
          send: {
            button: '#1976f0',
            icon: 'white',
          },
        },
        custom: {
          red: {
            50: '#ff1526',
            100: '#b40f1b',
          },
        },
      },
    },
  },
  plugins: [],
}
