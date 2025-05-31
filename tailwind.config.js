module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        techblue: {
          light: '#d3e8ff',
          DEFAULT: '#9ccaff',
          dark: '#549eff'
        }
      }
    }
  },
  plugins: []
}; 