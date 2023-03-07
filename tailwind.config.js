/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
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
      current: "currentColor",
      "dark-yellow": "#FFBC4B",
      "light-blue": "#519BF4",
      "light-pink": "#FFCDD3",
      "dark-pink": "#F673A2",
      "light-green": "#CDF564",
      "bright-red": "#FF4633",
      "light-gray": "#919496",
      "smoke-black": "#191414",
      black: "#000000",
      white: "#FFFFFF",
      "spotify-green": "#1db954",
      "mint-green": "#51B16C",
      "bright-purple": "#953F91",
      "bright-maroon": "#CD3446",
    },
    extend: {
      fontFamily: {
        circular: ["var(--font-circular)", "sans-serif"],
      },
      animation: {
        expandHeart: "expandHeart 0.3s ease-in 1",
        shakeHeart: "shakeHeart .25s linear 1",
        skeleton: "skeleton 0.3 ease-in infinite",
        slideText: "slideText 5s linear infinite",
        fadeUp: "fadeUp .6s ease-out 1",
        fadeOut: "fadeOut .6s ease-out 1",
      },
      keyframes: {
        shakeHeart: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
        expandHeart: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.3)" },
          "90%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(0.9)" },
        },
        skeleton: {
          "0%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(2)" },
          "100%": { filter: "brightness(0.5)" },
        },
        fadeUp: {
          "0%": { opacity: "0%", transform: "translateY(12px)"},
          "50%": { opacity: "80%"},
          "100%": { opacity: "100%", transform: "translateY(0px)"},
        },
        fadeOut: {
          "0%": { opacity: "100%", transform: "translateY(0px)"},
          "50%": { opacity: "80%"},
          "100%": { opacity: "0%", transform: "translateY(12px)"},
        },
        slideText: {
          "0%": {
            transform: "translateX(0)",
            left: "0",
          },
          "10%": {
            transform: "translateX(0)",
            left: "0",
          },
          "45%": {
            transform: "translateX(-100%)",
            left: "100%",
          },
          "55%": {
            transform: "translateX(-100%)",
            left: "100%",
          },
          "90%": {
            transform: "translateX(0%)",
            left: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            left: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
