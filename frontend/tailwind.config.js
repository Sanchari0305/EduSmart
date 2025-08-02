/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ required for manual toggle
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};



