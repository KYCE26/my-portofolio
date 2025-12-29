<script setup lang="ts">
// 1. IMPOR KOMPONEN IKON DARI LUCIDE
import { Github, ExternalLink } from 'lucide-vue-next';

// Definisikan props dengan TypeScript untuk type safety
defineProps<{
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    repoUrl: string;
    demoUrl?: string; // Demo URL opsional, jika ada
    tags: string[];
  }
}>();
</script>

<template>
  <div 
    v-wave 
    class="bg-brand-surface border border-brand-primary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-brand-primary/30 hover:border-brand-primary/50 transition-all duration-300 flex flex-col group h-full"
  >
    
    <div class="relative aspect-video bg-brand-bg/50 overflow-hidden">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-brand-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <div class="p-6 flex flex-col flex-grow border-t border-brand-primary/10">
      
      <h3 class="text-xl font-bold text-brand-text group-hover:text-brand-primary transition-colors duration-300 mb-3 line-clamp-1" :title="project.title">
        {{ project.title }}
      </h3>
      
      <p class="text-brand-subtext text-sm mb-5 flex-grow line-clamp-3" :title="project.description">
        {{ project.description }}
      </p>
      
      <div class="flex flex-wrap gap-2 mb-6">
        <span 
          v-for="tag in project.tags" 
          :key="tag" 
          class="bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1.5 rounded-lg border border-brand-primary/20"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex items-center gap-3 mt-auto">
        <a 
          :href="project.repoUrl" 
          target="_blank" 
          class="flex-1 inline-flex items-center justify-center gap-2 bg-brand-bg hover:bg-brand-primary text-brand-text hover:text-white text-sm font-semibold py-2.5 px-4 rounded-xl border border-brand-surface transition-all duration-300 group/btn"
        >
          <Github :size="18" class="transition-transform group-hover/btn:-translate-y-0.5" />
          Code
        </a>
        
        <a 
          v-if="project.demoUrl"
          :href="project.demoUrl" 
          target="_blank" 
          class="flex-1 inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 group/btn shadow-sm hover:shadow-brand-primary/30"
        >
          <ExternalLink :size="18" class="transition-transform group-hover/btn:translate-x-0.5" />
          Live Demo
        </a>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* Tidak ada CSS kustom yang diperlukan */
</style>