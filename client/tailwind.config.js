/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#8B45CA",
        "main-100": "#231B2E",
        "main-200": "#170F23",
        "main-300": "#130C1C",
      },
      colors: {
        main: "#8B45CA",
        "main-100": "#231B2E",
        "main-200": "#170F23",
        "main-300": "#130C1C",
        "overlay-20": "rgba(0,0,0,0.2)",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-400px);",
            transform: "translateX(-400px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(400px);",
            transform: "translateX(400px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(400px);",
            transform: "translateX(400px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "rotate-center": {
          "0%": {
            " -webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            " -webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            " -webkit-transform": "rotate(0)",
            transform: "rotate(0)",
            "border-radius": "9999px",
          },
          "100%": {
            " -webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
            "border-radius": "0",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "rotate-center": "rotate-center 5s linear infinite",
        "rotate-center-pause": "rotate-center-pause 0.3s linear 0s 1 backwards",
      },
    },
    screens: {
      1400: "1400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },

  plugins: [],
};
