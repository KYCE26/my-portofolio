// src/App.vue
<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Projects from './components/Projects.vue';
import Publications from './components/Publications.vue';
import Certifications from './components/Certifications.vue';
import Footer from './components/Footer.vue'; // <-- Pastikan ini di-import
</script>

<template>
  <div class="bg-brand-bg text-brand-text">
    <Navbar />
    <main>
      <Hero />
      <Projects />
      <Publications />
      <Certifications />
    </main>
    <Footer /> </div>
</template>