/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC300',
        dark: '#1a1a1a',
        light: '#ffffff',
        'accent-blue': '#003087',
        'accent-red': '#ce1126',
      },
    },
  },
  plugins: [],
}
