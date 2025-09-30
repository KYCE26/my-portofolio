<template>
  <header class="bg-brand-bg/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 w-full">
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center py-4">
        
        <a href="#home" class="flex items-center gap-2 text-xl font-bold text-white">
          <img src="/favicon.ico" alt="MR Logo" class="w-8 h-8 rounded-full"> 
        </a>
        <div class="hidden md:flex items-center gap-6 text-brand-text">
          <a href="#proyek" class="hover:text-brand-primary transition-colors">Proyek</a>
          <a href="#publikasi" class="hover:text-brand-primary transition-colors">Publikasi</a>
          <a href="#sertifikasi" class="hover:text-brand-primary transition-colors">Sertifikasi</a>
          <a v-wave href="https://github.com/KYCE26" target="_blank" class="bg-brand-surface hover:bg-zinc-700 text-brand-text font-bold py-2 px-4 rounded-lg transition-colors duration-300">
            GitHub
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>