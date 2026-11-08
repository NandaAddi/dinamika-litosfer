# 🌍 Dinamika Litosfer — Media Pembelajaran Geografi Interaktif (Vite + React)

Media pembelajaran digital interaktif berbasis web untuk materi **Dinamika Litosfer dan Pengaruhnya terhadap Kehidupan**, dikembangkan bekerja sama dengan **Departemen Geografi, Fakultas Ilmu Sosial, Universitas Negeri Malang** dan **Diktisaintek Berdampak**.

Aplikasi ini telah dimigrasikan dari file monolitik ke arsitektur modern berbasis **Vite + React 18 + TypeScript + React Router DOM**, dengan tetap mempertahankan 100% fidelitas grafis dari 4 engine WebGL 3D fotorealistis serta styling cyber-geo glassmorphism yang sudah teruji.

---

## 🌟 Fitur Utama

- **🧊 4 Engine Visualisasi 3D WebGL Fotorealistis Modular (React Canvas Wrappers):**
  - **Modul 1 & Beranda — Struktur Lapisan Bumi (`Earth3DViewer.js` / `<EarthViewer />`):** Model 3D *cutaway* 4 lapisan konsentris (Kerak `SiAl/SiMa`, Mantel Astenosfer, Inti Luar Cair, Inti Dalam Padat) dengan tekstur satelit fotorealistik NASA Blue Marble (`earth_daymap.jpg`), *normal/bump mapping*, spekular samudra, awan bergerak, serta simulasi gelombang seismik P & S, diskontinuitas *Moho–Gutenberg–Lehmann*, arus konveksi mantel, dan medan magnet *geodynamo*.
  - **Modul 2 — Lempeng Tektonik (`Tectonic3DViewer.js` / `<TectonicViewer />`):** Diorama 3D dinamika litosfer–astenosfer (Lempeng Samudra `SiMa`, Lempeng Benua `SiAl`, Busur Vulkanik, Palung Subduksi, Punggungan Tengah Samudra) dengan animasi apungan benua Wegener, 3 gaya penggerak (*Mantle Drag, Ridge Push, Slab Pull*), Subduksi *Sunda Megathrust*, *Seafloor Spreading*, dan Sesar *Transform*.
  - **Modul 3 — Vulkanisme: Anatomi Gunung Semeru (`Volcano3DViewer.js` / `<VolcanoViewer />`):** Model 3D *cutaway* 90° **Gunung Semeru (Mahameru 3.676 mdpl, Kawah Jonggring Saloko, Curah/Besuk Kobokan, Ranu Kumbolo 2.400 mdpl)** lengkap dengan Batolit, Dapur Magma, Lakolit, Sill, Dike/Korok, Apolisa, Diatrema, serta simulasi erupsi efusif-eksplosif, guguran kubah lava & Awan Panas (*Wedhus Gembel*), kolom Plinian, asap kembang kol tipe Vulkano, dan zonasi batuan beku.
  - **Modul 4 — Tenaga Endogen & Siklus Batuan (`Endogen3DViewer.js` / `<EndogenViewer />`):** Diorama blok geologi 3D berlapis yang menampilkan **Lipatan Antiklin & Sinklin + Perangkap Migas**, **Patahan Horst & Graben (Ngarai Sianok)**, **Klasifikasi Sesar Normal/Naik/Mendatar & Lipatan Rebah**, **Siklus Batuan (*Rock Cycle*)**, **Batuan Sedimen (Karst Gamping, Batu Pasir, Batu Bara)**, **Batuan Metamorf (Marmer Tulungagung & Batu Sabak)**, serta **Progradasi Delta Bengawan Solo & *Land Subsidence* Jakarta**.
- **📖 Slider Pembelajaran Interaktif (5–8 slide per modul):**
  - Jumlah slide: Beranda 2, Struktur Bumi 5, Lempeng Tektonik 5, Vulkanisme 7, Tenaga Endogen 8.
  - Tata letak *no-scroll split-screen* (50:50) yang memadukan model 3D dan kartu penjelasan konsep.
  - Dilengkapi *stepper track*, kartu sorotan konsep (*highlight box*), *chips* materi, dan tombol navigasi taktil.
  - Modul Tenaga Endogen memuat diagram SVG **Siklus Batuan** (*rock cycle*).
- **📝 Kuis Evaluasi Interaktif (13 Soal HOTS):**
  - 13 soal evaluasi dengan diagram visual ilmiah (sesar/graben, batas divergen) dan soal petrologi serta geodinamika.
  - Umpan balik (*feedback*) penjelasan akademik seketika, kalkulasi skor dinamis, animasi *confetti* untuk nilai kelulusan, dan cincin statistik persentase kelulusan.
