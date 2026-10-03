<script setup lang="ts">
const contacts = [
  { name: 'Email', url: 'mailto:muhammad26rifky06@gmail.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammad-rifky-71381a193/' },
  { name: 'GitHub', url: 'https://github.com/KYCE26' },
  { name: 'Instagram', url: 'https://www.instagram.com/26Rifky' },
  { name: 'WhatsApp', url: 'https://wa.me/62895636553207' }
];
</script>

<template>
  <footer id="kontak" class="py-16 md:py-24 px-6 md:px-12 border-t border-brand-border bg-brand-bg relative overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col items-center gap-16">
      
      <div class="text-center space-y-6 max-w-2xl">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-brand-text tracking-tight">Mari Berkolaborasi.</h2>
        <p class="text-brand-subtext font-light text-lg">Tertarik untuk membangun sesuatu yang hebat bersama? Jangan ragu untuk menghubungi saya melalui saluran di bawah.</p>
      </div>

      <div class="flex flex-wrap justify-center gap-x-8 gap-y-4">
        <a 
          v-for="contact in contacts"
          :key="contact.name"
          :href="contact.url" 
          target="_blank" 
          class="font-mono text-sm uppercase tracking-widest text-brand-text hover:text-brand-primary transition-colors duration-300 ease-editorial focus-visible:outline-2 focus-visible:outline-brand-focus relative group py-2"
        >
          {{ contact.name }}
          <span class="absolute bottom-0 left-0 w-full h-px bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-editorial"></span>
        </a>
      </div>

      <div class="w-full pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-brand-subtext font-mono text-xs uppercase tracking-widest mt-8">
        <p>&copy; {{ new Date().getFullYear() }} Muhammad Rifky</p>
        <p>Built with Vue & Tailwind</p>
      </div>

    </div>
  </footer>
</template>
