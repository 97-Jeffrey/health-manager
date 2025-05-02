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
        "action-create": "#000000",
        "action-update": "#000000",
        "action-delete":"#000000",
        "sleep-hours":"#d46bfd",
        "sport-steps":"#d46bfd",
        "sport-calories": "#ff4400",
        "symptom-mild": '#b0f7bd',
        "symptom-medium": '#f7ddb0',
        "symptom-serious": '#f7b4b0',
      }
    }
  },
  plugins: [],
}
