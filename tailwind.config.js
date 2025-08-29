/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // enable class-based dark mode
  theme: {
    extend: {
      colors: {
        bggray: "#F2F3F4",
        regalblue: "#253D4E",
        bgbrown: "#7E7E7E",
        bgfruit1: "#F4F6FA",
        bgfruit2: "#FEEFEA",
        bgfruit3: "#F2FCE4",
        bgfruit4: "#FFFCEB",
        bgfruit5: "#ECFFEC",
        bgfruit6: "#FFF3EB",
        bgfruit7: "#FFF3FF",
        shopbtn: "#3BB77E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "quick-bold-700": ["Quicksand-Bold"],
        "quick-semibold-600": ["Quicksand-SemiBold"],
        "quick-medium-500": ["Quicksand-Medium"],
        "quick-regular-400": ["Quicksand-Regular"],
        "quick-light-300": ["Quicksand-Light"],
      },
      screens: {
        xs: "320px",
        xs375: "410px",
        sm: "480px",
        md: "768px",
        lg: "992px",
        lg1024: "1024px",
        xl: "1220px",
      },
    },
  },
  plugins: [],
};
