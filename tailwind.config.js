/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#18181b',      // Zinc 900 -> Latar belakang utama
        'brand-surface': '#27272a', // Zinc 800 -> Latar belakang kartu/seksi
        'brand-primary': '#d946ef', // Fuchsia 500 -> Aksen utama (link, tombol)
        'brand-primary-dark': '#c026d3', // Fuchsia 600 -> Saat hover (Saya rename agar lebih konsisten)
        'brand-text': '#f4f4f5',      // Zinc 100 -> Teks utama (putih pudar)
        'brand-subtext': '#a1a1aa',   // Zinc 400 -> Teks deskripsi
      },
      // Kita bisa tambahkan font kustom di sini nanti jika mau
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      // },
    },
  },
  plugins: [
    // PLUGIN WAJIB!
    // Ini diperlukan untuk kelas 'line-clamp-3' di ProjectCard.vue
    require('@tailwindcss/line-clamp'),
  ],
}