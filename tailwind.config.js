module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ligthBlue: "#1E90FF",
        blue: "#4169E1",
        mediumBlue: "#0000CD",
        darkBlue: "#000080",
        lightGray: "#EEE",
        gray: "#9E9EA7",
        mediumGray: "#666665",
        black: "#1B1C1E",
        white: "#FFFEFD",
        green: "#25D970",
        red: "#DF1545",
        transparentBlack: "#00000099",
        orange: "#BB863C",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "3xl": "inset 0 0 4px #000",
      },
    },
  },
  plugins: [],
};
