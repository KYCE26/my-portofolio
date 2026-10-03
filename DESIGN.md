# Visual Design System: "Neo-Editorial Developer"

## Core Concept
A highly functional, premium editorial design tailored for a Full-Stack & Mobile Developer. It eschews generic "tech" templates (glows, glassmorphism) in favor of high-contrast, structured, and legible layouts that feel crafted.

## Chosen Modern Directions
1. **Tipografi Besar & Ekspresif (Kontras Berani):** Menggunakan kombinasi font Serif (Lora) yang elegan untuk heading besar, disandingkan dengan Sans-Serif (Public Sans) yang bersih dan Mono (Fira Code) untuk detail teknis. Membangun hierarki murni lewat ukuran teks, bukan dekorasi.
2. **Layout Editorial Asimetris:** Meninggalkan pakem "tengah rata" (centered). Layout akan lebih berat di kiri (left-aligned), menggunakan ruang kosong (white space) yang asimetris untuk memandu mata, memberi kesan profesional seperti membaca majalah cetak.
3. **Warna Aksen Tajam di atas Palet Netral Tenang:** Warna dasar menggunakan putih bersih dan abu-abu (Zinc), dipadu dengan satu warna aksen yang tajam (Bright Emerald / Electric Green) yang hanya digunakan untuk tindakan (CTA), interaksi, dan penanda fokus, menjaga rasio kontras maksimal (aksesibel).

## Typography Scale
- H1 (Hero): 4rem - 7rem (fluid), Serif, tight tracking.
- H2 (Section): 2.5rem - 4rem, Serif, tight tracking.
- Body: 1rem - 1.125rem, Sans-serif, relaxed line-height (1.7).
- Meta/Tags: 0.75rem - 0.875rem, Mono, uppercase, wide tracking.

## Color Palette (Tokens)
- rand-bg: #FAFAFA (Off-white)
- rand-surface: #F4F4F5 (Zinc-100, form backgrounds, subtle borders)
- rand-text: #09090B (Zinc-950, highest contrast for text)
- rand-subtext: #52525B (Zinc-600)
- rand-primary: #059669 (Emerald-600, sharp green for primary actions)
- rand-focus: #059669 (Emerald-600)

## UI Elements
- **Borders:** Thin (1px) and sharp (#E4E4E7). No heavy shadows.
- **Radius:** 0px (Sharp corners) to maintain the brutalist/editorial aesthetic.
- **Interactions:** Subtle background color shifts, crisp outlines on focus (2px solid brand-primary), and fast transform transitions (duration-200).
- **Admin Dashboard:** Follows the exact same typographic rules and tokens, but optimized for density (tables, forms) rather than expansive white space.
