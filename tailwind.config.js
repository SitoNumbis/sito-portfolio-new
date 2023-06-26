/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#2499ff",
      secondary: "#ff5353",
      "main-background": "#1b1b1b",
      "secondary-background": "#222",
      "opacity-secondary-background": "#222222ee",
    },
  },
  plugins: [],
};
