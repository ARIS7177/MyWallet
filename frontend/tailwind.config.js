/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      "raleway":['Raleway-Regular','Raleway-Medium','Raleway-Bold'],
      "helvitica":["helvitica-light",'helvitica-thin','helvitica-medium','helvitica-bold'],
    },
    extend: {
      colors:{
        'primary':{
          50:"#ffffea",
          100:"#fffcc5",
          200:"#fffa85",
          300:"#fff146",
          400:"#ffe31b",
          500:"#ffc400",
          600:"#e29800",
          700:"#bb6c02",
          800:"#985308"
        },
        'russian':{
          50:"#eef2ff",
          100:"#dfe8ff",
          200:"#c6d2ff",
          300:"#a3b5fe",
          400:"#7f8dfa",
          500:"#6066f4",
          600:"#4843e8",
          700:"#3d35cd",
          800:"#322ea5",
          900:"#2d2c83",
          950:"#0e0d26"
        }
      }
    },
  },
  plugins: [],
}