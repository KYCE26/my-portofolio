<script setup>
defineProps({
  project: Object,
});
</script>
<template>
  <div v-wave data-aos="fade-up" class="bg-brand-surface rounded-lg overflow-hidden shadow-lg hover:shadow-brand-primary/30 transition-shadow duration-300 flex flex-col group">
    
    <div class="bg-black/30 aspect-video overflow-hidden">
      <img 
        :src="project.image" 
        :alt="project.title" 
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
      >
    </div>
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-brand-text mb-2">{{ project.title }}</h3>
      <p class="text-brand-subtext text-sm mb-4 flex-grow">{{ project.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in project.tags" :key="tag" class="bg-brand-primary/20 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full">
          {{ tag }}
        </span>
      </div>

      <a :href="project.repoUrl" target="_blank" class="text-brand-primary hover:text-white font-semibold transition-colors duration-300 mt-auto">
        Lihat di GitHub &rarr;
      </a>
    </div>
  </div>
</template>