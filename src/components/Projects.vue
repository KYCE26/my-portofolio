<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="proyek" class="py-24 md:py-32 px-6 md:px-12 border-t border-brand-border bg-brand-bg">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="max-w-2xl">
          <p class="font-mono text-xs font-bold tracking-[0.2em] text-brand-primary uppercase mb-6 flex items-center gap-4">
            <span class="h-px w-8 bg-brand-primary"></span>
            Eksperimen & Karya
          </p>
          <h2 class="font-serif text-4xl md:text-6xl font-bold tracking-tight text-brand-text uppercase leading-none">
            Proyek Terpilih.
          </h2>
        </div>
      </div>

      <div class="space-y-32 mb-32">
        
        <div 
          v-for="(project, index) in data" 
          :key="project.id"
          class="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center"
          :class="index % 2 !== 0 ? 'lg:flex-row-reverse' : ''"
        >
          <!-- Gambar (Large & Dominant) -->
          <div class="w-full lg:w-3/5 group">
            <div class="aspect-video w-full overflow-hidden bg-brand-surface border border-brand-border relative">
              <img 
                :src="project.image_url" 
                :alt="project.title" 
                class="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-editorial"
                loading="lazy"
              />
              <div class="absolute inset-0 border border-brand-border/20 z-10 pointer-events-none"></div>
            </div>
          </div>

          <!-- Konten (Typographic focus) -->
          <div class="w-full lg:w-2/5 flex flex-col justify-center">
            <div class="font-mono text-xs text-brand-subtext tracking-widest mb-4">
              0{{ index + 1 }} &mdash; {{ new Date(project.created_at || Date.now()).getFullYear() }}
            </div>
            
            <h3 class="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6 text-balance leading-tight">
              {{ project.title }}
            </h3>
            
            <p class="text-brand-subtext text-lg font-light leading-relaxed mb-8">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-10">
              <span 
                v-for="tech in project.stack" 
                :key="tech"
                class="font-mono text-[10px] bg-brand-surface border border-brand-border px-3 py-1.5 text-brand-text uppercase tracking-widest"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex flex-wrap gap-4 mt-auto">
              <a 
                v-if="project.repo_url" 
                :href="project.repo_url" 
                target="_blank" 
                class="inline-flex items-center gap-2 border border-brand-border hover:border-brand-text text-brand-text font-bold py-3 px-6 text-xs uppercase tracking-widest transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-brand-focus"
              >
                Code
              </a>
              <a 
                v-if="project.demo_url" 
                :href="project.demo_url" 
                target="_blank" 
                class="inline-flex items-center gap-2 bg-brand-text text-brand-bg font-bold py-3 px-6 text-xs uppercase tracking-widest hover:bg-brand-primary transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-brand-focus"
              >
                Live Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div v-if="data.length === 0" class="py-32 border border-brand-border text-center bg-brand-surface">
        <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">Loading Projects...</p>
      </div>

      <!-- Private Enterprise Section -->
      <div class="relative overflow-hidden border border-brand-border bg-brand-text text-brand-bg p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center justify-between mt-32 group">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        
        <div class="max-w-2xl space-y-6 relative z-10 text-center md:text-left">
          <h3 class="font-serif text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Private & Enterprise Projects
          </h3>
          <p class="text-brand-bg/80 text-lg font-light leading-relaxed text-balance">
            Di luar repositori publik ini, saya mengerjakan proyek berskala besar yang bersifat privat. Melibatkan arsitektur kompleks, UI/UX tingkat lanjut, dan integrasi backend yang mendalam.
          </p>
        </div>
        
        <div class="shrink-0 relative z-10">
          <a
            href="#kontak"
            class="block bg-brand-bg text-brand-text font-bold py-4 px-10 text-center uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-brand-bg focus-visible:outline-offset-4"
          >
            Hubungi Saya
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
