<script setup lang="ts">
// Kita menggunakan script setup lang="ts" untuk standar modern
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ------------------------------------------------------------------ */
/* State dasar                                                         */
/* ------------------------------------------------------------------ */
const scrollY = ref(0)
const isVisible = ref(false) // dipakai untuk sequence entrance saat load
const prefersReducedMotion = ref(false)

/* Tilt 3D pada foto profil */
const tiltX = ref(0)
const tiltY = ref(0)

/* Efek magnetic pada tombol CTA */
const primaryBtnOffset = ref({ x: 0, y: 0 })
const secondaryBtnOffset = ref({ x: 0, y: 0 })

/* Partikel saat tombol diklik */
interface Particle { id: number; x: number; y: number; tx: number; ty: number; color: string }
const particles = ref<Particle[]>([])
let particleId = 0

/* ------------------------------------------------------------------ */
/* Scroll handling                                                     */
/* ------------------------------------------------------------------ */
function onScroll() {
  scrollY.value = window.scrollY
}

const heroInnerStyle = computed(() => {
  if (prefersReducedMotion.value) return {}
  const fade = Math.max(1 - scrollY.value / 500, 0.1)
  const translate = scrollY.value * 0.18
  const scale = 1 - Math.min(scrollY.value / 3000, 0.05)
  return {
    opacity: fade,
    transform: `translateY(${translate}px) scale(${scale})`,
  }
})

const decorLayerStyle = computed(() => {
  if (prefersReducedMotion.value) return {}
  return {
    transform: `translateY(${scrollY.value * 0.25}px)`,
  }
})

const gridStyle = computed(() => {
  if (prefersReducedMotion.value) return {}
  return {
    transform: `translateY(${scrollY.value * 0.08}px)`,
  }
})

const scrollHintStyle = computed(() => ({
  opacity: Math.max(1 - scrollY.value / 150, 0),
}))

