<script setup lang="ts">
// Menggunakan script setup lang="ts"
// Kita bisa siapkan data kontak di sini agar template lebih rapi
const contacts = [
  {
    name: 'Email',
    url: 'mailto:muhammad26rifky06@gmail.com',
    icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhammad-rifky-71381a193/',
    icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/KYCE26',
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.54 2.73c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/26Rifky',
    icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/62895636553207', // Format link WhatsApp
    icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/62895636553207', // Format link Telegram
    icon: '<path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-18.6 9.2a2.245 2.245 0 0 0-.58 4.03l5.1 2.55L18.3 6.2 8.7 16.1l4.8 2.4a2.245 2.245 0 0 0 3.16-.9l4.8-13.8a2.242 2.242 0 0 0-.262-1.367Z"/>'
  }
];
</script>

<template>
  <footer id="kontak" class="bg-brand-surface py-24 px-4 relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.02]" 
         style="background-image: radial-gradient(circle at bottom center, #ffffff 1px, transparent 1px); background-size: 24px 24px;">
    </div>

    <div class="container mx-auto text-center relative z-10">
      
      <div data-aos="fade-up" class="mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-fuchsia-500 to-brand-primary bg-[length:200%_auto] animate-gradient inline-block mb-6">
          Mari Terhubung!
        </h2>
        <p class="text-brand-subtext max-w-xl mx-auto text-lg leading-relaxed">
          Saya selalu antusias untuk mendiskusikan proyek baru, peluang kolaborasi, atau sekadar bertukar ide. Jangan ragu untuk menyapa melalui platform di bawah ini.
        </p>
      </div>

      <div data-aos="fade-up" data-aos-delay="200" class="flex flex-wrap justify-center items-center gap-4 mb-16">
        <a 
          v-for="contact in contacts"
          :key="contact.name"
          :href="contact.url" 
          target="_blank" 
          class="group p-3.5 bg-brand-bg hover:bg-brand-primary rounded-full transition-all duration-300 border border-brand-primary/10 hover:border-brand-primary shadow-md hover:shadow-brand-primary/30 hover:-translate-y-1"
          :aria-label="contact.name"
          :title="contact.name"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-brand-subtext group-hover:text-white transition-colors" v-html="contact.icon">
          </svg>
        </a>
      </div>

      <hr class="border-brand-primary/10 w-1/2 mx-auto mb-8">

      <div class="text-brand-subtext text-sm flex flex-col md:flex-row items-center justify-center gap-4">
        <p>
          © {{ new Date().getFullYear() }} Muhammad Rifky. Hak Cipta Dilindungi.
        </p>
        <div class="flex items-center gap-3 bg-brand-bg/50 py-2 px-4 rounded-full border border-brand-primary/5">
          <span class="text-xs font-medium">Dibangun dengan:</span>
          <img src="https://skillicons.dev/icons?i=vue" alt="Vue.js" class="w-5 h-5 hover:scale-110 transition-transform" title="Vue.js" />
          <img src="https://skillicons.dev/icons?i=vite" alt="Vite" class="w-5 h-5 hover:scale-110 transition-transform" title="Vite" />
          <img src="https://skillicons.dev/icons?i=tailwindcss" alt="Tailwind CSS" class="w-5 h-5 hover:scale-110 transition-transform" title="Tailwind CSS" />
          <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" class="w-5 h-5 hover:scale-110 transition-transform" title="TypeScript" />
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* Animasi gradient judul */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient-shift 5s ease infinite;
}
</style>