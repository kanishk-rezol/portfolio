/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob1: {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.1)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '0.4' },
        },
        blob2: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.05)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '0.3' },
        },
        blob3: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.08)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '0.3' },
        },
      },
      animation: {
        'blob1': 'blob1 8s infinite ease-in-out',
        'blob2': 'blob2 10s infinite ease-in-out',
        'blob3': 'blob3 12s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};





// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         'rotate-y': {
//           '0%': { transform: 'rotateY(0deg)' },
//           '100%': { transform: 'rotateY(180deg)' },
//         },
//         'walk': {
//           '0%': { transform: 'translateX(-100%)' },
//           '100%': { transform: 'translateX(100%)' },
//         },
//       },
//       animation: {
//         'rotate-y-180': 'rotate-y 0.5s forwards',
//         'walk-cat': 'walk 5s linear infinite', // Walking animation
//       },
//     },
//   },
//   plugins: [],
// }
