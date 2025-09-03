/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ajuste conforme sua estrutura
  ],
  theme: {
    extend: {
      colors: {
        blueDark: "#0D47A1",
        grayDark: "#212121",
        orangeHighlight: "#FF6F00",
        aquaGreen: "#26A69A",
      },
    },
  },
  plugins: [],
}
