/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#fcfcfc',
        'brand-surface': '#f4f4f5',
        'brand-primary': '#b8152e',
        'brand-primary-dark': '#9f1228',
        'brand-text': '#18181b',
        'brand-subtext': '#52525b',
        'brand-focus': '#1d4ed8',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      spacing: {
        'hero-projects': 'clamp(4rem, 8vw, 10rem)',
        'projects-pubs': 'clamp(3rem, 6vw, 7.5rem)',
        'pubs-cert': 'clamp(4rem, 10vw, 9rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
