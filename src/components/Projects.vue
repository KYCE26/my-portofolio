<script setup lang="ts">
// Impor data dan komponen yang diperlukan
import { projects } from '@/data/projects.js';
import ProjectCard from '@/components/ProjectCard.vue';

// Kita bisa gunakan TypeScript untuk mendefinisikan tipe data proyek di masa depan jika mau
// import type { Project } from '@/types/project'; 
</script>

<template>
  <section id="proyek" class="py-24 px-4 bg-brand-bg relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.02]" 
         style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px;">
    </div>

    <div class="container mx-auto relative z-10">
      
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          Karya <span class="text-brand-primary">Terpilih</span> Saya
        </h2>
        
        <div class="max-w-3xl mx-auto bg-brand-surface/50 border border-brand-primary/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
          <div class="flex items-center justify-center gap-2 text-brand-primary font-bold text-xl mb-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M7 12v6a3 3 0 0 0 6 0v-6"/><circle cx="12" cy="12" r="3"/></svg>
             <span>Tentang Proyek Privat</span>
          </div>
          <p class="text-brand-subtext text-lg leading-relaxed">
            Di luar repositori publik ini, saya mengerjakan banyak <strong>proyek berskala besar yang bersifat privat</strong> (komersial atau dalam pengembangan). Proyek-proyek ini melibatkan arsitektur yang kompleks, UI/UX tingkat lanjut, dan integrasi backend yang mendalam.
          </p>
          <p class="text-brand-text mt-4 font-medium flex items-center justify-center gap-2">
            ✨ Tertarik melihat demo? Gulir ke bawah untuk menghubungi saya! ✨
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          data-aos="fade-up"
          :data-aos-delay="index * 100" 
        />
      </div>

      <div class="mt-20" data-aos="fade-up" data-aos-delay="300">
        <div class="bg-gradient-to-br from-brand-surface to-brand-bg rounded-3xl p-8 md:p-12 border border-brand-primary/20 text-center relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/20 transition-all duration-500"></div>
          
          <div class="relative z-10">
            <h3 class="text-3xl font-bold text-white mb-6">
              Ingin Melihat Demo Proyek Terbaik Saya?
            </h3>
            <p class="text-brand-subtext text-lg max-w-2xl mx-auto mb-10">
              Saya terbuka untuk mendemonstrasikan karya-karya privat saya dalam diskusi yang lebih personal. Jangan ragu untuk menghubungi saya untuk menjadwalkan sesi demo.
            </p>
            
            <a v-wave href="#kontak" class="inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-1 text-lg">
              Hubungi Saya Sekarang
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Tidak ada style khusus di sini karena kita sudah menggunakan utility classes dari Tailwind.
  Background pattern ditambahkan langsung di inline style pada div.
*/
</style>