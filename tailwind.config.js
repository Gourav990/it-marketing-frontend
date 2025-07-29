/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
     boxShadow: {
        xl: '0 10px 20px rgba(0, 0, 0, 0.15)',
      },
    colors: {
      primary: '#7C3AED', // violet
      accent: '#00D8C0',  // teal
    },
   animation: {
    'pulse-slow': 'pulse 6s ease-in-out infinite',
     blob: "blob 8s infinite",
    float: "float 6s ease-in-out infinite",
     fadeIn: 'fadeIn 0.3s ease-out',
      slideDown: 'slideDown 0.3s ease-in-out',
  },
   keyframes: {
     fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
       float: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-20px)" },
    },
     slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
      blob: {
        '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
        '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
      },
    },
  },
},
  plugins: [require("daisyui",'@tailwindcss/line-clamp')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "business", "synthwave"],
  },
}
