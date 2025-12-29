<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="proyek" class="py-24 px-6 md:px-12 relative overflow-hidden bg-brand-bg">
    
    <div class="absolute inset-0 z-0 opacity-[0.03]" 
         style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 4rem 4rem;">
    </div>
    
    <div class="absolute top-1/4 -left-64 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-64 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>

    <kinesis-container class="relative z-10 max-w-7xl mx-auto">
      
      <div class="text-center mb-16 space-y-4">
        <kinesis-element :strength="10" type="depth">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-400 to-brand-primary bg-[length:200%_auto] animate-gradient">
              Featured Projects
            </span>
          </h2>
        </kinesis-element>
        <kinesis-element :strength="5" type="depth">
          <p class="text-brand-subtext max-w-2xl mx-auto text-lg">
            Beberapa hasil karya terbaik yang menggabungkan estetika dan fungsionalitas.
          </p>
        </kinesis-element>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div 
          v-for="(project, index) in data" 
          :key="project.id"
          class="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2 flex flex-col h-full"
        >
          <div class="h-56 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-60"></div>
            
            <img 
              v-if="project.image_url" 
              :src="project.image_url" 
              :alt="project.title" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            >
            <div v-else class="w-full h-full bg-zinc-800 flex flex-col items-center justify-center text-zinc-600 group-hover:bg-zinc-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
              <span class="text-sm">No Image Available</span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow relative z-20">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2 mb-6 mt-auto">
              <span 
                v-for="tag in (project.tags || [])" 
                :key="tag" 
                class="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 text-zinc-300 border border-white/5 group-hover:border-brand-primary/30 group-hover:text-brand-primary transition-colors"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-white/5">
              <a 
                v-if="project.repo_url" 
                :href="project.repo_url" 
                target="_blank" 
                class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-zinc-300 transition-colors group/btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Code
              </a>
              <a 
                v-if="project.demo_url" 
                :href="project.demo_url" 
                target="_blank" 
                class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-primary/10 hover:bg-brand-primary text-sm text-brand-primary hover:text-white border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 group/btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:translate-x-1 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>

      <div v-if="data.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Belum Ada Project</h3>
        <p class="text-zinc-500 max-w-sm">Project sedang dalam proses kurasi. Silakan kembali lagi nanti!</p>
      </div>

    </kinesis-container>
  </section>
</template>

<style scoped>
/* Re-use animasi gradient biar konsisten sama Hero */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}
</style>