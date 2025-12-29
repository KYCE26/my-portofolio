<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../config/api';

// Components
import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';
import Projects from '../components/Projects.vue';
import Publications from '../components/Publications.vue';
import Certifications from '../components/Certifications.vue';
import Footer from '../components/Footer.vue';

// State Data
const projectsData = ref([]);
const certificatesData = ref([]);
const publicationsData = ref([]);
const isLoading = ref(true);

// Fetch All Data Once
onMounted(async () => {
  try {
    const [projRes, certRes, pubRes] = await Promise.all([
      api.get('/projects'),
      api.get('/certificates'),
      api.get('/publications')
    ]);
    
    projectsData.value = projRes.data.data;
    certificatesData.value = certRes.data.data;
    publicationsData.value = pubRes.data.data;
  } catch (error) {
    console.error("Gagal load data portfolio:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="bg-brand-bg text-brand-text min-h-screen relative">
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
         style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');">
    </div>

    <Navbar />

    <main class="relative z-10">
      <Hero />
      
      <Projects v-if="!isLoading" :data="projectsData" />
      
      <Publications v-if="!isLoading" :data="publicationsData" />
      
      <Certifications v-if="!isLoading" :data="certificatesData" />
    </main>

    <Footer class="relative z-10" />
  </div>
</template>