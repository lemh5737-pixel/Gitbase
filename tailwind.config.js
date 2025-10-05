/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warna utama baru untuk VorBase
        'vorbase-violet': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Warna Utama
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Warna untuk tema gelap
        'vorbase-dark': '#0f0f23',
        'vorbase-gray': '#1a1a2e',
        'vorbase-gray-light': '#252541',
      },
    },
  },
  plugins: [],
}
