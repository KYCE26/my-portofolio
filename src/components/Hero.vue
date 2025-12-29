<script setup lang="ts">
// Kita menggunakan script setup lang="ts" untuk standar modern
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-start pt-32 md:items-center md:pt-0 justify-center text-center overflow-hidden bg-brand-bg transition-all duration-300">
    
    <div class="absolute inset-0 z-0 opacity-[0.03]" 
         style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 4rem 4rem;">
    </div>

    <kinesis-container class="container mx-auto px-4 z-10 relative mb-16 md:mb-0">

      <kinesis-element :strength="20" type="depth" class="absolute -top-20 -left-20 pointer-events-none">
        <div class="w-64 h-64 bg-brand-primary/20 rounded-full filter blur-[80px] mix-blend-screen"></div>
      </kinesis-element>
      <kinesis-element :strength="-20" type="depth" class="absolute bottom-0 -right-20 pointer-events-none">
        <div class="w-80 h-80 bg-fuchsia-600/20 rounded-full filter blur-[100px] mix-blend-screen"></div>
      </kinesis-element>

      <kinesis-element :strength="30" type="depth" class="mb-8 relative inline-block group">
        <div class="absolute inset-0 bg-gradient-to-tr from-brand-primary to-fuchsia-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
        <img 
          src="/images/profiles.jpg" 
          alt="Foto Muhammad Rifky" 
          class="relative w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-[3px] border-brand-bg p-1 ring-2 ring-brand-primary/50 group-hover:ring-brand-primary transition-all duration-500 object-cover shadow-2xl"
        >
      </kinesis-element>
      
      <div class="space-y-4 max-w-3xl mx-auto">
        <kinesis-element :strength="10" type="depth">
          <h2 class="text-xl md:text-2xl font-medium text-brand-text/80">
            Halo, saya <span class="text-brand-text font-bold">MUHAMMAD RIFKY</span>
          </h2>
        </kinesis-element>
        
        <kinesis-element :strength="20" type="depth">
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-400 to-brand-primary bg-[length:200%_auto] animate-gradient">
              Frontend & Mobile Developer
            </span>
          </h1>
        </kinesis-element>
        
        <kinesis-element :strength="15" type="depth_inv">
          <p class="text-lg md:text-xl text-brand-subtext">
            Mahasiswa D4 Teknik Informatika di <b class="text-brand-text">ULBI</b>.
            <br class="md:hidden"> Fokus pada UI/UX & Mobile, dengan kemampuan <span class="text-brand-primary font-semibold">Fullstack</span> yang solid.
          </p>
        </kinesis-element>

        <kinesis-element :strength="5">
          <p class="max-w-xl mx-auto text-brand-subtext/80 mt-6 text-base leading-relaxed">
            Saya menggabungkan desain antarmuka yang intuitif dengan performa backend yang handal untuk menciptakan aplikasi web dan mobile yang luar biasa.
          </p>
        </kinesis-element>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <kinesis-element :strength="5" type="depth" class="w-full sm:w-auto">
          <a v-wave href="#proyek" class="group flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-1">
            Lihat Karya Saya
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </kinesis-element>
        
        <kinesis-element :strength="8" type="depth" class="w-full sm:w-auto">
          <a v-wave href="#kontak" class="group flex items-center justify-center gap-2 bg-transparent border-2 border-brand-surface hover:border-brand-text text-brand-text font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-brand-surface/30 hover:-translate-y-1">
            Hubungi Saya
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-rotate-12"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </kinesis-element>
      </div>

    </kinesis-container>
    
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-subtext/50"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
    </div>

  </section>
</template>

<style scoped>
/* Style untuk animasi teks gradient */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}
</style>