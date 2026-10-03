<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="proyek" class="py-24 px-6 md:px-8 border-t border-brand-surface bg-brand-bg">
    <div class="max-w-6xl mx-auto">
      
      <div class="mb-16">
        <h2 class="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-text mb-4 uppercase">
          Proyek Terpilih
        </h2>
        <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">
          Eksperimen & Open Source
        </p>
      </div>

      <div class="space-y-24 mb-24">
        
        <div 
          v-for="(project, index) in data" 
          :key="project.id"
          class="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          :class="index % 2 !== 0 ? 'md:flex-row-reverse' : ''"
        >
          <!-- Gambar -->
          <div class="w-full md:w-1/2">
            <div class="border border-brand-text p-2 bg-brand-surface">
              <img 
                :src="project.image_url" 
                :alt="project.title" 
                class="w-full h-auto object-cover border border-brand-text"
              />
            </div>
          </div>

          <!-- Konten -->
          <div class="w-full md:w-1/2 space-y-6">
            <h3 class="font-serif text-2xl md:text-4xl font-bold text-brand-text">
              {{ project.title }}
            </h3>
            
            <p class="text-brand-subtext text-base md:text-lg leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 pt-2">
              <span 
                v-for="tech in project.stack" 
                :key="tech"
                class="font-mono text-xs border border-brand-text px-2 py-1 text-brand-text uppercase tracking-wider"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <a 
                v-if="project.repo_url" 
                :href="project.repo_url" 
                target="_blank" 
                class="border border-brand-text text-brand-text font-bold py-3 px-6 text-sm uppercase tracking-widest hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus"
              >
                Code
              </a>
              <a 
                v-if="project.demo_url" 
                :href="project.demo_url" 
                target="_blank" 
                class="border border-brand-text bg-brand-text text-brand-bg font-bold py-3 px-6 text-sm uppercase tracking-widest hover:bg-brand-bg hover:text-brand-text transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

      </div>

      <div v-if="data.length === 0" class="py-20 border border-brand-text text-center">
        <p class="font-mono text-sm tracking-widest text-brand-text uppercase">Loading Projects...</p>
      </div>

      <!-- Private Enterprise Section -->
      <div class="border border-brand-text p-8 md:p-12 bg-brand-surface flex flex-col md:flex-row gap-8 items-center justify-between mt-24">
        <div class="max-w-2xl space-y-4 text-center md:text-left">
          <h3 class="font-serif text-2xl font-bold text-brand-text uppercase">
            Private & Enterprise Projects
          </h3>
          <p class="text-brand-subtext text-base leading-relaxed">
            Di luar repositori publik ini, saya mengerjakan proyek berskala besar yang bersifat privat. Melibatkan arsitektur kompleks, UI/UX tingkat lanjut, dan integrasi backend yang mendalam.
          </p>
        </div>
        <div class="shrink-0">
          <a
            href="#kontak"
            class="block border border-brand-text bg-brand-text text-brand-bg font-bold py-4 px-8 text-center uppercase tracking-widest text-sm hover:bg-transparent hover:text-brand-text transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus"
          >
            Hubungi Saya
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
