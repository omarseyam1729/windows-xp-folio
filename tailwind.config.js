/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'xp-blue': {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0073e6',
          600: '#005cb3',
          700: '#004580',
          800: '#002e4d',
          900: '#00171a',
        },
        'xp-gray': {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#303030',
          800: '#202020',
          900: '#101010',
        },
        'xp-green': '#92c05c',
        'xp-taskbar': '#245edb',
        'xp-start': '#1e4fa0',
      },
      fontFamily: {
        'xp': ['Tahoma', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'xp-inset': 'inset 1px 1px 0px rgba(255, 255, 255, 0.5), inset -1px -1px 0px rgba(0, 0, 0, 0.5)',
        'xp-outset': '1px 1px 0px rgba(255, 255, 255, 0.5), -1px -1px 0px rgba(0, 0, 0, 0.5)',
        'xp-window': '2px 2px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

