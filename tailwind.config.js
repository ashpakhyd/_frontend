import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      error: "#F31260",
      white: "#ffffff",
      black: "#000000",
      "white-1": "#F5F6FA",
      "black-1": "#151B26",
      "black-2": "#131523",
      "gray-1": "#D7DBEC",
      "gray-2": "#5A607F", //* Mostly used
      "gray-3": "#E6E9F4",
      "gray-4": "#A1A7C4",
      "gray-5": "#D9E1EC",
      "gray-6": "#7E84A3",
      "gray-7": "#F4F4F5",
      "gray-8": "#D7DBEC",
      "gray-9": "#ABACB0",
      "light-blue": "#ECF2FF",
      "hover-bg": "#333752B2",
      "blue-1": "#1E5EFF",
      "blue-2": "#4944E6",
      "blue-3": "#1E5EFF", //* Mostly used
      "green-1": "#1FD286",
      "lite-bg": "#ecf2eb",
      premium1: "#FFEFD6",
      premiumText1: "#F99600",
      parts1: "#0D2039",
      partsText1: "#ffffff",
      basic1: "#D9E4FF",
      basicText1: "#64708E",
      primaryBtn: "#0D2039",
      secondaryBtn: "#D8D9DA",
      mainContainer: "rgba(207, 214, 150, 0.2)",
    },
    extend: {
      borderWidth: {
        '0.5': '0.5px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

      },
      // background: {
      //   premium: "#FFEFD6",
      //   pars: "#4944E6",
      // },
      fontSize: {
        font24: "24px",
      },
      lineHeight: {
        lineHeight36: "36px",
      },
      gap: {
        14: "14px",
        30: "30px",
      },
      gridTemplateColumns: {
        240: "repeat(auto-fill, minmax(240px, 1fr))",
        350: "1fr 350px",
      },
      boxShadow: {
        main: "box-shadow: 0px 1px 4px 0px #15223214",
      },
      boxShadow: {
        main: "box-shadow: 0px 1px 4px 0px #15223214",
      },
      padding: {
        "py-22": "22px",
      },
      maxHeight: {
        "page-h": "calc(100vh - 145px)",
        "table-h": "calc(100vh - 230px)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
