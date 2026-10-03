<template>
  <section id="home" class="w-full pt-32 pb-16">
    <div class="container mx-auto px-6 md:px-8">
      <div class="flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-16 max-w-6xl mx-auto">
        
        <div class="max-w-3xl space-y-8 flex-1">
          <p class="font-mono text-sm tracking-widest text-brand-subtext uppercase">
            Fresh Graduate
          </p>

          <h2 class="text-2xl md:text-3xl font-medium text-brand-text">
            Halo, saya <span class="font-bold">MUHAMMAD RIFKY</span>
          </h2>

          <h1 class="font-serif text-5xl md:text-7xl font-bold tracking-tight text-brand-text leading-none">
            Full-Stack & Mobile Developer
          </h1>

          <div class="space-y-4 text-lg md:text-xl text-brand-subtext max-w-2xl leading-relaxed">
            <p>
              Lulusan D4 Teknik Informatika dari <b class="text-brand-text">ULBI</b>. 
              Membawa <span class="text-brand-text font-bold">3 tahun pengalaman profesional</span> dalam membangun arsitektur Web & Mobile modern.
            </p>
            <p class="text-base md:text-lg">
              Saya menggabungkan antarmuka interaktif yang dibangun sendiri secara penuh dengan performa backend yang tangguh untuk menciptakan ekosistem aplikasi yang scalable dan berdampak nyata.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-8">
            <a
              href="#proyek"
              class="border border-brand-text bg-brand-text text-brand-bg font-bold py-3 px-8 text-center uppercase tracking-widest text-sm hover:bg-transparent hover:text-brand-text transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus min-h-[44px]"
            >
              Lihat Karya Saya
            </a>
            <a
              href="#kontak"
              class="border border-brand-text bg-transparent text-brand-text font-bold py-3 px-8 text-center uppercase tracking-widest text-sm hover:bg-brand-text hover:text-brand-bg transition-colors duration-0 focus-visible:outline-2 focus-visible:outline-brand-focus min-h-[44px]"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <div class="w-48 md:w-72 shrink-0">
          <div class="aspect-square w-full overflow-hidden border-2 border-brand-text bg-brand-surface group">
            <img 
              src="/images/profile.jpg" 
              alt="Foto Profil Muhammad Rifky" 
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
