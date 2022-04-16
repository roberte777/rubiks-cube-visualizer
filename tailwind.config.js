module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))'
      },
      gridColumnEnd: {
        '24': '24'
      }
    },
  },
  plugins: [],
}
