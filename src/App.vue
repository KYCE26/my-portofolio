<script setup lang="ts">
// Menggunakan lang="ts" untuk konsistensi
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Projects from './components/Projects.vue';
import Publications from './components/Publications.vue';
import Certifications from './components/Certifications.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="bg-brand-bg text-brand-text min-h-screen relative">
    
    <div class="fixed inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
         style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E');">
    </div>

    <Navbar />
    
    <main class="relative z-10">
      <Hero />
      <Projects />
      <Publications />
      <Certifications />
    </main>
    
    <Footer class="relative z-10" />
    
  </div>
</template>

<style>
/* Memastikan smooth scrolling aktif di seluruh halaman.
  Biasanya ada di base.css, tapi ditaruh di sini juga aman.
*/
html {
  scroll-behavior: smooth;
}
</style>