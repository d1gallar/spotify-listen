/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "2xsm": "320px", // => @media (min-width: 320px) { ... }
      xsm: "375px", // => @media (min-width: 375px) { ... }
      sm: "640px", // => @media (min-width: 640px) { ... }
      md: "768px", // => @media (min-width: 768px) { ... }
      base: "960px", // => @media (min-width: 960px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1280px", // => @media (min-width: 1280px) { ... }
      "2xl": "1536px", // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: "transparent",
      // current: "currentColor",
      "dark-yellow": "#FFBC4B",
      "light-blue": "#519BF4",
      "light-pink": "#FFCDD3",
      "dark-pink": "#F673A2",
      "light-green": "#CDF564",
      "bright-red": "#FF4633",
      "light-gray": "#919496",
      "smoke-black": "#191414",
      "black":"#000000",
      "white":"#FFFFFF"
    },
    extend: {
      fontFamily: {
        circular: ["var(--font-circular)"],
      },
    },
  },
  plugins: [],
};
