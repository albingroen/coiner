const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      ...fontFamily,
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
