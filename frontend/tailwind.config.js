/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'walmart-blue': '#004c91',
        'walmart-yellow': '#ffc220',
        'walmart-gray': '#f5f5f5',
        'walmart-dark': '#1a1a1a',
        'quantum-purple': '#6366f1',
        'quantum-cyan': '#06b6d4',
        'quantum-green': '#10b981',
        'quantum-orange': '#f59e0b',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
