// src/components/Certifications.vue
<script setup>
import { ref } from 'vue';
import { certificates } from '@/data/certificates.js';
import PdfModal from '@/components/PdfModal.vue'; // <-- 1. Impor komponen Modal

// --- 2. State untuk mengontrol modal ---
const isModalVisible = ref(false);
const selectedPdf = ref('');

// --- 3. Fungsi untuk membuka modal ---
function openModal(pdfUrl) {
  selectedPdf.value = pdfUrl;
  isModalVisible.value = true;
}

// --- 4. Fungsi untuk menutup modal ---
function closeModal() {
  isModalVisible.value = false;
}
</script>

<template>
  <section id="sertifikasi" class="py-20 px-4 bg-brand-bg">
    <div class="container mx-auto">
      <h2 data-aos="fade-up" class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-fuchsia-700 text-center mb-12">
        Sertifikasi
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div 
          v-for="(cert, index) in certificates" 
          :key="cert.id" 
          @click="openModal(cert.pdfUrl)"
          class="group bg-brand-surface rounded-lg shadow-lg overflow-hidden aspect-video cursor-pointer"
          data-aos="zoom-in-up" 
          :data-aos-delay="index * 100"
        >
          <img 
            :src="cert.image" 
            :alt="cert.title" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          >
        </div>

      </div>
    </div>
  </section>

  <PdfModal 
    :show="isModalVisible" 
    :pdf-url="selectedPdf"
    @close="closeModal"
  />
</template>