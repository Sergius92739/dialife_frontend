/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        ring: 'ring 1.5s linear infinite',
        text: 'text 2s ease-in-out infinite',
      },
      keyframes: {
        ring: {
          '0%': { transform: 'rotate(0deg)', boxShadow: '1px 5px 2px #e65c00' },
          '50%': {transform: 'rotate(180deg)', boxShadow: '1px 5px 2px #18b201'},
          '100%': {transform: 'rotate(360deg)',  boxShadow: '1px 5px 2px #0456c8'},
        },
        text: {
          '50%': {color: '#000'}
        }
      }
    },
  },
  plugins: [],
}
