/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060b',
          900: '#0a0d16',
          800: '#121726',
          700: '#1c2235'
        },
        techblue: {
          light: '#d3e8ff',
          DEFAULT: '#9ccaff',
          dark: '#549eff'
        },
        accent: {
          DEFAULT: '#f5b73d',
          soft: '#fcd98a',
          deep: '#b4791a'
        }
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }]
      },
      maxWidth: {
        content: '44rem'
      },
      transitionTimingFunction: {
        glass: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
