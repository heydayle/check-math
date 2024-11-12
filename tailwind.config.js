/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui'
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui]
}
