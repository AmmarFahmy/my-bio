/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Warm night palette, shared with the 1ClickLesson landing page so the
      // two read as one family: plum-tinted ink, with gold as the light source.
      colors: {
        ink: {
          950: '#0b080c',
          900: '#120d13',
          800: '#1a131a',
          700: '#2a202b',
          600: '#3d3140',
          400: '#7d6f80'
        },
        plum: {
          900: '#1c1124',
          800: '#2b1636'
        },
        dusk: {
          600: '#7a2e4a'
        },
        dawn: {
          500: '#e2683c'
        },
        gold: {
          200: '#ffe7a6',
          300: '#ffd25e',
          400: '#f5b418',
          500: '#e09a00',
          700: '#8a5a00'
        },
        cream: {
          50: '#fffbf3',
          100: '#fff4df',
          200: '#fbe6c0'
        },
        accent: {
          DEFAULT: '#f5b418',
          soft: '#ffe7a6',
          deep: '#e09a00'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }]
      },
      transitionTimingFunction: {
        glass: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
