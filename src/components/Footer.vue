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
  <footer id="kontak" class="py-16 px-6 md:px-8 border-t border-brand-surface bg-brand-bg">
    <div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      
      <div class="flex flex-wrap justify-center md:justify-start gap-6">
        <a 
          v-for="contact in contacts"
          :key="contact.name"
          :href="contact.url" 
          target="_blank" 
          class="font-mono text-sm uppercase tracking-widest text-brand-text hover:text-brand-focus transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus"
        >
          {{ contact.name }}
        </a>
      </div>

      <div class="text-brand-subtext font-mono text-xs uppercase tracking-widest text-center md:text-right">
        <p>&copy; {{ new Date().getFullYear() }} Muhammad Rifky</p>
      </div>

    </div>
  </footer>
</template>
