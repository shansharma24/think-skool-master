/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F26522',
        secondary: '#0071BC',
        accent: '#FFD233',
        light: '#F9FAFB',
        dark: '#1E293B',
        textSecondary: '#64748B',
        success: '#10B981',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
