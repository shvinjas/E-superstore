// const withMT = require("@material-tailwind/react/utils/withMT");
 
//  module.exports = withMT({
//    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//    theme: {
//      extend: {},
//    },
//    plugins: [],
//  });
 

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: require('tailwindcss/colors').rose,
        fuchsia: require('tailwindcss/colors').fuchsia,
      },
    },
  },
  plugins: [],
});
