/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '600px',
        tablet: '800px',
        laptop: '1000px',
      },
      colors: {
        primary: '#292421',
        secondary: '#7DF9FF',
        accent: '#F1F1F2',
      },
      fontFamily: {
        plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
