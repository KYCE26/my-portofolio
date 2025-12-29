<script setup lang="ts">
// Menggunakan TypeScript setup
import { publications } from '@/data/publications.js';

// Kita asumsikan struktur data publication seperti ini (berdasarkan kode lamamu):
// interface Publication {
//   id: number;
//   type: 'Buku' | 'Artikel' | string;
//   title: string;
//   description: string;
//   link: string;
// }
</script>

<template>
  <section id="publikasi" class="py-24 px-4 bg-brand-surface relative overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.03]" 
         style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 3rem 3rem;">
    </div>

    <div class="container mx-auto relative z-10">
      
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-500 to-brand-primary bg-[length:200%_auto] animate-gradient inline-block">
          Jejak Publikasi & Karya Tulis
        </h2>
        <p class="text-brand-subtext mt-4 max-w-2xl mx-auto">
          Berbagi pengetahuan dan temuan melalui berbagai bentuk tulisan, dari artikel teknis hingga kontribusi buku.
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto relative">
        <div class="absolute left-0 md:left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-brand-primary/50 via-fuchsia-500/30 to-transparent"></div>

        <div class="space-y-12">
          <div 
            v-for="(pub, index) in publications" 
            :key="pub.id" 
            class="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start group"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            
            <div class="absolute left-0 md:left-8 -translate-x-1/2 mt-1.5 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-primary group-hover:bg-brand-primary group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>

            <div class="ml-6 md:ml-16 flex-grow bg-brand-bg border border-brand-primary/10 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl hover:shadow-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 relative overflow-hidden">
              
              <div class="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-all duration-500"></div>

              <div class="relative z-10">
                <div class="flex items-start justify-between mb-4 gap-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl">
                      <svg v-if="pub.type === 'Buku'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                      <h3 class="text-xl md:text-2xl font-bold text-brand-text group-hover:text-brand-primary transition-colors duration-300">
                        {{ pub.title }}
                      </h3>
                      <span class="inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-subtext border border-brand-primary/20">
                        {{ pub.type }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p class="text-brand-subtext text-base leading-relaxed mb-6">
                  {{ pub.description }}
                </p>
                
                <a 
                  :href="pub.link" 
                  target="_blank" 
                  class="inline-flex items-center gap-2 text-brand-primary font-semibold group/link hover:text-fuchsia-400 transition-colors duration-300"
                >
                  Baca Selengkapnya
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover/link:translate-x-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animasi untuk judul gradient agar sama dengan Hero */
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