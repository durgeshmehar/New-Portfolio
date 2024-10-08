/** @type {import('tailwindcss').Config} */
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151430",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      borderWidth: {
        '0.5': '0.1px',
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      keyframes: {
        moveLeft: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10px)' },
        },
        moveRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        moveLeft: 'moveLeft 2s ease-in-out infinite',
        moveRight: 'moveRight 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ addUtilities }) {
      addUtilities({
        '.border-gradient': {
          borderImage: 'linear-gradient(90.13deg, #0084ff 1.9%, #ff61a6 97.5%) 1',
        },
      });
    },
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}



