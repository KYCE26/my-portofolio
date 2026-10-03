<script setup lang="ts">
import { defineProps, ref, nextTick } from 'vue';
import PdfModal from './PdfModal.vue';

const props = defineProps<{
  data: any[]
}>();

const showModal = ref(false);
const activePdf = ref('');
const activeTitle = ref('');
const triggerBtn = ref<HTMLElement | null>(null);

const openCertificate = async (url: string, title: string, event: MouseEvent) => {
  activePdf.value = url;
  activeTitle.value = title;
  triggerBtn.value = event.currentTarget as HTMLElement;
  showModal.value = true;
};

const handleCloseModal = async () => {
  showModal.value = false;
  await nextTick();
  if (triggerBtn.value) {
    triggerBtn.value.focus();
  }
};
</script>

<template>
  <section id="sertifikat" class="py-24 px-6 md:px-8 border-t border-brand-surface bg-brand-bg">
    <div class="max-w-6xl mx-auto">
      
      <div class="mb-16">
        <h2 class="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-text mb-4 uppercase">
          Certifications
        </h2>
        <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">
          Lisensi & Penghargaan
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="cert in data" 
          :key="cert.id"
          class="group flex flex-col border border-brand-surface hover:border-brand-text transition-colors duration-0 bg-white"
        >
          <!-- Image Preview -->
          <div 
            class="aspect-[4/3] w-full overflow-hidden border-b border-brand-surface relative cursor-pointer bg-brand-surface"
            @click="cert.pdf_url ? openCertificate(cert.pdf_url, cert.title, $event) : null"
            role="button"
            :tabindex="cert.pdf_url ? 0 : -1"
            @keydown.enter="cert.pdf_url ? openCertificate(cert.pdf_url, cert.title, $event) : null"
          >
            <img 
              :src="cert.image_url || cert.image" 
              :alt="cert.title" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
            <!-- Overlay to indicate it's clickable -->
            <div v-if="cert.pdf_url" class="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/20 transition-colors flex items-center justify-center">
              <span class="opacity-0 group-hover:opacity-100 bg-brand-text text-brand-bg text-xs font-bold py-2 px-4 uppercase tracking-widest transition-opacity border border-brand-bg">
                Buka PDF
              </span>
            </div>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <div class="font-mono text-xs text-brand-subtext uppercase mb-3 tracking-wider">
              {{ cert.issuer || 'Sertifikasi' }}
            </div>
            
            <h3 class="font-serif text-xl font-bold text-brand-text leading-tight mb-6">
              {{ cert.title }}
            </h3>
            
            <div class="mt-auto pt-4 border-t border-brand-surface flex justify-between items-center">
              <button 
                v-if="cert.pdf_url" 
                @click="openCertificate(cert.pdf_url, cert.title, $event)"
                class="text-xs font-bold text-brand-text uppercase tracking-widest hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-focus"
                :aria-label="`Lihat PDF sertifikat ${cert.title}`"
              >
                LIHAT PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="data.length === 0" class="py-20 border border-brand-text text-center mt-4 bg-brand-surface">
        <p class="font-mono text-sm tracking-widest text-brand-text uppercase">Loading Certifications...</p>
      </div>

    </div>

    <!-- PDF Modal -->
    <PdfModal 
      :show="showModal" 
      :pdfUrl="activePdf" 
      :title="activeTitle" 
      @close="handleCloseModal" 
    />
  </section>
</template>
