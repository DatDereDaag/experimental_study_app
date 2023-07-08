/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-color": "#001a0b",
        "green-text": "#bdffcd",
        "dark-green": "#003012",
        "darker-green": "#001207",
        black: "#000000",
        white: "#ffffff",
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
    },
  },
  plugins: [],
};
