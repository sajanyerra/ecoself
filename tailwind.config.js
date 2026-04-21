/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0faf4',
          100: '#dcf5e7',
          200: '#b8ebcf',
          300: '#86d9ae',
          400: '#52b788',
          500: '#2d9e6b',
          600: '#1e7f54',
          700: '#196643',
          800: '#165237',
          900: '#13432e',
          950: '#0a2419',
        },
        sun: {
          300: '#ffe08a',
          400: '#ffd166',
          500: '#ffc233',
        },
        earth: {
          100: '#f5f0eb',
          200: '#e8ddd0',
          300: '#d4c0a8',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.06)',
        'card': '0 4px 24px rgba(0,0,0,0.08)',
        'glow': '0 0 30px rgba(82, 183, 136, 0.3)',
      }
    },
  },
  plugins: [],
}