import axios from 'axios';

const API_URL = 'https://api-portfolio.kyce.my.id/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    // Kita set default header buat multipart nanti di komponen aja
  }
});

export const STORAGE_URL = 'https://qiouupklvkgrlxlkevns.supabase.co/storage/v1/object/public/portfolio-assets';