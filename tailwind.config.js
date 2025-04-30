/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      colors:{
        "symptom-mild": '#b0f7bd',
        "symptom-medium": '#f7ddb0',
        "symptom-serious": '#f7b4b0',
      }
    }
  },
  plugins: [],
}
