/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B5E20",
        primaryLight: "#4CAF50",
        primarySoft: "#E8F5E9",
        coffee: "#5D4037",
        dark: "#1F2937",
      },
    },
  },
  plugins: [],
};
