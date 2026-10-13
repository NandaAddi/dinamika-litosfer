# 🌍 Dinamika Litosfer — Media Pembelajaran Geografi Interaktif

Media pembelajaran digital interaktif berbasis web untuk materi **Dinamika Litosfer dan Pengaruhnya terhadap Kehidupan**, dikembangkan bekerja sama dengan **Departemen Geografi, Fakultas Ilmu Sosial, Universitas Negeri Malang** dan **Diktisaintek Berdampak**.

---

## 🌟 Fitur Utama

- **🧊 4 Visualisasi 3D Interaktif (Sketchfab Integration):**
  - **Struktur Lapisan Bumi:** Potongan anatomi 3D lapisan kerak, mantel, inti luar, dan inti dalam.
  - **Lempeng Tektonik:** Visualisasi interaktif kerak lempeng litosfer bumi.
  - **Vulkanisme:** Potongan melintang 3D dapur magma, pipa kepundan (*diatrema*), sill, dan kawah.
  - **Tenaga Endogen & Geomorfologi:** Model 3D morfologi potongan melintang Gunung Semeru.
- **📖 Slider Pembelajaran Interaktif (4-Step Guided Learning):**
  - Tata letak *no-scroll split-screen* (50:50) yang memadukan model 3D dan kartu penjelasan konsep.
  - Dilengkapi *stepper track*, kartu sorotan konsep (*highlight box*), *chips* materi, dan tombol navigasi taktil.
- **📝 Kuis Evaluasi Interaktif:**
  - 10 soal evaluasi berbobot dengan diagram visual ilmiah (sesar/graben, batas divergen, dll.).
  - Umpan balik (*feedback*) otomatis, kalkulasi skor dinamis, dan cincin statistik persentase kelulusan.
- **🎨 Latar Belakang Fotografi Alam Sinematik (16:9 Widescreen):**
  - Setiap halaman memiliki gambar atmosferik beresolusi tinggi dengan teknik *Deep Cinematic Vignette* dan kartu materi *glassmorphism* lembut yang nyaman di mata.
- **⚡ Preloader Interaktif:**
  - Dilengkapi animasi Lambang Universitas Negeri Malang (*glow pulse & orbital spinner*) serta progress bar dinamis.
- **📱 Responsif & Adaptif:**
  - Mendukung tampilan Desktop layar lebar hingga Mobile *bottom-bar navigation* dan tombol *switch view* (Model 3D ↔ Slide Materi).

---

## 📁 Struktur Direktori Proyek

```text
dinamika-litosfer/
├── assets/
│   ├── css/
│   │   └── style.css            # Stylesheet utama (desain sistem, tema, animasi taktil, layout split)
│   ├── js/
│   │   └── main.js              # Controller navigasi, slider materi, logika kuis, dan preloader
│   └── images/
│       ├── Lambang-UM.webp      # Logo resmi Universitas Negeri Malang
│       ├── Picture1.png         # Banner kemitraan resmi departemen & kementerian
│       ├── bg_beranda.jpg       # Latar sinematik bumi dari orbit
│       ├── bg_struktur.jpg      # Latar tebing stratigrafi lapisan bumi
│       ├── bg_lempeng.jpg       # Latar patahan rekahan tektonik
│       ├── bg_vulkanisme.jpg    # Latar gunung api aktif & magma
│       ├── bg_endogen.jpg       # Latar ngarai patahan graben
│       └── bg_kuis.jpg          # Latar malam kosmik litosfer
├── index.html                   # Entrypoint aplikasi web
├── .gitignore                   # Konfigurasi file yang diabaikan git
└── README.md                    # Dokumentasi lengkap proyek
```

---

## 🚀 Cara Menjalankan Proyek

Aplikasi ini dibangun menggunakan teknologi web murni (*Vanilla HTML, CSS, JS*) tanpa dependensi *build-tools*, sehingga dapat langsung dijalankan:

### Opsi 1: Buka Langsung di Browser
Klik dua kali file `index.html` atau buka melalui browser pilihan Anda (`Google Chrome`, `Microsoft Edge`, `Mozilla Firefox`, `Safari`).

### Opsi 2: Menggunakan Live Server (VS Code)
1. Buka folder proyek di Visual Studio Code.
2. Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.
3. Akses via `http://localhost:5500` (atau port yang ditentukan).

---

## 🛠️ Teknologi yang Digunakan

- **HTML5:** Struktur semantik, aksesibilitas, dan viewport mobile teroptimasi.
- **Vanilla CSS3:** CSS Custom Properties (*tokens*), CSS Grid, Flexbox, Glassmorphism (*backdrop-filter*), dan *Duolingo-style 3D push tactile buttons*.
- **Vanilla JavaScript (ES6+):** Logika modular *state management*, event handling, DOM manipulation, dan progress calculation.
- **Tipografi Google Fonts:** *Plus Jakarta Sans* (Body Text) & *Bricolage Grotesque* (Headings & Display).
- **Sketchfab WebGL API:** Integrasi model 3D interaktif real-time.

---

## 🏛️ Kemitraan & Lisensi

- **Institusi:** Departemen Geografi · Fakultas Ilmu Sosial · Universitas Negeri Malang
- **Program:** Diktisaintek Berdampak
- **3D Models Attribution:** Model 3D bersumber dari kreator Sketchfab di bawah lisensi Creative Commons Attribution.
