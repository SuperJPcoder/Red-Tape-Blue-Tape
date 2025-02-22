module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        keyframes: {
          gradientShift: {
            '0%': { 'background-position': '0% 50%' },
            '100%': { 'background-position': '100% 50%' }
          }
        },
        animation: {
          gradientShift: 'gradientShift 1s linear infinite'
        }
      }
    },
    plugins: []
  }
  