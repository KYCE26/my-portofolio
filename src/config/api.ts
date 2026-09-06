import axios from 'axios';

// Ganti URL Railway jadi path relatif (slash api)
const API_URL = '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    // Kita set default header buat multipart nanti di komponen aja
  }
});

// Helper biar gampang panggil endpoint gambar (Supabase biarin aja, ini udah bener)
export const STORAGE_URL = 'https://qiouupklvkgrlxlkevns.supabase.co/storage/v1/object/public/portfolio-assets';