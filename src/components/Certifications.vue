<script setup lang="ts">
// Menggunakan script setup lang="ts"
import { ref } from 'vue';
import { certificates } from '@/data/certificates.js';
import PdfModal from '@/components/PdfModal.vue';

// Kita bisa definisikan interface untuk data sertifikat jika mau
// interface Certificate { id: number; title: string; image: string; pdfUrl: string; }

// --- State untuk mengontrol modal ---
const isModalVisible = ref(false);
const selectedPdf = ref('');
const selectedTitle = ref(''); // Tambahan untuk judul di modal

// --- Fungsi untuk membuka modal ---
function openModal(pdfUrl: string, title: string) {
  selectedPdf.value = pdfUrl;
  selectedTitle.value = title; // Simpan judul untuk aksesibilitas modal
  isModalVisible.value = true;
  // Tambahkan class ke body agar tidak bisa di-scroll di belakang modal
  document.body.classList.add('overflow-hidden');
}

// --- Fungsi untuk menutup modal ---
function closeModal() {
  isModalVisible.value = false;
  // Hapus class dari body
  document.body.classList.remove('overflow-hidden');
}
</script>

<template>
  <section id="sertifikasi" class="py-24 px-4 bg-brand-bg relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.02]" 
         style="background-image: radial-gradient(circle at center, #ffffff 1px, transparent 1px); background-size: 24px 24px;">
    </div>

    <div class="container mx-auto relative z-10">
      
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-500 to-brand-primary bg-[length:200%_auto] animate-gradient inline-block">
          Lisensi & Sertifikasi
        </h2>
        <p class="text-brand-subtext mt-4 max-w-2xl mx-auto">
          Bukti komitmen terhadap pembelajaran berkelanjutan dan penguasaan teknologi terkini.
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div 
          v-for="(cert, index) in certificates" 
          :key="cert.id" 
          @click="openModal(cert.pdfUrl, cert.title)"
          class="group relative bg-brand-surface rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brand-primary/20 border border-brand-primary/10 hover:border-brand-primary/40 cursor-pointer aspect-[4/3] transition-all duration-300"
          data-aos="fade-up" 
          :data-aos-delay="index * 100"
          :title="cert.title" 
        >
          
          <img 
            :src="cert.image" 
            :alt="cert.title" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          >
          
          <div class="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4 translate-y-4 group-hover:translate-y-0">
            <div class="text-white text-center">
              <div class="bg-brand-primary/80 p-3 rounded-full inline-flex mb-2 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <p class="font-semibold text-sm md:text-base">Lihat Detail</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <PdfModal 
    :show="isModalVisible" 
    :pdf-url="selectedPdf"
    :title="selectedTitle"
    @close="closeModal"
  />
</template>

<style scoped>
/* Animasi gradient judul */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}
</style>