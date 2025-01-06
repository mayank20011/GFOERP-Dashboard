/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'sabp':{max :'1200px', min:'768px'},
        'mv':{max:'800px'},
        'xxs':{max:'500px'}
      }
    },
  },
  plugins: [],
}