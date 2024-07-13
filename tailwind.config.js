/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Menggunakan dark mode berdasarkan class 'dark'
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a202c',       // Latar belakang gelap
          text: '#cbd5e0',     // Warna teks pada mode gelap
        },
        light: {
          bg: '#ffffff',       // Latar belakang terang
          text: '#2d3748',     // Warna teks pada mode terang
        },
      },
    },
  },
  plugins: [],
};
