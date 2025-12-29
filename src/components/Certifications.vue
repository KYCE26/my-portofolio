<script setup lang="ts">
import { defineProps, ref } from 'vue';
import PdfModal from './PdfModal.vue'; // 1. Import Modal

const props = defineProps<{
  data: any[]
}>();

// 2. State untuk Modal
const showModal = ref(false);
const activePdf = ref('');
const activeTitle = ref('');

// 3. Fungsi Buka Modal
const openCertificate = (url: string, title: string) => {
  activePdf.value = url;
  activeTitle.value = title;
  showModal.value = true;
};
</script>

<template>
  <section id="sertifikat" class="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
    
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
        <div>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-2">
            Professional <span class="text-brand-primary">Certifications</span>
          </h2>
          <p class="text-zinc-400">Bukti kompetensi dan dedikasi dalam pembelajaran berkelanjutan.</p>
        </div>
        <div class="h-px bg-zinc-800 flex-grow md:ml-8 self-center"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          v-for="(cert, index) in data" 
          :key="cert.id"
          class="group relative bg-zinc-900 border border-zinc-800 hover:border-brand-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
            <div class="absolute inset-0 bg-brand-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <img 
              v-if="cert.image_url" 
              :src="cert.image_url" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              alt="Thumbnail"
            >
            <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
              <span class="text-xs">No Preview</span>
            </div>

            <button 
              v-if="cert.pdf_url" 
              @click="openCertificate(cert.pdf_url, cert.title)"
              class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px] cursor-pointer"
            >
              <span class="px-4 py-2 bg-brand-primary hover:bg-brand-primary-light text-white rounded-full text-sm font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-brand-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Lihat Sertifikat
              </span>
            </button>
          </div>

          <div class="p-5">
            <p class="text-xs font-bold tracking-wider text-brand-primary uppercase mb-1">
              {{ cert.issuer }}
            </p>
            <h3 class="text-lg font-bold text-white leading-tight group-hover:text-brand-primary-light transition-colors">
              {{ cert.title }}
            </h3>
          </div>

        </div>
      </div>

      <div v-if="data.length === 0" class="py-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/50">
        <p class="text-zinc-500">Belum ada sertifikat yang ditampilkan.</p>
      </div>

    </div>

    <PdfModal 
      :show="showModal" 
      :pdfUrl="activePdf" 
      :title="activeTitle" 
      @close="showModal = false" 
    />

  </section>
</template>