import axios from 'axios';

// Ganti URL ini dengan URL Railway kamu yang asli
const API_URL = 'https://rifky-portfolio-api-production.up.railway.app/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    // Kita set default header buat multipart nanti di komponen aja
  }
});

// Helper biar gampang panggil endpoint gambar
export const STORAGE_URL = 'https://qiouupklvkgrlxlkevns.supabase.co/storage/v1/object/public/portfolio-assets';