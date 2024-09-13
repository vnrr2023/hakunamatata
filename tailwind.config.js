const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "animation": {
            shimmer: "shimmer 2s linear infinite",
            spotlight: "spotlight 2s ease .75s 1 forwards",
          },
          "keyframes": {
            shimmer: {
              from: {
                "backgroundPosition": "0 0"
              },
              to: {
                "backgroundPosition": "-200% 0"
              }
            },
            spotlight: {
              "0%": {
                opacity: 0,
                transform: "translate(-72%, -62%) scale(0.5)",
              },
              "100%": {
                opacity: 1,
                transform: "translate(-50%,-40%) scale(1)",
              },
            },
          }
    },
  },
   
  plugins: [addVariablesForColors],
}

function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}


