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
    <div class="max-w-4xl mx-auto">
      
      <div class="mb-16">
        <h2 class="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-text mb-4 uppercase">
          Certifications
        </h2>
        <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">
          Lisensi & Penghargaan
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="cert in data" 
          :key="cert.id"
          class="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 py-4 border-b border-brand-surface hover:border-brand-text transition-colors duration-0"
        >
          <div class="font-mono text-sm text-brand-subtext shrink-0 md:w-48 uppercase">
            {{ cert.issuer }}
          </div>
          
          <div class="font-serif text-lg md:text-xl font-bold text-brand-text flex-grow">
            {{ cert.title }}
          </div>

          <button 
            v-if="cert.pdf_url" 
            @click="openCertificate(cert.pdf_url, cert.title, $event)"
            class="text-sm font-bold text-brand-text underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-brand-text transition-all duration-0 ml-0 md:ml-4 text-left focus-visible:outline-2 focus-visible:outline-brand-focus"
            :aria-label="`Lihat sertifikat ${cert.title}`"
          >
            LIHAT PDF
          </button>
        </div>
      </div>

      <div v-if="data.length === 0" class="py-20 border border-brand-text text-center mt-4">
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
