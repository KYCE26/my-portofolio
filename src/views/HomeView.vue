<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
const isMounted = ref(false);
const loadProgress = ref(0); // progres visual preloader (0-100)

// Progress bar scroll di bagian atas halaman
const scrollProgress = ref(0);

// Reveal per-section saat elemen masuk viewport
const projectsWrap = ref<HTMLElement | null>(null);
const publicationsWrap = ref<HTMLElement | null>(null);
const certificationsWrap = ref<HTMLElement | null>(null);
const visibleSections = ref(new Set<string>());
let sectionObserver: IntersectionObserver | null = null;
let revealFallbackTimeout: ReturnType<typeof setTimeout> | null = null;

const prefersReducedMotion = ref(false);

// Tombol kembali ke atas
const showBackToTop = ref(false);

let progressInterval: ReturnType<typeof setInterval> | null = null;

function onScroll() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const scrollHeight = doc.scrollHeight - window.innerHeight;
  scrollProgress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  showBackToTop.value = scrollTop > 600;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.value ? 'auto' : 'smooth' });
}

function setupSectionObserver() {
  if (sectionObserver) sectionObserver.disconnect();

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset.revealId;
          if (id) visibleSections.value.add(id);
          sectionObserver?.unobserve(entry.target);
        }
      });
    },
    // threshold 0 (bukan 0.15): di mobile, section jadi 1-kolom dan bisa jauh lebih tinggi
    // dari desktop. Threshold 0.15 berarti nunggu 15% dari TOTAL tinggi section kelihatan
    // dulu baru reveal — untuk section setinggi ribuan px itu bisa berarti harus scroll
    // ratusan px ke DALAM section sebelum kontennya muncul, kelihatan kayak "kosong hitam".
    // threshold 0 + rootMargin bikin reveal trigger begitu ujung section mulai nongol.
    { threshold: 0, rootMargin: '0px 0px -60px 0px' }
  );

  [projectsWrap.value, publicationsWrap.value, certificationsWrap.value].forEach((el) => {
    if (el) sectionObserver?.observe(el);
  });

  // Jaring pengaman: kalau karena alasan apapun observer tidak pernah trigger
  // (bug browser tertentu, dsb), paksa semua section tetap muncul setelah 3 detik
  // supaya konten tidak pernah nyangkut permanen dalam keadaan tak terlihat.
  if (revealFallbackTimeout) clearTimeout(revealFallbackTimeout);
  revealFallbackTimeout = setTimeout(() => {
    visibleSections.value.add('projects');
    visibleSections.value.add('publications');
    visibleSections.value.add('certifications');
  }, 3000);
}

// Setelah preloader selesai dan section ter-render, pasang observer
watch(isLoading, async (loading) => {
  if (!loading) {
    await nextTick();
    if (prefersReducedMotion.value) {
      // Tanpa reveal bertahap, langsung tampilkan semua
      visibleSections.value.add('projects');
      visibleSections.value.add('publications');
      visibleSections.value.add('certifications');
    } else {
      setupSectionObserver();
    }
  }
});

// Fetch All Data Once
onMounted(async () => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('scroll', onScroll, { passive: true });

  // Animasi masuk untuk background
  setTimeout(() => { isMounted.value = true; }, 100);

  // Progres preloader terasa "berjalan" walau menunggu network
  progressInterval = setInterval(() => {
    if (loadProgress.value < 90) {
      loadProgress.value += Math.random() * 8;
      if (loadProgress.value > 90) loadProgress.value = 90;
    }
  }, 150);

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
    if (progressInterval) clearInterval(progressInterval);
    loadProgress.value = 100;
    // Memberikan delay sedikit agar animasi loading terlihat elegan
    setTimeout(() => { isLoading.value = false; }, 500);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (progressInterval) clearInterval(progressInterval);
  if (revealFallbackTimeout) clearTimeout(revealFallbackTimeout);
  sectionObserver?.disconnect();
});
</script>

