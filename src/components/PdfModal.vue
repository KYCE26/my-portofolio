<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  show: boolean;
  pdfUrl: string;
  title?: string;
}>();

const emit = defineEmits(['close']);

const isLoading = ref(true);
const closeBtn = ref<HTMLButtonElement | null>(null);
let lastFocusedEl: HTMLElement | null = null;

function onIframeLoad() {
  isLoading.value = false;
}

function close() {
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

watch(
  () => props.show,
  async (open) => {
    if (open) {
      // Setiap kali modal dibuka (termasuk buka sertifikat lain), reset loading state
      isLoading.value = true;
      lastFocusedEl = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeydown);
      // Pindahkan fokus ke tombol close biar keyboard user langsung bisa navigasi/menutup
      requestAnimationFrame(() => closeBtn.value?.focus());
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeydown);
      // Kembalikan fokus ke elemen yang tadi memicu modal (misal tombol "Lihat Sertifikat")
      lastFocusedEl?.focus();
    }
  }
);

// Reset loading kalau URL PDF-nya berganti sementara modal tetap terbuka
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
  <transition name="modal">
    <div 
      v-if="show" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'Dokumen Sertifikat'"
    >
      <div 
        @click="close" 
        class="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>
      
      <div 
        class="relative w-full max-w-5xl h-[85vh] bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden modal-container ring-1 ring-brand-primary/20"
      >
        
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-xl">
          <h3 class="text-lg font-bold text-white line-clamp-1 flex items-center gap-2">
            <span class="i-mdi-file-document-outline text-brand-primary"></span>
            {{ title || 'Dokumen Sertifikat' }}
          </h3>

          <button 
            ref="closeBtn"
            @click="close" 
            aria-label="Tutup"
            class="close-btn group p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:rotate-90"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="flex-grow bg-zinc-950 relative w-full h-full">
            <!-- Indikator loading selagi PDF sedang dimuat -->
            <Transition name="fade">
              <div v-if="isLoading" class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-950">
                <div class="w-10 h-10 border-2 border-zinc-700 border-t-brand-primary rounded-full animate-spin"></div>
                <p class="text-zinc-500 text-sm">Memuat dokumen...</p>
              </div>
            </Transition>

            <iframe 
            :src="pdfUrl" 
            class="w-full h-full border-none"
            type="application/pdf"
            @load="onIframeLoad"
            ></iframe>
        </div>

      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Animasi Pop-up yang Smooth */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.close-btn:active {
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s ease;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: none;
  }
  .close-btn svg {
    transition: none;
  }
}
</style>