<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
  { href: '#tulisan', label: 'Publikasi' },
  { href: '#sertifikat', label: 'Sertifikasi' },
];

// Section yang sedang aktif (scroll-spy) + posisi indikator yang meluncur
const activeSection = ref('home');
const linkRefs = ref<(HTMLElement | null)[]>([]);
const indicatorStyle = ref({ transform: 'translateX(0px)', width: '0px', opacity: '0' });

let sectionObserver: IntersectionObserver | null = null;
let retryTimeout: ReturnType<typeof setTimeout> | null = null;
const prefersReducedMotion = ref(false);

function setLinkRef(el: unknown, index: number) {
  linkRefs.value[index] = el as HTMLElement | null;
}

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

// Klik logo -> smooth scroll ke atas tanpa lompatan kasar
function goHome(e: MouseEvent) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.value ? 'auto' : 'smooth' });
}

/* ------------------------------------------------------------------ */
/* Indikator aktif yang meluncur di bawah link nav desktop             */
/* ------------------------------------------------------------------ */
async function updateIndicator() {
  await nextTick();
  const index = navLinks.findIndex((l) => l.href === `#${activeSection.value}`);
  const el = linkRefs.value[index];
  if (!el) {
    indicatorStyle.value = { ...indicatorStyle.value, opacity: '0' };
    return;
  }
  indicatorStyle.value = {
    transform: `translateX(${el.offsetLeft}px)`,
    width: `${el.offsetWidth}px`,
    opacity: '1',
  };
}

watch(activeSection, updateIndicator);
window.addEventListener?.('resize', updateIndicator);

/* ------------------------------------------------------------------ */
/* Scroll-spy: menandai section mana yang sedang dilihat               */
/* ------------------------------------------------------------------ */
function initSectionObserver() {
  const sections = navLinks
    .map((l) => document.querySelector<HTMLElement>(l.href))
    .filter((el): el is HTMLElement => !!el);

  // Section lain (Proyek/Publikasi/Sertifikasi) baru muncul setelah data API selesai dimuat,
  // jadi coba lagi sebentar kalau belum semuanya ada di DOM.
  if (sections.length < navLinks.length) {
    retryTimeout = setTimeout(initSectionObserver, 400);
    return;
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver?.observe(s));
}

// Kunci scroll body saat menu mobile terbuka
watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

// Pasang event listener saat komponen dimuat
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', handleScroll);
  initSectionObserver();
  updateIndicator();
});

// Bersihkan event listener saat komponen dihancurkan (best practice!)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateIndicator);
  if (retryTimeout) clearTimeout(retryTimeout);
  sectionObserver?.disconnect();
  document.body.style.overflow = '';
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
        
        <a href="#home" @click="goHome" class="flex items-center gap-2 group" aria-label="Back to top">
          <img 
            src="/favicon.ico" 
            alt="MR Logo" 
            class="w-10 h-10 rounded-full transition-transform duration-500 group-hover:rotate-12 shadow-lg shadow-brand-primary/20"
          > 
        </a>

        <div class="hidden md:flex items-center gap-8 text-brand-text font-medium">
          <div class="relative flex items-center gap-8">
            <a 
              v-for="(link, index) in navLinks" 
              :key="link.href"
              :ref="(el) => setLinkRef(el, index)"
              :href="link.href" 
              class="relative group transition-colors py-2"
              :class="activeSection === link.href.slice(1) ? 'text-brand-primary' : 'hover:text-brand-primary'"
            >
              {{ link.label }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>

            <!-- Indikator yang meluncur mengikuti section aktif -->
            <span
              class="nav-indicator absolute bottom-0 left-0 h-0.5 bg-brand-primary rounded-full"
              :style="indicatorStyle"
            ></span>
          </div>

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
            v-for="(link, index) in navLinks" 
            :key="link.href"
            :href="link.href" 
            @click="closeMobileMenu"
            class="mobile-link text-lg font-medium p-2 rounded-lg transition-colors hover:bg-brand-surface/50"
            :class="[
              activeSection === link.href.slice(1) ? 'text-brand-primary' : 'text-brand-text hover:text-brand-primary',
              isMobileMenuOpen ? 'mobile-link--visible' : ''
            ]"
            :style="{ transitionDelay: (index * 0.06) + 's' }"
          >
            {{ link.label }}
          </a>
          <a 
            href="https://github.com/KYCE26" 
            target="_blank"
            class="mobile-link bg-brand-primary text-white font-bold py-3 px-4 rounded-xl text-center mt-2 shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
            :class="isMobileMenuOpen ? 'mobile-link--visible' : ''"
            :style="{ transitionDelay: (navLinks.length * 0.06) + 's' }"
          >
            <Github :size="20" />
            GitHub
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Indikator aktif meluncur mulus antar link */
.nav-indicator {
  transition: transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), width 0.35s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.2s ease;
}

/* Item menu mobile masuk satu-satu (stagger) saat panel terbuka */
.mobile-link {
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.mobile-link--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .nav-indicator {
    transition: none;
  }
  .mobile-link {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>