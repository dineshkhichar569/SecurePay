/** @type {import('tailwindcss').Config} */
export default {
content: [
  "./src/**/*.{js,jsx,ts,tsx,html}", // for all files in src folder
  "./public/index.html"              // if you use anything in public
],

  theme: {
    extend: {},
  },
  plugins: [],
}