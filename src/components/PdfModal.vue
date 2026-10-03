<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
  show: boolean;
  pdfUrl: string;
  title?: string;
}>();

const emit = defineEmits(['close']);

const isLoading = ref(true);
const closeBtn = ref<HTMLButtonElement | null>(null);
const modalContainer = ref<HTMLElement | null>(null);

function onIframeLoad() {
  isLoading.value = false;
}

function close() {
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close();
  }
  
  // Focus trap
  if (e.key === 'Tab' && modalContainer.value) {
    const focusable = modalContainer.value.querySelectorAll(
      'a[href], button, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
}

watch(
  () => props.show,
  async (open) => {
    if (open) {
      isLoading.value = true;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeydown);
      await nextTick();
      closeBtn.value?.focus();
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeydown);
    }
  }
);

watch(
  () => props.pdfUrl,
  () => { isLoading.value = true; }
);

onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8"
    role="dialog"
    aria-modal="true"
    :aria-label="title || 'Dokumen Sertifikat'"
    ref="modalContainer"
  >
    <div 
      @click="close" 
      class="absolute inset-0 bg-brand-text/90"
    ></div>
    
    <div 
      class="relative w-full h-full md:max-w-5xl md:h-[85vh] bg-brand-bg border border-brand-surface flex flex-col"
    >
      <div class="flex items-center justify-between px-4 md:px-6 py-4 border-b border-brand-surface bg-brand-bg shrink-0">
        <h3 class="font-serif text-lg font-bold text-brand-text truncate">
          {{ title || 'Dokumen' }}
        </h3>

        <button 
          ref="closeBtn"
          @click="close" 
          class="font-mono text-sm tracking-widest uppercase font-bold text-brand-text px-4 py-2 hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus shrink-0 ml-4 border border-transparent hover:border-brand-text min-h-[44px]"
        >
          Close
        </button>
      </div>

      <div class="flex-grow bg-brand-surface relative w-full h-full overflow-hidden">
        <div v-if="isLoading" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-brand-bg">
          <p class="font-mono text-sm tracking-widest uppercase text-brand-text">Loading...</p>
        </div>

        <iframe 
          :src="pdfUrl" 
          class="w-full h-full border-none"
          type="application/pdf"
          @load="onIframeLoad"
        ></iframe>
      </div>
    </div>
  </div>
</template>
