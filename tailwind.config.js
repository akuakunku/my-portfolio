/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111827',
        'dark-text': '#e2e8f0',
        'light-bg': '#e2e8f0',
        'light-text': '#1a202c',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
