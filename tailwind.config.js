/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Macondo"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        gold: {
          glow: '#f5d77c',
          deep: '#c89b3a',
        },
        magic: {
          green: '#7be07b',
          violet: '#b48cff',
          rose: '#ff9fc8',
          cyan: '#7fe6ee',
        },
      },
      animation: {
        breathe: 'breathe 5s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.005)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
