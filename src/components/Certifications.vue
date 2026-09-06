<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import PdfModal from './PdfModal.vue'; // 1. Import Modal

const props = defineProps<{
  data: any[]
}>();

// 2. State untuk Modal
const showModal = ref(false);
const activePdf = ref('');
const activeTitle = ref('');

const prefersReducedMotion = ref(false);

// 3. Fungsi Buka Modal
const openCertificate = (url: string, title: string) => {
  activePdf.value = url;
  activeTitle.value = title;
  showModal.value = true;
};

/* ------------------------------------------------------------------ */
/* Tilt 3D per kartu mengikuti posisi kursor                           */
/* ------------------------------------------------------------------ */
function onCardMove(e: MouseEvent) {
  if (prefersReducedMotion.value) return;
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
}
function onCardLeave(e: MouseEvent) {
  (e.currentTarget as HTMLElement).style.transform = '';
}

/* ------------------------------------------------------------------ */
/* Partikel kecil saat tombol "Lihat Sertifikat" diklik                */
/* ------------------------------------------------------------------ */
interface Particle { id: number; owner: string | number; x: number; y: number; tx: number; ty: number }
const particles = ref<Particle[]>([]);
let particleId = 0;

function burst(e: MouseEvent, ownerId: string | number) {
  if (prefersReducedMotion.value) return;
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const originX = e.clientX - rect.left;
  const originY = e.clientY - rect.top;
  const count = 7;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 30 + Math.random() * 24;
    const id = particleId++;
    particles.value.push({
      id,
      owner: ownerId,
      x: originX,
      y: originY,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
    });
    setTimeout(() => {
      particles.value = particles.value.filter((p) => p.id !== id);
    }, 600);
  }
}

function handleOpen(e: MouseEvent, cert: any) {
  burst(e, cert.id);
  openCertificate(cert.pdf_url, cert.title);
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});
</script>

<template>
  <section id="sertifikat" class="py-24 px-6 md:px-12 bg-black relative overflow-hidden">
    
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
        <div>
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-2">
            Professional <span class="text-brand-primary">Certifications</span>
          </h2>
          <p class="text-zinc-400">Bukti kompetensi dan dedikasi dalam pembelajaran berkelanjutan.</p>
        </div>
        <div class="h-px bg-zinc-800 flex-grow md:ml-8 self-center"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          v-for="(cert, index) in data" 
          :key="cert.id"
          class="tilt-card group relative bg-zinc-900 border border-zinc-800 hover:border-brand-primary/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          @mousemove="onCardMove"
          @mouseleave="onCardLeave"
        >
          <div class="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
            <div class="absolute inset-0 bg-brand-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

            <!-- Efek shine menyapu saat kartu di-hover -->
            <div class="shine absolute inset-0 z-10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"></div>
            
            <img 
              v-if="cert.image_url" 
              :src="cert.image_url" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              alt="Thumbnail"
            >
            <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
              <span class="text-xs">No Preview</span>
            </div>

            <button 
              v-if="cert.pdf_url" 
              @click="handleOpen($event, cert)"
              :aria-label="`Lihat sertifikat ${cert.title}`"
              class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span
                v-for="p in particles.filter(p => p.owner === cert.id)"
                :key="p.id"
                class="particle"
                :style="{ left: p.x + 'px', top: p.y + 'px', '--tx': p.tx + 'px', '--ty': p.ty + 'px' }"
              ></span>
              <span class="px-4 py-2 bg-brand-primary hover:bg-brand-primary-light text-white rounded-full text-sm font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-brand-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                Lihat Sertifikat
              </span>
            </button>
          </div>

          <div class="p-5">
            <p class="text-xs font-bold tracking-wider text-brand-primary uppercase mb-1">
              {{ cert.issuer }}
            </p>
            <h3 class="text-lg font-bold text-white leading-tight group-hover:text-brand-primary-light transition-colors">
              {{ cert.title }}
            </h3>
          </div>

        </div>
      </div>

      <div v-if="data.length === 0" class="py-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/50">
        <p class="text-zinc-500">Belum ada sertifikat yang ditampilkan.</p>
      </div>

    </div>

    <PdfModal 
      :show="showModal" 
      :pdfUrl="activePdf" 
      :title="activeTitle" 
      @close="showModal = false" 
    />

  </section>
</template>

<style scoped>
/* Tilt 3D kartu: transform diatur lewat JS, di sini cukup transisinya */
.tilt-card {
  transition: transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s;
  transform-style: preserve-3d;
  will-change: transform;
}

/* Partikel kecil saat tombol "Lihat Sertifikat" diklik */
.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: #ffffff;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: cert-particle-burst 0.55s ease-out forwards;
}
@keyframes cert-particle-burst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0.3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transition: none;
  }
  .shine {
    display: none;
  }
  .particle {
    display: none;
  }
}
</style>