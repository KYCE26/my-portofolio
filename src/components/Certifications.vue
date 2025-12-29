<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="certifications" class="py-20 px-6 md:px-12 bg-black/20">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-white" data-aos="fade-up">
        Certifications
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(cert, index) in data" 
          :key="cert.id"
          class="bg-brand-surface p-4 rounded-xl border border-zinc-800 hover:border-brand-primary/40 transition-all hover:-translate-y-1 group"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
        >
          <div class="aspect-video rounded-lg bg-zinc-800 mb-4 overflow-hidden relative">
             <img 
              v-if="cert.image_url" 
              :src="cert.image_url" 
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            >
            <div v-else class="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
              No Preview
            </div>
          </div>

          <h3 class="font-bold text-white text-lg leading-tight mb-1">{{ cert.title }}</h3>
          <p class="text-brand-primary text-sm mb-3">{{ cert.issuer }}</p>
          
          <a 
            v-if="cert.pdf_url" 
            :href="cert.pdf_url" 
            target="_blank"
            class="text-xs text-zinc-400 hover:text-white flex items-center gap-1 border-t border-zinc-800 pt-3 mt-auto"
          >
            Lihat Kredensial ↗
          </a>
        </div>
      </div>
    </div>
  </section>
</template>