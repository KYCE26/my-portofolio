// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueKinesis from 'vue-kinesis'

// --- 1. Impor v-wave ---
import VWave from 'v-wave'

const app = createApp(App)

app.use(VueKinesis)

// --- 2. Daftarkan v-wave dengan konfigurasi warna tema kita ---
app.use(VWave, {
  color: '#d946ef', // Ini adalah hex code untuk brand-primary (Fuchsia 500)
  easing: 'ease-out',
  duration: 0.5,
  initialOpacity: 0.3,
})
// ------------------------------------------------------------

app.mount('#app')

AOS.init({
  duration: 800,
  once: true,
});