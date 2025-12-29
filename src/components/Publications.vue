<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="publications" class="py-20 px-6 md:px-12">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-white" data-aos="fade-up">
        Publications & Writings
      </h2>

      <div class="space-y-6">
        <div 
          v-for="(pub, index) in data" 
          :key="pub.id"
          class="group block bg-brand-surface border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800/50 transition-all"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  {{ pub.type }}
                </span>
                <span class="text-zinc-500 text-xs">{{ new Date(pub.created_at).toLocaleDateString() }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                {{ pub.title }}
              </h3>
              
              <p class="text-zinc-400 text-sm leading-relaxed">
                {{ pub.description }}
              </p>
            </div>

            <a 
              v-if="pub.link" 
              :href="pub.link" 
              target="_blank"
              class="shrink-0 w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:border-brand-primary group-hover:text-brand-primary transition-all"
            >
              ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>