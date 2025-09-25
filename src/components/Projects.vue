<script setup>
import { projects } from '@/data/projects.js';
import ProjectCard from '@/components/ProjectCard.vue';
</script>

<template>
  <section id="proyek" class="py-16 px-4 bg-brand-bg">
    <div class="container mx-auto">
      <h2 data-aos="fade-up" class="text-3xl font-bold text-white text-center mb-12">Proyek Saya</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>