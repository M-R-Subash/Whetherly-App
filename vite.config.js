/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#0b1220",
        card: "rgba(255,255,255,0.04)",
        accent: "#00E6FF",
        accent2: "#FF4DA6"
      }
    },
  },
  plugins: [],
}


