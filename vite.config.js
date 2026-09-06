import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Impor modul 'path' dari Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/', //
  // Tambahkan blok 'resolve' di bawah ini
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})