/* ------------------------------------------------------------------ */
/* Tilt 3D foto profil                                                  */
/* ------------------------------------------------------------------ */
function onProfileMove(e: MouseEvent) {
  if (prefersReducedMotion.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  tiltY.value = px * 22 // rotateY
  tiltX.value = -py * 22 // rotateX
}
function resetProfileTilt() {
  tiltX.value = 0
  tiltY.value = 0
}
const profileTiltStyle = computed(() => ({
  transform: `perspective(700px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`,
}))

/* ------------------------------------------------------------------ */
/* Magnetic button                                                      */
/* ------------------------------------------------------------------ */
function magnetize(e: MouseEvent, target: 'primary' | 'secondary') {
  if (prefersReducedMotion.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.35
  const y = (e.clientY - rect.top - rect.height / 2) * 0.35
  if (target === 'primary') primaryBtnOffset.value = { x, y }
  else secondaryBtnOffset.value = { x, y }
}
function resetMagnet(target: 'primary' | 'secondary') {
  if (target === 'primary') primaryBtnOffset.value = { x: 0, y: 0 }
  else secondaryBtnOffset.value = { x: 0, y: 0 }
}
const primaryBtnStyle = computed(() => ({
  transform: `translate(${primaryBtnOffset.value.x}px, ${primaryBtnOffset.value.y}px)`,
}))
const secondaryBtnStyle = computed(() => ({
  transform: `translate(${secondaryBtnOffset.value.x}px, ${secondaryBtnOffset.value.y}px)`,
}))

/* ------------------------------------------------------------------ */
/* Burst partikel saat klik CTA                                        */
/* ------------------------------------------------------------------ */
function burst(e: MouseEvent, color: string) {
  if (prefersReducedMotion.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const originX = e.clientX - rect.left
  const originY = e.clientY - rect.top
  const count = 8
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
    const dist = 40 + Math.random() * 30
    const id = particleId++
    particles.value.push({
      id,
      x: originX,
      y: originY,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      color,
    })
    setTimeout(() => {
      particles.value = particles.value.filter((p) => p.id !== id)
    }, 650)
  }
}

/* ------------------------------------------------------------------ */
/* Scroll indicator -> scroll ke section berikutnya                    */
/* ------------------------------------------------------------------ */
function scrollToNext() {
  const target = document.querySelector('#proyek') || document.getElementById('home')?.nextElementSibling
  target?.scrollIntoView({ behavior: prefersReducedMotion.value ? 'auto' : 'smooth' })
}

/* ------------------------------------------------------------------ */
/* Lifecycle                                                            */
/* ------------------------------------------------------------------ */
onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.addEventListener('scroll', onScroll, { passive: true })

  // Trigger urutan animasi masuk sesaat setelah komponen tampil
  requestAnimationFrame(() => {
    setTimeout(() => {
      isVisible.value = true
    }, 60)
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-start pt-32 md:items-center md:pt-0 justify-center text-center overflow-hidden bg-brand-bg transition-all duration-300"
  >
    <div
      class="absolute inset-0 z-0 opacity-[0.03]"
      :style="gridStyle"
      style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 4rem 4rem;"
    ></div>

    <kinesis-container class="container mx-auto px-4 z-10 relative mb-16 md:mb-0">
      <div class="hero-inner" :style="heroInnerStyle">

        <div class="decor-layer" :style="decorLayerStyle">
          <kinesis-element :strength="20" type="depth" class="absolute -top-20 -left-20 pointer-events-none">
            <div class="w-64 h-64 bg-brand-primary/20 rounded-full filter blur-[80px] mix-blend-screen"></div>
          </kinesis-element>
          <kinesis-element :strength="-20" type="depth" class="absolute bottom-0 -right-20 pointer-events-none">
            <div class="w-80 h-80 bg-fuchsia-600/20 rounded-full filter blur-[100px] mix-blend-screen"></div>
          </kinesis-element>
        </div>

        <kinesis-element :strength="30" type="depth" class="mb-8 relative inline-block group">
          <div
            class="reveal-scale"
            :class="{ 'reveal-scale--visible': isVisible }"
            @mousemove="onProfileMove"
            @mouseleave="resetProfileTilt"
          >
            <div class="absolute inset-0 bg-gradient-to-tr from-brand-primary to-fuchsia-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <img
              src="/images/profiles.jpg"
              alt="Foto Muhammad Rifky"
              class="tilt-photo relative w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-[3px] border-brand-bg p-1 ring-2 ring-brand-primary/50 group-hover:ring-brand-primary transition-all duration-500 object-cover shadow-2xl"
              :style="profileTiltStyle"
            >
          </div>
        </kinesis-element>

        <div class="space-y-4 max-w-3xl mx-auto">
          <kinesis-element :strength="10" type="depth">
            <h2
              class="reveal-up text-xl md:text-2xl font-medium text-brand-text/80"
              :class="{ 'reveal-up--visible': isVisible }"
              style="transition-delay: 0.05s"
            >
              Halo, saya <span class="text-brand-text font-bold">MUHAMMAD RIFKY</span>
            </h2>
          </kinesis-element>

          <kinesis-element :strength="20" type="depth">
            <h1
              class="reveal-up text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
              :class="{ 'reveal-up--visible': isVisible }"
              style="transition-delay: 0.15s"
            >
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-400 to-brand-primary bg-[length:200%_auto] animate-gradient">
                Frontend & Mobile Developer
              </span>
            </h1>
          </kinesis-element>

          <kinesis-element :strength="15" type="depth_inv">
            <p
              class="reveal-up text-lg md:text-xl text-brand-subtext"
              :class="{ 'reveal-up--visible': isVisible }"
              style="transition-delay: 0.25s"
            >
              Mahasiswa D4 Teknik Informatika di <b class="text-brand-text">ULBI</b>.
              <br class="md:hidden"> Fokus pada UI/UX & Mobile, dengan kemampuan <span class="text-brand-primary font-semibold">Fullstack</span> yang solid.
            </p>
          </kinesis-element>

          <kinesis-element :strength="5">
            <p
              class="reveal-up max-w-xl mx-auto text-brand-subtext/80 mt-6 text-base leading-relaxed"
              :class="{ 'reveal-up--visible': isVisible }"
              style="transition-delay: 0.35s"
            >
              Saya menggabungkan desain antarmuka yang intuitif dengan performa backend yang handal untuk menciptakan aplikasi web dan mobile yang luar biasa.
            </p>
          </kinesis-element>
        </div>

        <div
          class="reveal-up flex flex-col sm:flex-row justify-center gap-4 mt-10"
          :class="{ 'reveal-up--visible': isVisible }"
          style="transition-delay: 0.45s"
        >
          <kinesis-element :strength="5" type="depth" class="w-full sm:w-auto">
            <a
              v-wave
              href="#proyek"
              class="magnetic-btn group flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:-translate-y-1 relative overflow-hidden"
              :style="primaryBtnStyle"
              @mousemove="magnetize($event, 'primary')"
              @mouseleave="resetMagnet('primary')"
              @click="burst($event, '#ffffff')"
            >
              <span
                v-for="p in particles.filter(p => p.color === '#ffffff')"
                :key="p.id"
                class="particle"
                :style="{ left: p.x + 'px', top: p.y + 'px', '--tx': p.tx + 'px', '--ty': p.ty + 'px' }"
              ></span>
              Lihat Karya Saya
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </kinesis-element>

          <kinesis-element :strength="8" type="depth" class="w-full sm:w-auto">
            <a
              v-wave
              href="#kontak"
              class="magnetic-btn group flex items-center justify-center gap-2 bg-transparent border-2 border-brand-surface hover:border-brand-text text-brand-text font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-brand-surface/30 hover:-translate-y-1 relative overflow-hidden"
              :style="secondaryBtnStyle"
              @mousemove="magnetize($event, 'secondary')"
              @mouseleave="resetMagnet('secondary')"
              @click="burst($event, 'var(--tw-color-brand-primary, #a855f7)')"
            >
              <span
                v-for="p in particles.filter(p => p.color !== '#ffffff')"
                :key="p.id"
                class="particle"
                :style="{ left: p.x + 'px', top: p.y + 'px', '--tx': p.tx + 'px', '--ty': p.ty + 'px', background: p.color }"
              ></span>
              Hubungi Saya
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-rotate-12"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </kinesis-element>
        </div>

      </div>
    </kinesis-container>

    <button
      type="button"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      :style="scrollHintStyle"
      aria-label="Gulir ke bawah"
      @click="scrollToNext"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-subtext/50"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
    </button>

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

/* Sequence masuk: fade + naik sedikit, dengan delay bertahap per elemen */
.reveal-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  will-change: opacity, transform;
}
.reveal-up--visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal-scale--visible {
  opacity: 1;
  transform: scale(1);
}

/* Foto profil: transisi halus untuk efek tilt 3D mengikuti kursor */
.tilt-photo {
  transition: transform 0.15s ease-out;
}

/* Tombol dengan efek magnetic mengikuti kursor */
.magnetic-btn {
  transition: transform 0.2s ease-out, background-color 0.3s, box-shadow 0.3s, border-color 0.3s;
}

/* Partikel burst saat tombol diklik */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: currentColor;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: particle-burst 0.6s ease-out forwards;
}
@keyframes particle-burst {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0.3);
  }
}

/* Hormati preferensi pengguna yang sensitif terhadap motion */
@media (prefers-reduced-motion: reduce) {
  .reveal-up,
  .reveal-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .animate-bounce {
    animation: none;
  }
  .tilt-photo,
  .magnetic-btn {
    transition: none;
  }
  .particle {
    display: none;
  }
}
</style>