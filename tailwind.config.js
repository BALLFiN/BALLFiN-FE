/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
        shrikhand: ["Shrikhand", "serif"],
      },
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
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pageEnter: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideLeftFade:
          "slideLeftFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideRightFade: "slideRightFade 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        pageEnter: "pageEnter 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
