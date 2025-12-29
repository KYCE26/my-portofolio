<script setup>
// Menerima props title untuk ditampilkan di header modal
defineProps({
  show: Boolean,
  pdfUrl: String,
  title: {
    type: String,
    default: 'Dokumen Sertifikat' // Judul default jika tidak ada
  },
});

const emit = defineEmits(['close']);
</script>

<template>
  <transition name="modal">
    <div 
      v-if="show" 
      @click.self="emit('close')" 
      class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-all duration-300"
    >
      
      <div class="bg-brand-surface w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl shadow-brand-primary/10 border border-brand-primary/20 flex flex-col overflow-hidden modal-container">
        
        <div class="flex justify-between items-center p-4 border-b border-brand-primary/10 bg-brand-bg/50">
          
          <h3 class="text-lg font-bold text-brand-text line-clamp-1 pr-4" :title="title">
            {{ title }}
          </h3>

          <button 
            @click="emit('close')" 
            class="group p-2 bg-brand-bg hover:bg-red-500/20 rounded-full transition-all duration-300 flex items-center justify-center"
            aria-label="Tutup Modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-subtext group-hover:text-red-500 transition-colors"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="flex-grow bg-zinc-900 relative">
          <div class="absolute inset-0 flex items-center justify-center text-brand-primary/20 pointer-events-none">
              <svg class="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          </div>
          
          <iframe 
            :src="pdfUrl" 
            class="w-full h-full border-none relative z-10" 
            :title="title"
          ></iframe>
        </div>

      </div>
    </div>
  </transition>
</template>

<style scoped>
/* CSS Transition Kustom untuk efek "Pop-up" (Zoom + Fade) 
*/

/* State Awal & Akhir Transisi */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

/* State Sebelum Masuk & Setelah Keluar */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Khusus untuk containernya, kita tambahkan efek scale */
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95); /* Mulai dari sedikit lebih kecil */
  opacity: 0;
}

/* State Saat Diam (Sudah masuk) */
.modal-enter-to .modal-container,
.modal-leave-from .modal-container {
  transform: scale(1); /* Ukuran normal */
  opacity: 1;
}
</style>