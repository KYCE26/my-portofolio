<script setup lang="ts">
import { defineProps } from 'vue';

// Terima data dari HomeView
const props = defineProps<{
  data: any[]
}>();
</script>

<template>
  <section id="projects" class="py-20 px-6 md:px-12 relative overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-fuchsia-500" data-aos="fade-up">
        Featured Projects
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in data" 
          :key="project.id"
          class="group bg-brand-surface border border-zinc-700/50 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 flex flex-col"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="h-48 overflow-hidden relative">
            <div class="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
            <img 
              v-if="project.image_url" 
              :src="project.image_url" 
              :alt="project.title" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            >
            <div v-else class="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600">
              No Image
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
              {{ project.title }}
            </h3>
            
            <p class="text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in (project.tags || [])" 
                :key="tag" 
                class="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex gap-4 mt-auto">
              <a 
                v-if="project.repo_url" 
                :href="project.repo_url" 
                target="_blank" 
                class="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <span class="i-mdi-github text-lg"></span> Code
              </a>
              <a 
                v-if="project.demo_url" 
                :href="project.demo_url" 
                target="_blank" 
                class="flex items-center gap-2 text-sm text-brand-primary hover:text-brand-primary-light transition-colors"
              >
                <span class="i-mdi-launch text-lg"></span> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="data.length === 0" class="text-center text-zinc-500 py-10">
        Belum ada project yang ditampilkan.
      </div>
    </div>
  </section>
</template>