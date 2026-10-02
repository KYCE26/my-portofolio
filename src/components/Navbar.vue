<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#tulisan', label: 'Publikasi' },
  { href: '#sertifikat', label: 'Sertifikasi' }
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
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
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
  window.addEventListener('scroll', handleScroll);
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
      'fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-0 ease-in-out',
      isScrolled 
        ? 'bg-brand-bg border-b border-brand-surface py-4' 
        : 'bg-transparent py-6'
    ]"
  >
    <div class="container mx-auto px-6 md:px-8">
      <nav class="flex justify-between items-center">
        
        <a href="#home" @click="goHome" class="font-serif font-bold text-xl text-brand-text tracking-tighter" aria-label="Back to top">
          M.RIFKY
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-10 text-brand-text font-medium text-sm tracking-wide">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href" 
            class="pb-1 transition-none border-b-2"
            :class="activeSection === link.href.slice(1) ? 'border-brand-text text-brand-text' : 'border-transparent text-brand-subtext hover:border-brand-subtext'"
          >
            {{ link.label }}
          </a>

          <a 
            href="https://github.com/KYCE26" 
            target="_blank" 
            class="border border-brand-text text-brand-text font-bold py-2 px-6 rounded-none hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 uppercase text-xs tracking-widest"
          >
            GITHUB
          </a>
        </div>

        <!-- Mobile Toggle -->
        <button 
          ref="toggleBtnRef"
          @click="toggleMobileMenu" 
          class="md:hidden text-brand-text font-mono text-sm tracking-widest uppercase p-2 z-[60] relative focus-visible:outline-2 focus-visible:outline-brand-focus"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle Menu"
        >
          {{ isMobileMenuOpen ? 'CLOSE' : 'MENU' }}
        </button>
      </nav>
    </div>

    <!-- Mobile Overlay -->
    <div 
      v-if="isMobileMenuOpen"
      id="mobile-menu"
      ref="mobileMenuRef"
      class="md:hidden fixed inset-0 z-[55] bg-brand-bg flex flex-col justify-center px-8 pb-12"
      role="dialog"
      aria-modal="true"
      aria-label="Main Navigation"
    >
      <div class="flex flex-col gap-8">
        <a 
          v-for="link in navLinks" 
          :key="link.href"
          :href="link.href" 
          @click="closeMobileMenu"
          class="font-serif text-4xl md:text-5xl font-bold text-brand-text p-2 hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 w-fit focus-visible:outline-2 focus-visible:outline-brand-focus"
        >
          {{ link.label }}
        </a>
        <a 
          href="https://github.com/KYCE26" 
          target="_blank"
          class="font-serif text-4xl md:text-5xl font-bold text-brand-text p-2 mt-4 hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 w-fit border-t-4 border-brand-text focus-visible:outline-2 focus-visible:outline-brand-focus"
        >
          GITHUB
        </a>
      </div>
    </div>
  </header>
</template>
