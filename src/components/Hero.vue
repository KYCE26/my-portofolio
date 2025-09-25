// src/components/Hero.vue
<script setup>
// Di sini kamu bisa import ikon jika mau, misal SVG untuk GitHub/LinkedIn
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center text-center bg-brand-bg text-brand-text overflow-hidden">
    <kinesis-container class="container mx-auto px-4 z-10">

      <kinesis-element :strength="10" type="depth" class="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></kinesis-element>
      <kinesis-element :strength="-15" type="depth" class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl"></kinesis-element>

      <kinesis-element :strength="25" type="depth">
        <img src="/images/profiles.jpg" alt="Foto Muhammad Rifky" class="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-brand-primary shadow-lg">
      </kinesis-element>
      
      <kinesis-element :strength="15" type="depth">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          Halo, saya Muhammad Rifky
        </h1>
      </kinesis-element>
      
      <kinesis-element :strength="10" type="depth_inv">
        <h2 class="text-xl md:text-2xl font-light text-brand-primary mb-6">
          Full-Stack Developer & Mahasiswa Teknik Informatika
        </h2>
      </kinesis-element>
      
      <kinesis-element :strength="5">
        <p class="max-w-2xl mx-auto text-brand-subtext mb-8">
          Saya bersemangat dalam membangun aplikasi web dan mobile yang fungsional dan intuitif, dari hulu ke hilir.
        </p>
      </kinesis-element>

<div class="flex justify-center gap-4">
  <kinesis-element :strength="5" type="depth">
    <a v-wave href="#proyek" class="block ...">
      Lihat Proyek Saya
    </a>
  </kinesis-element>
  <kinesis-element :strength="5" type="depth">
    <a v-wave href="#kontak" class="block ...">
      Hubungi Saya
    </a>
  </kinesis-element>
</div>
    </kinesis-container>
  </section>
</template>