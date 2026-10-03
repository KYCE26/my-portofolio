<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();

function formatYear(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).getFullYear();
}
</script>

<template>
  <section id="tulisan" class="py-24 px-6 md:px-8 border-t border-brand-surface bg-brand-bg">
    <div class="max-w-6xl mx-auto">
      
      <div class="mb-16">
        <h2 class="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-text mb-4 uppercase">
          Publications
        </h2>
        <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">
          Tulisan & Artikel
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="pub in data" 
          :key="pub.id"
          class="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 py-6 border-b border-brand-surface hover:border-brand-text transition-colors duration-0"
        >
          <div class="font-mono text-sm text-brand-subtext shrink-0 md:w-16">
            {{ formatYear(pub.created_at) }}
          </div>
          
          <div class="font-serif text-lg md:text-xl font-bold text-brand-text flex-grow">
            {{ pub.title }}
          </div>

          <div class="font-mono text-xs text-brand-subtext uppercase tracking-widest shrink-0">
            {{ pub.type }}
          </div>

          <a 
            v-if="pub.link" 
            :href="pub.link" 
            target="_blank" 
            class="text-xs font-bold text-brand-text uppercase tracking-widest hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-focus ml-0 md:ml-4 whitespace-nowrap"
          >
            BACA ARTIKEL
          </a>
        </div>
      </div>

      <div v-if="data.length === 0" class="py-20 border border-brand-text text-center mt-4 bg-brand-surface">
        <p class="font-mono text-sm tracking-widest text-brand-text uppercase">Belum ada publikasi.</p>
      </div>

    </div>
  </section>
</template>
