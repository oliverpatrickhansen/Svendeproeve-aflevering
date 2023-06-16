/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'DMsans' : ['"DM Sans"'],
        'Nunito' : ['"Nunito"']
      },
      backgroundImage:{
        'hero' : "url('src/assets/frontpageImage.jpg')",
        'help' : "url('src/assets/helpPageImage.jpg')",
        'help1' : "url('src/assets/helpPageImage(1).jpg')",
  
      },
      backgroundColor:{
        'white-rgba' : 'rgba(255, 255, 255 , .25)'
      }
    },
  },
  plugins: [],
}
