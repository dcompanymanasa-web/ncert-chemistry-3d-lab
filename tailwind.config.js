/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lab: {
          dark: '#0c0f17',
          surface: '#151b28',
          card: '#1b2438',
          accent: '#06b6d4',
          warning: '#f59e0b',
          success: '#10b981',
          danger: '#ef4444',
          border: '#2a364f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
