import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sonsie': ['Sonsie One', 'cursive'],
      },
      animation: {
        'spin-reverse': 'spin-reverse 3s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#fff2e5",
              100: "#ffe5cc",
              200: "#ffcc99",
              300: "#ffb266",
              400: "#ff9933",
              500: "#ff8000",
              600: "#cc6600",
              700: "#994d00",
              800: "#663300",
              900: "#331a00",
              DEFAULT: "#ff8000",
              foreground: "#ffffff"
            },
            video: {
              DEFAULT: "#ff8000",
              foreground: "#ffffff"
            }
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#331a00",
              100: "#663300",
              200: "#994d00",
              300: "#cc6600",
              400: "#ff8000",
              500: "#ff9933",
              600: "#ffb266",
              700: "#ffcc99",
              800: "#ffe5cc",
              900: "#fff2e5",
              DEFAULT: "#ff9933",
              foreground: "#000000"
            },
            video: {
              DEFAULT: "#ff9933",
              foreground: "#000000"
            }
          },
        },
      },
    }),
  ],
}