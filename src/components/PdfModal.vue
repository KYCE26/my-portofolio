// src/components/PdfModal.vue
<script setup>
defineProps({
  show: Boolean,
  pdfUrl: String,
});
const emit = defineEmits(['close']);
</script>

<template>
  <transition name="fade">
    <div v-if="show" @click.self="emit('close')" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      
      <div class="bg-brand-surface w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl flex flex-col">
        
        <div class="flex justify-end p-2 border-b border-zinc-700">
          <button @click="emit('close')" class="text-brand-subtext hover:text-white transition-colors text-2xl">&times;</button>
        </div>

        <div class="flex-grow">
          <iframe :src="pdfUrl" class="w-full h-full border-none" title="PDF Viewer"></iframe>
        </div>

      </div>
    </div>
  </transition>
</template>

<style scoped>
/* CSS untuk transisi fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>