<template>
  <div class="bg-[#050505] text-zinc-200 min-h-screen relative font-sans selection:bg-brand-primary/30 selection:text-brand-primary overflow-x-hidden">

    <!-- PROGRESS BAR SCROLL -->
    <div class="fixed top-0 left-0 right-0 z-[90] h-[2px] bg-transparent pointer-events-none">
      <div
        class="h-full bg-gradient-to-r from-brand-primary to-fuchsia-500 transition-[width] duration-150 ease-out"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- OPTIMIZED BACKGROUND NOISE (Anti-Lag) -->
    <div 
      class="fixed inset-0 z-0 pointer-events-none opacity-[0.04] transition-opacity duration-1000"
      :class="isMounted ? 'opacity-[0.04]' : 'opacity-0'"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E'); transform: translateZ(0);">
    </div>

    <!-- PRELOADER SCREEN -->
    <Transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] backdrop-blur-sm">
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 border-t-2 border-r-2 border-brand-primary rounded-full animate-spin"></div>
          <div class="absolute inset-2 border-b-2 border-l-2 border-fuchsia-500 rounded-full animate-spin-slow"></div>
          <span class="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">M</span>
        </div>

        <div class="mt-6 w-40 h-[3px] rounded-full bg-zinc-800 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-brand-primary to-fuchsia-500 transition-[width] duration-200 ease-out"
            :style="{ width: loadProgress + '%' }"
          ></div>
        </div>

        <p class="mt-4 text-zinc-500 text-sm tracking-[0.2em]">
          INITIALIZING {{ Math.floor(loadProgress) }}%
        </p>
      </div>
    </Transition>

    <!-- MAIN CONTENT -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />

      <main class="flex-grow">
        <!-- Hero dirender langsung agar SEO tidak terhambat -->
        <Hero />
        
        <!-- Section lain menunggu data siap, lalu reveal satu per satu saat discroll -->
        <Transition name="slide-up">
          <div v-if="!isLoading" class="space-y-12">
            <div
              ref="projectsWrap"
              data-reveal-id="projects"
              class="section-reveal"
              :class="{ 'section-reveal--visible': visibleSections.has('projects') }"
            >
              <Projects :data="projectsData" />
            </div>

            <div
              ref="publicationsWrap"
              data-reveal-id="publications"
              class="section-reveal"
              :class="{ 'section-reveal--visible': visibleSections.has('publications') }"
              style="transition-delay: 0.1s"
            >
              <Publications :data="publicationsData" />
            </div>

            <div
              ref="certificationsWrap"
              data-reveal-id="certifications"
              class="section-reveal"
              :class="{ 'section-reveal--visible': visibleSections.has('certifications') }"
              style="transition-delay: 0.1s"
            >
              <Certifications :data="certificatesData" />
            </div>
          </div>
        </Transition>
      </main>

      <Footer />
    </div>

    <!-- TOMBOL KEMBALI KE ATAS -->
    <Transition name="fade">
      <button
        v-if="showBackToTop"
        type="button"
        aria-label="Kembali ke atas"
        class="back-to-top fixed bottom-6 right-6 z-[80] w-11 h-11 rounded-full bg-zinc-900/80 border border-zinc-700 backdrop-blur flex items-center justify-center text-zinc-300 hover:text-white hover:border-brand-primary hover:-translate-y-1 transition-all duration-300 shadow-lg"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>
    </Transition>

  </div>
</template>

<style scoped>
/* Transisi Smooth untuk Loading Screen & Konten */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

/* Reveal per-section saat discroll ke dalam viewport */
.section-reveal {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.section-reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top {
  animation: back-to-top-pop 0.3s ease-out;
}
@keyframes back-to-top-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .section-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .back-to-top {
    animation: none;
  }
  .animate-spin,
  .animate-spin-slow {
    animation: none;
  }
}
</style>