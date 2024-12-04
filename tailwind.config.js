/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
        fadeModal: 'fadeIn ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeModal: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      screens: {
        mobile: '600px',
        tablet: '800px',
        laptop: '1000px',
      },
      colors: {
        primary: '#020150',
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
