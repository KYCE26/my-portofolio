/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#ffffff',
        'brand-surface': '#f4f4f5',
        'brand-primary': '#ea580c',
        'brand-primary-dark': '#c2410c',
        'brand-text': '#09090b',
        'brand-subtext': '#52525b',
        'brand-focus': '#ea580c',
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
