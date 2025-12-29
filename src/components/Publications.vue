<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();

// Helper untuk format tanggal biar cantik (Ex: 29 Dec 2025)
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};
</script>

<template>
  <section id="tulisan" class="py-24 px-6 md:px-12 relative overflow-hidden bg-brand-bg">
    
    <div class="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-cyan-500/50 to-transparent"></div>

    <div class="max-w-5xl mx-auto relative z-10">
      
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          <span class="text-white">Publications</span> 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-brand-primary"> & Writings</span>
        </h2>
        <p class="text-zinc-400 max-w-2xl mx-auto">
          Berbagi pengetahuan dan pemikiran melalui tulisan, artikel, dan dokumentasi teknis.
        </p>
      </div>

      <div class="space-y-6">
        
        <div 
          v-for="(pub, index) in data" 
          :key="pub.id"
          class="group relative p-[1px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 group-hover:from-cyan-500/50 group-hover:via-brand-primary/50 group-hover:to-cyan-500/50 transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
          
          <div class="relative bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start h-full">
            
            <div class="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-zinc-800 border border-zinc-700 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors">
              <svg v-if="pub.type === 'Buku'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-cyan-400 transition-colors"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-400 group-hover:text-brand-primary transition-colors"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            </div>

            <div class="flex-grow">
              <div class="flex items-center gap-3 mb-2">
                <span 
                  class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors"
                  :class="pub.type === 'Buku' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20'"
                >
                  {{ pub.type }}
                </span>
                <span class="text-zinc-500 text-xs flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {{ formatDate(pub.created_at) }}
                </span>
              </div>

              <h3 class="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {{ pub.title }}
              </h3>
              
              <p class="text-zinc-400 text-sm leading-relaxed mb-4">
                {{ pub.description }}
              </p>

              <a 
                v-if="pub.link" 
                :href="pub.link" 
                target="_blank" 
                class="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-cyan-400 transition-colors group/link"
              >
                Baca Selengkapnya
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>

            <div class="hidden md:flex shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 text-zinc-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </div>

          </div>
        </div>

      </div>

      <div v-if="data.length === 0" class="text-center py-20">
        <div class="inline-block p-4 rounded-full bg-zinc-800/50 mb-4 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-600"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </div>
        <p class="text-zinc-500">Belum ada publikasi yang ditampilkan.</p>
      </div>

    </div>
  </section>
</template>