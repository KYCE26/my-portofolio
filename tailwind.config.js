/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#FAFAFA',
        'brand-surface': '#F4F4F5',
        'brand-border': '#E4E4E7',
        'brand-primary': '#059669',
        'brand-primary-dark': '#047857',
        'brand-text': '#09090B',
        'brand-subtext': '#52525B',
        'brand-focus': '#059669',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      spacing: {
        'hero-projects': 'clamp(5rem, 10vw, 12rem)',
        'projects-pubs': 'clamp(4rem, 8vw, 10rem)',
        'pubs-cert': 'clamp(4rem, 8vw, 10rem)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
