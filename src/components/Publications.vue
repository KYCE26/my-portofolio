// src/components/Publications.vue
<script setup>
import { publications } from '@/data/publications.js';
</script>

<template>
  <section id="publikasi" class="py-20 px-4 bg-brand-surface">
    <div class="container mx-auto">
      <h2 data-aos="fade-up" class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-fuchsia-700 text-center mb-12">
        Publikasi Saya
      </h2>
      <div class="max-w-3xl mx-auto space-y-8">
        
        <div 
          v-for="(pub, index) in publications" 
          :key="pub.id" 
          class="bg-brand-bg p-6 rounded-lg shadow-md"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          data-aos-duration="1000"
        >
          <div class="flex items-center mb-3">
            <span class="text-2xl mr-4">{{ pub.type === 'Buku' ? '📖' : '📄' }}</span>
            <h3 class="text-xl font-bold text-brand-primary">{{ pub.title }}</h3>
          </div>
          <p class="text-brand-subtext mb-4">{{ pub.description }}</p>
          <a :href="pub.link" target="_blank" class="text-brand-primary hover:text-white font-semibold">
            Baca Selengkapnya &rarr;
          </a>
        </div>

      </div>
    </div>
  </section>
</template>