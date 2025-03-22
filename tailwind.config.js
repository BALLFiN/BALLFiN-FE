/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeftFade: {
          "0%": {
            transform: "translateX(-30px) scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0) scale(1)",
            opacity: "1",
          },
        },
        slideRightFade: {
          "0%": {
            transform: "translateX(30px) scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0) scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        slideLeftFade:
          "slideLeftFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideRightFade:
          "slideRightFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
