<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  show: boolean;
  pdfUrl: string;
  title?: string;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <transition name="modal">
    <div 
      v-if="show" 
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        @click="emit('close')" 
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
            @click="emit('close')" 
            class="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="flex-grow bg-zinc-950 relative w-full h-full">
            <iframe 
            :src="pdfUrl" 
            class="w-full h-full border-none"
            type="application/pdf"
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
</style>