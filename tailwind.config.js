/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: 
    
    {backgroundImage: {
      "hero": "url('/src/assets/hero.jpg')",
      "hack": "url('/src/assets/hack.jpg')",
      "login": "url('/src/assets/login.jpg')",
      "profile": "url('/src/assets/profile.jpg')"

    },},
  },
  plugins: [],
}