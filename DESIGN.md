# DESIGN.md - Panduan UI/UX Portfolio

## 1. Konsep Visual
**"Architectural Print (Light Mode)"**
Desain mengadopsi struktur editorial majalah atau cetak biru arsitektur. Ruang putih (*whitespace*) sangat melimpah, struktur grid yang kaku, dan teks sebagai pemeran utama. Sama sekali tidak ada dekorasi klise (tanpa panah/simbol tak bermakna, tanpa *glow*, tanpa *glassmorphism*).

## 2. Palet Warna (High Contrast)
Disusun dengan presisi untuk memenuhi standar aksesibilitas WCAG, diverifikasi menggunakan perhitungan luminasi skrip.

*   **Background:** `#fcfcfc` (Putih kertas murni)
*   **Surface:** `#f4f4f5` (Abu-abu terang untuk *highlight* elemen)
*   **Text Primary:** `#18181b` (Arang pekat) 
    *   *Kontras:* 17.27:1 (terhadap Background), 16.12:1 (terhadap Surface)
*   **Text Muted:** `#52525b` (Abu-abu gelap untuk deskripsi/metadata)
    *   *Kontras:* 7.53:1 (terhadap Background)
*   **Accent:** `#b8152e` (Merah bata/kirmizi editorial - bukan merah bawaan Tailwind)
    *   *Kontras:* 6.43:1 (terhadap Background)
*   **Focus Ring:** `#1d4ed8` (Biru elektrik solid untuk visibilitas keyboard nav)
    *   *Kontras:* 6.53:1 (terhadap Background - *Lulus syarat 3:1*)

## 3. Tipografi
Diambil via `<link>` Google Fonts dengan `display=swap`. Tanpa tambahan dependensi NPM.
*   **Heading:** `Lora` (Serif). Elegan, mapan, dan tajam.
*   **Body:** `Public Sans` (Sans-serif). Sangat netral untuk pembacaan panjang.
*   **Metadata:** `Fira Code` (Monospace). Hanya untuk tanggal, label *tech stack*, dan peran. **Ligature dimatikan** secara eksplisit via CSS (`font-variant-ligatures: none`).

## 4. Spacing & Ritme
Transisi *fluid* dari Mobile (375px) ke Desktop (1280px) menggunakan `clamp()`. Ritme antar *section* divariasikan untuk menghindari kesan kaku (*template*), dengan nilai maksimal dijaga tidak lebih dari 160px:
*   **Hero ke Projects:** `clamp(4rem, 8vw, 10rem)` (Min: 64px, Max: 160px)
*   **Projects ke Publications:** `clamp(3rem, 6vw, 7.5rem)` (Min: 48px, Max: 120px)
*   **Publications ke Certifications:** `clamp(4rem, 10vw, 9rem)` (Min: 64px, Max: 144px)

## 5. Gaya Komponen & Elemen
*   **Bentuk:** Presisi mutlak. Radius pinggiran (`border-radius`) disetel menjadi `0` atau dibuang untuk semua elemen.
*   **Garis / Border:** Pemisah *section* atau item *list* menggunakan garis solid `1px` berwarna `#d4d4d8`.
*   **Tombol:** Kotak solid atau *outline*. Teks rata tengah. Sama sekali tidak menggunakan ornamen panah (seperti `→` atau ikon panah SVG).
*   **Gambar Proyek:** Ditampilkan apa adanya (penuh warna). Persegi bersudut tajam tanpa efek manipulasi *grayscale* dan tanpa animasi saat di-*hover*.

## 6. Aksesibilitas, Fokus, & Motion (A11y)
*   **Focus State:** Semua elemen interaktif *wajib* memiliki `outline: 2px solid #1d4ed8` dengan `outline-offset: 2px`. Tidak akan dihapus dan tidak bergantung hanya pada perubahan *hover*.
*   **Motion:** Segala bentuk transisi (seperti *hover* efek latar tombol) akan tunduk pada `@media (prefers-reduced-motion: reduce)`. Jika preferensi aktif, semua transisi berubah seketika (0ms).
*   **Modal & Mobile Menu Overlay:**
    *   Mendukung tombol `Escape` untuk menutup.
    *   Fokus terperangkap (*focus trap*) selama *overlay* terbuka.
    *   Fokus otomatis kembali ke elemen pemicu (*trigger*) ketika *overlay* ditutup.
    *   Menggunakan atribut `aria-modal="true"`, `role="dialog"`, dan `aria-expanded` yang valid.
    *   Tombol *Close* berupa teks tebal "Close" yang *selalu terlihat* jelas (termasuk pada viewport sempit 375px), bukan ikon 'X' mungil.

## 7. Aturan Per Section
1.  **Navbar & Footer:** Navbar bersih tanpa *glassmorphism*. Di mobile, berubah menjadi layar *fullscreen* putih pekat dengan teks tautan besar. Footer diletakkan rata kiri, padat, dengan informasi yang mutlak fungsional.
2.  **Hero:** *Layout* diubah total. Teks merapat ke kiri. Menyertakan frasa "Fresh Graduate" persis apa adanya tanpa elemen *bullet* pemisah atau status *online* palsu. Ornamen penyebab *overflow* horizontal dihapus secara tuntas dari akarnya, dan `overflow-x-hidden` global dari HTML/body dicabut.
3.  **Projects:** Disusun mirip katalog eksibisi. Grid ketat atau linear bergantung lebar layar, memisahkan gambar dan teks tanpa elemen tumpang tindih. Metadata dicetak kecil dengan font *monospace*.
4.  **Publications & Certifications:** Tampil layaknya daftar pustaka akademis. Baris-baris bergaris bawah tipis, rapi secara tipografi, dan sangat ringkas.
