/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: "#003366",
          DEFAULT: "#001f3f",
          dark: "#001428",
        },
        yellow: {
          light: "#FFEB3B",
          DEFAULT: "#FFD700",
          dark: "#FFC107",
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        'lg-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;
