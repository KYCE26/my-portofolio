// Simpan gambar-gambar proyek di dalam folder `public/images/`
// Jadi path-nya cukup ditulis '/images/nama-file.png'

export const projects = [
  {
    id: 1,
    title: 'SIDIMAS - Distribusi Makanan',
    category: 'Website',
    image: '/images/SIDIMAS.PNG',
    description: 'Frontend untuk aplikasi sistem informasi distribusi makanan gratis untuk masyarakat, dibangun dengan antarmuka yang responsif dan modern.',
    tags: ['Vue.js', 'Vite', 'Tailwind CSS'],
    repoUrl: 'https://github.com/KYCE26/tesvitevue'
  },
  {
    id: 2,
    title: 'SITEKAD - Sistem Informasi Tenaga Kerja Ahli Daya',
    category: 'Mobile App',
    image: '/images/sitekad.png',
    description: 'Aplikasi absensi mobile native Android untuk memonitor kehadiran karyawan dengan fitur QR Code scanner dan pelacakan lokasi.',
    tags: ['Kotlin', 'Jetpack Compose', 'Volley'],
    repoUrl: 'https://github.com/KYCE26/SITEKAD-MOBILE'
  },
  {
    id: 3,
    title: 'Face Detection',
    category: 'Mobile App',
    image: '/images/face-detector.png',
    description: 'Machine Learning untuk deteksi wajah menggunakan model pra-latih dari Google ML Kit dan fitur ekstraksi face embedded, diintegrasikan dalam aplikasi mobile Android.',
    tags: ['Kotlin', 'TensorflowLite', 'ML Kit'],
    repoUrl: 'https://github.com/KYCE26/FaceDetector-Mobile'
  },
    {
    id: 4,
    title: 'Hotel El Gasing',
    category: 'Web Mobile App',
    image: '/images/elgasing.png',
    description: 'Aplikasi pemesanan hotel berbasis web dengan fitur pencarian, pemesanan, dan manajemen kamar. Dibangun dengan teknologi modern untuk pengalaman pengguna yang optimal.',
    tags: ['VanillaJS', 'FireBase', 'Tailwind CSS'],
    repoUrl: 'https://github.com/POSHotelELGasing/HotelElGasing.github.io'
  },
    {
    id: 5,
    title: 'Proyek Pertama - Rental Mobil',
    category: 'Website',
    image: '/images/Proyek1.png',
    description: 'Website sistem informasi rental mobil sederhana dengan fitur manajemen data mobil, pelanggan, dan transaksi menggunakan PHP dan MySQL.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/KYCE26/PROYEK1'
  },
    {
    id: 6,
    title: 'RJ RENT - Rental Mobil',
    category: 'Website',
    image: '/images/Proyek2.png',
    description: 'Website sistem informasi rental mobil dengan fitur manajemen data mobil, pelanggan, dan transaksi menggunakan PHP dan MySQL.',
    tags: ['PHP', 'MySQL', 'Laravel', 'Bootstrap'],
    repoUrl: 'https://github.com/KYCE26/RJ_RENT'
  },
  // Tambahkan proyek-proyekmu yang lain di sini dengan format yang sama
];