<template>
  <section id="home" class="w-full pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex flex-col md:flex-row items-start gap-12 lg:gap-24">
        
        <!-- Typography & Content (Left Heavy) -->
        <div class="w-full md:w-2/3 space-y-10 relative z-10">
          <div class="flex items-center gap-4">
            <div class="h-px w-12 bg-brand-primary"></div>
            <p class="font-mono text-xs font-bold tracking-[0.2em] text-brand-primary uppercase">
              Fresh Graduate
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-xl md:text-2xl font-sans text-brand-subtext font-light">
              Halo, saya <strong class="text-brand-text font-medium">MUHAMMAD RIFKY</strong>
            </h2>

            <h1 class="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-brand-text leading-[1.05] text-balance">
              Full-Stack &<br>Mobile Developer.
            </h1>
          </div>

          <div class="max-w-xl space-y-6 text-lg text-brand-subtext leading-relaxed font-sans font-light">
            <p>
              Lulusan D4 Teknik Informatika dari <span class="text-brand-text font-medium">ULBI</span>. 
              Membawa <span class="text-brand-text font-medium">3 tahun pengalaman profesional</span> dalam membangun arsitektur Web & Mobile modern.
            </p>
            <p>
              Saya menggabungkan antarmuka interaktif dengan performa backend tangguh untuk menciptakan ekosistem aplikasi yang scalable dan berdampak nyata.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <a
              href="#proyek"
              class="group relative inline-flex items-center justify-center bg-brand-text text-brand-bg font-bold py-4 px-8 uppercase tracking-widest text-xs transition-transform duration-300 ease-editorial hover:bg-brand-primary focus-visible:outline-2 focus-visible:outline-brand-focus"
            >
              Lihat Karya Saya
              <span class="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-editorial">→</span>
            </a>
            <a
              href="#kontak"
              class="inline-flex items-center justify-center border border-brand-border bg-transparent text-brand-text font-bold py-4 px-8 uppercase tracking-widest text-xs transition-colors duration-300 ease-editorial hover:border-brand-text hover:bg-brand-surface focus-visible:outline-2 focus-visible:outline-brand-focus"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        <!-- Image (Right Aligned, Asymmetric) -->
        <div class="w-full md:w-1/3 mt-8 md:mt-0 relative">
          <!-- Decorative element behind image -->
          <div class="absolute -top-6 -right-6 w-full h-full bg-brand-surface border border-brand-border z-0 hidden md:block"></div>
          
          <div class="relative z-10 aspect-[3/4] w-full max-w-sm mx-auto md:ml-auto overflow-hidden bg-brand-surface border border-brand-border">
            <img 
              src="/images/profile.jpg" 
              alt="Foto Profil Muhammad Rifky" 
              class="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700 ease-editorial"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