- **📚 Referensi Literatur Akademik:**
  - Modal referensi literatur memuat 8 rujukan buku teks dan jurnal geologi terakreditasi (USGS, PVMBG, Tarbuck & Lutgens, Bronto, dll.).
- **⚡ Preloader Interaktif Resmi UM:**
  - Dilengkapi animasi Lambang Universitas Negeri Malang (*glow pulse & orbital spinner*) serta progress bar dinamis.
- **📱 Responsif & Adaptif:**
  - Mendukung tampilan Desktop layar lebar hingga Mobile dengan tombol *switch view* (Model 3D ↔ Slide Materi).

---

## 📁 Struktur Direktori Proyek

```text
dinamika-litosfer/
├── dist/                          # Hasil kompilasi produksi statis siap deploy
├── legacy/                        # Cadangan aman kode lama monolitik
│   └── index.legacy.html
├── public/                        # Aset publik statis (gambar, tekstur NASA, model GLB)
│   └── assets/
│       ├── images/
│       └── models/
├── src/
│   ├── components/
│   │   ├── 3d/                    # React Canvas Wrappers 4 Engine 3D
│   │   │   ├── EarthViewer.tsx
│   │   │   ├── TectonicViewer.tsx
│   │   │   ├── VolcanoViewer.tsx
│   │   │   └── EndogenViewer.tsx
│   │   ├── common/                # Komponen umum (SliderContainer, ReferenceModal)
│   │   └── layout/                # Layout utama (Sidebar, Header, MainLayout)
│   ├── data/                      # Skema data terstruktur TypeScript
│   │   ├── modules/               # Data materi kurikulum Modul 1–4
│   │   ├── quiz.ts                # Bank 13 Soal Kuis HOTS & Pembahasan
│   │   └── references.ts          # Daftar Pustaka Geologi
│   ├── engines/                   # 4 Engine WebGL Modular ES6 Classes
│   │   ├── earth/
│   │   ├── tectonic/
│   │   ├── volcano/
│   │   └── endogen/
│   ├── pages/                     # Halaman Rute
│   │   ├── HomePage.tsx           # Beranda & Capaian Pembelajaran
│   │   ├── ModulePage.tsx         # Template Materi Modul 1–4
│   │   └── QuizPage.tsx           # Halaman Kuis Interaktif
│   ├── styles/                    # Styling Cyber-Geo & Glassmorphism
│   │   └── style.css
│   ├── types/                     # Antarmuka TypeScript
│   │   └── index.ts
│   ├── App.tsx                    # Root Routing React Router DOM
│   └── main.tsx                   # Titik masuk utama aplikasi React
├── index.html                     # Template root Vite
├── package.json                   # Dependensi & NPM scripts
├── tsconfig.json                  # Konfigurasi TypeScript
└── vite.config.ts                 # Konfigurasi Vite
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Mode Pengembangan (Development)
Untuk menjalankan server lokal dengan fitur *Hot Module Replacement (HMR)*:
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan di terminal (default: `http://localhost:3000`).

### 2. Kompilasi Produksi (Production Build)
Untuk membangun bundel statis teroptimasi untuk deployment:
```bash
npm run build
```
Hasil build akan tersimpan di dalam folder `dist/` dan siap diunggah ke Vercel, Netlify, cPanel kampus, atau server web statis lainnya.

### 3. Pratinjau Build (Preview)
Untuk menguji hasil build produksi secara lokal:
```bash
npm run preview
```

---

## 🛠️ Teknologi yang Digunakan

- **React 18:** Library UI berbasis komponen reaktif.
- **TypeScript:** Type safety dan interface modular untuk data kurikulum dan state.
- **Vite:** Build tool modern dengan kecepatan kompilasi instan.
- **React Router DOM (v6):** Routing SPA modern dengan URL bersih (`/`, `/modul/:id`, `/kuis`).
- **WebGL 1.0/2.0 API & GLSL Shaders:** Mesin grafis 3D real-time dengan normal/bump mapping analitik, shading 3-titik, dan collision avoidance HUD 2D.
- **Canvas Confetti:** Efek selebrasi visual pencapaian kelulusan kuis.
- **CSS3 Glassmorphism:** Desain cyber-geo teruji, adaptif, dan responsif.

---

## 🏛️ Kemitraan & Lisensi

- **Institusi:** Departemen Geografi · Fakultas Ilmu Sosial · Universitas Negeri Malang
- **Program:** Diktisaintek Berdampak
