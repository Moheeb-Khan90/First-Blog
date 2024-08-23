/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        xs: '2px',
      },
      screens: {
        'xsm': '200px',
        
      },
    },
  },
  plugins: [],
}

