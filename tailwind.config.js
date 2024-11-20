/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui'
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      animation: {
        'beat-spin': 'beat-spin 5s infinite',
      },
      keyframes: {
        'beat-spin': {
          '0%, 20%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
          '10%': { transform: 'scale(1.2)', opacity: 0.8 },
          '20%': { transform: 'scale(1)', opacity: 1 },
          '30%': { transform: 'scale(1.2)', opacity: 0.8 },
          '40%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: 1 },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: 1 },
        },
      },
    },
  },
  plugins: [tailwindcssPrimeui]
}
