<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const navLinks = [
  { href: '#home', label: 'Index' },
  { href: '#proyek', label: 'Projects' },
  { href: '#tulisan', label: 'Writings' },
  { href: '#sertifikat', label: 'Certifications' }
];

const activeSection = ref('home');
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const mobileMenuRef = ref<HTMLElement | null>(null);
const toggleBtnRef = ref<HTMLElement | null>(null);

let sectionObserver: IntersectionObserver | null = null;
let retryTimeout: ReturnType<typeof setTimeout> | null = null;
const prefersReducedMotion = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = async () => {
  isMobileMenuOpen.value = false;
  await nextTick();
  toggleBtnRef.value?.focus();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
  
  if (e.key === 'Tab' && isMobileMenuOpen.value && mobileMenuRef.value) {
    const focusableElements = mobileMenuRef.value.querySelectorAll(
      'a[href], button'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
};

function goHome(e: MouseEvent) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.value ? 'auto' : 'smooth' });
}

function initSectionObserver() {
  const sections = navLinks
    .map((l) => document.querySelector<HTMLElement>(l.href))
    .filter((el): el is HTMLElement => !!el);

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

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    nextTick(() => {
      const firstLink = mobileMenuRef.value?.querySelector('a');
      firstLink?.focus();
    });
  }
});

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('keydown', handleKeydown);
  initSectionObserver();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleKeydown);
  if (retryTimeout) clearTimeout(retryTimeout);
  sectionObserver?.disconnect();
  document.body.style.overflow = '';
});
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-editorial border-b border-transparent',
      isScrolled 
        ? 'bg-brand-bg/95 backdrop-blur-sm border-brand-border py-4' 
        : 'bg-transparent py-8'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <nav class="flex justify-between items-center">
        
        <a href="#home" @click="goHome" class="font-serif font-bold text-2xl text-brand-text tracking-tight flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-brand-focus" aria-label="Back to top">
          <span class="w-3 h-3 bg-brand-primary block group-hover:scale-125 transition-transform duration-300 ease-editorial"></span>
          Rifky.
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href" 
            class="relative py-1 transition-colors duration-200"
            :class="activeSection === link.href.slice(1) ? 'text-brand-text font-bold' : 'text-brand-subtext hover:text-brand-primary'"
          >
            {{ link.label }}
            <span 
              v-if="activeSection === link.href.slice(1)"
              class="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary transform origin-left transition-transform duration-300"
            ></span>
          </a>

          <div class="w-px h-4 bg-brand-border mx-2"></div>

          <a 
            href="https://github.com/KYCE26" 
            target="_blank" 
            class="text-brand-text hover:text-brand-primary font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-focus flex items-center gap-2"
          >
            Github
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button 
          ref="toggleBtnRef"
          @click="toggleMobileMenu" 
          class="md:hidden text-brand-text font-mono text-sm tracking-widest uppercase z-[60] relative focus-visible:outline-2 focus-visible:outline-brand-focus p-2 -mr-2"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle Menu"
        >
          {{ isMobileMenuOpen ? 'CLOSE' : 'MENU' }}
        </button>
      </nav>
    </div>

    <!-- Mobile Overlay -->
    <Transition name="menu-fade">
      <div 
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        ref="mobileMenuRef"
        class="md:hidden fixed inset-0 z-[55] bg-brand-bg flex flex-col justify-center px-8"
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation"
      >
        <div class="flex flex-col gap-6">
          <a 
            v-for="(link, i) in navLinks" 
            :key="link.href"
            :href="link.href" 
            @click="closeMobileMenu"
            class="font-serif text-5xl font-bold text-brand-text hover:text-brand-primary transition-colors duration-200 w-fit focus-visible:outline-2 focus-visible:outline-brand-focus leading-tight"
            :style="`animation-delay: ${i * 50}ms`"
          >
            {{ link.label }}
          </a>
          <div class="w-12 h-1 bg-brand-border my-4"></div>
          <a 
            href="https://github.com/KYCE26" 
            target="_blank"
            class="font-mono text-sm uppercase tracking-widest text-brand-subtext hover:text-brand-primary transition-colors duration-200 w-fit focus-visible:outline-2 focus-visible:outline-brand-focus flex items-center gap-2"
          >
            GITHUB <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
