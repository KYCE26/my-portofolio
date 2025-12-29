<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
// 1. IMPOR KOMPONEN IKON DARI LUCIDE
import { Github, Menu, X, ArrowUpRight } from 'lucide-vue-next';

// State untuk mendeteksi apakah halaman sudah di-scroll
const isScrolled = ref(false);
// State untuk membuka/menutup menu mobile
const isMobileMenuOpen = ref(false);

// Data link navigasi agar mudah di-manage
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#publikasi', label: 'Publikasi' },
  { href: '#sertifikasi', label: 'Sertifikasi' },
];

// Fungsi untuk menangani event scroll
const handleScroll = () => {
  // Ubah state jika scroll lebih dari 20px
  isScrolled.value = window.scrollY > 20;
};

// Fungsi toggle menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Menutup menu mobile saat link diklik
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
}

// Pasang event listener saat komponen dimuat
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Bersihkan event listener saat komponen dihancurkan (best practice!)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out',
      isScrolled 
        ? 'bg-brand-bg/90 backdrop-blur-xl shadow-lg shadow-brand-primary/10 py-3' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center">
        
        <a href="#home" class="flex items-center gap-2 group" aria-label="Back to top">
          <img 
            src="/favicon.ico" 
            alt="MR Logo" 
            class="w-10 h-10 rounded-full transition-transform duration-500 group-hover:rotate-12 shadow-lg shadow-brand-primary/20"
          > 
        </a>

        <div class="hidden md:flex items-center gap-8 text-brand-text font-medium">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href" 
            class="relative group transition-colors hover:text-brand-primary py-2"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a 
            v-wave
            href="https://github.com/KYCE26" 
            target="_blank" 
            class="bg-brand-surface/80 hover:bg-brand-primary hover:text-white text-brand-text font-bold py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-brand-primary/30 group"
          >
            <Github :size="20" class="group-hover:scale-110 transition-transform" />
            GitHub
          </a>
        </div>

        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-brand-text hover:text-brand-primary transition-colors p-2 z-50 relative"
          aria-label="Toggle Menu"
        >
          <Menu v-if="!isMobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </nav>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-10 opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-brand-bg/95 backdrop-blur-xl shadow-xl border-t border-brand-surface/20 px-4 py-6">
        <div class="flex flex-col gap-4">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href" 
            @click="closeMobileMenu"
            class="text-lg font-medium text-brand-text hover:text-brand-primary transition-colors p-2 rounded-lg hover:bg-brand-surface/50"
          >
            {{ link.label }}
          </a>
          <a 
            href="https://github.com/KYCE26" 
            target="_blank"
            class="bg-brand-primary text-white font-bold py-3 px-4 rounded-xl text-center mt-2 shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
          >
            <Github :size="20" />
            GitHub
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>