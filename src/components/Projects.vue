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

    <kinesis-container class="absolute inset-0 w-full h-full pointer-events-none z-0">
       <kinesis-element :strength="20" type="depth" class="absolute top-1/4 -left-64">
          <div class="w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]"></div>
       </kinesis-element>
       <kinesis-element :strength="20" type="depth" class="absolute bottom-1/4 -right-64">
          <div class="w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px]"></div>
       </kinesis-element>
    </kinesis-container>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-white" data-aos="fade-up">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-400 to-brand-primary bg-[length:200%_auto] animate-gradient">
            Featured Projects
          </span>
        </h2>
        <p class="text-brand-subtext max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-delay="100">
          Showcase aplikasi dan eksperimen koding pilihan (Open Source).
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        
        <div 
          v-for="(project, index) in data" 
          :key="project.id"
          class="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2 flex flex-col h-full will-change-transform"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="h-9 bg-zinc-800/80 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md z-20">
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            <div class="ml-4 h-5 rounded bg-black/20 w-2/3 flex items-center px-2">
              <span class="text-[9px] text-zinc-500 font-mono truncate opacity-70">
                repo/{{ project.title.toLowerCase().replace(/ /g, '-') }}
              </span>
            </div>
          </div>

          <div class="aspect-video w-full overflow-hidden relative bg-zinc-950 border-b border-white/5">
            
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
            
            <img 
              v-if="project.image_url" 
              :src="project.image_url" 
              :alt="project.title" 
              loading="lazy"
              class="w-full h-full object-cover object-top transition-[object-position] duration-[3000ms] ease-in-out group-hover:object-bottom"
            >
            
            <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900">
              <span class="text-[10px] uppercase tracking-widest opacity-50 font-bold">Preview Unavailable</span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow relative z-20 bg-zinc-900/20">
            <div class="mb-4">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors duration-300 line-clamp-1">
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
                class="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 group-hover:border-brand-primary/30 group-hover:text-brand-primary transition-colors"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-white/5">
              <a 
                v-if="project.repo_url" 
                :href="project.repo_url" 
                target="_blank" 
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800/50 hover:bg-white/10 text-sm text-zinc-300 transition-colors group/btn border border-white/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Code
              </a>
              <a 
                v-if="project.demo_url" 
                :href="project.demo_url" 
                target="_blank" 
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-sm text-white font-bold transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 group/btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:translate-x-1 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>

      <div v-if="data.length === 0" class="flex flex-col items-center justify-center py-20 text-center mb-20">
        <div class="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Loading Projects...</h3>
        <p class="text-zinc-500 max-w-sm">Mohon tunggu sebentar...</p>
      </div>


      <div class="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-900/10 to-purple-900/10 p-8 md:p-12 shadow-2xl group" data-aos="fade-up">
          
          <div class="absolute inset-0 bg-zinc-900/90 backdrop-blur-md z-0"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-brand-primary/10 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            
            <div class="shrink-0 w-24 h-24 rounded-2xl bg-zinc-900 border border-amber-500/20 flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
              <span class="text-5xl drop-shadow-lg">🤫</span>
            </div>

            <div class="flex-grow space-y-4">
              <h3 class="text-2xl md:text-3xl font-bold text-white">
                Tentang Proyek <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Private & Enterprise</span>
              </h3>
              
              <p class="text-zinc-300 text-lg leading-relaxed max-w-3xl">
                Di luar repositori publik ini, saya mengerjakan banyak <strong>proyek berskala besar yang bersifat privat</strong> (komersial atau dalam pengembangan). Proyek-proyek ini melibatkan arsitektur yang kompleks, UI/UX tingkat lanjut, dan integrasi backend yang mendalam.
              </p>

              <div class="pt-2 flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                 <p class="text-sm text-amber-400/80 italic font-medium">
                    ✨ Tertarik melihat demo karya terbaik saya?
                 </p>
                 <a href="#kontak" v-wave class="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 flex items-center gap-2 group/btn">
                    Hubungi Saya
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                 </a>
              </div>
            </div>

          </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}

/* Memastikan GPU Hardware Acceleration aktif untuk scroll mulus */
.will-change-transform {
  will-change: transform;
}
</style>