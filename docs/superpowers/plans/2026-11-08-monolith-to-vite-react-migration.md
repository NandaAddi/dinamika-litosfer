# Migrasi Monolitik index.html ke Vite + React + TypeScript Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memecah website media pembelajaran interaktif Dinamika Litosfer dari satu file HTML monolitik (`index.html`) menjadi arsitektur modern berbasis Vite + React + TypeScript + React Router DOM dengan tetap mempertahankan 100% fidelitas grafis 4 engine WebGL 3D fotorealistis dan integritas styling `style.css`.

**Architecture:** Memanfaatkan Vite sebagai build tool modern berkecepatan tinggi, React Router DOM (BrowserRouter) untuk navigasi modular clean-URL (`/`, `/modul/:id`, `/kuis`), pemisahan konten kurikulum ke skema data TypeScript (`src/data/`), komponen UI reaktif modular (Sidebar, Header, Slider, Quiz), dan pembungkusan 4 engine WebGL 3D fotorealistis menggunakan React Canvas Wrapper (`useRef` + `useEffect` lifecycle) yang bebas memory leak.

**Tech Stack:** React 19, TypeScript, Vite, React Router DOM, WebGL 1.0/2.0 custom shaders, Canvas 2D HUD, CSS3 Cyber-Geo Theme & Glassmorphism.

---

## Global Constraints

- **Zero Graphic Regression**: Empat engine WebGL 3D (Struktur Bumi, Lempeng Tektonik Busur Sunda, Vulkanisme Semeru, Tenaga Endogen & Siklus Batuan) beserta shader procedurial, raymarching, normal map, dan HUD canvas harus berjalan 100% identik tanpa degradasi performa atau visual.
- **Zero Content Loss**: Seluruh materi akademis Kurikulum Merdeka Geografi SMA/MA (narasi geologis, kedalaman, suhu, komposisi batuan, dan 13 soal kuis HOTS) harus dimigrasikan secara utuh tanpa ada yang terpotong.
- **Offline / Hosting Compatibility**: Struktur build statis (`npm run build` -> `dist/`) harus dapat disajikan secara mulus pada server web modern, Vercel, cPanel, maupun environment lokal.
- **No Sketchfab Dependency**: Seluruh kode tidak boleh menyisakan ketergantungan atau iframe Sketchfab eksternal (sudah dibersihkan secara permanen).

---

## File Structure Map

```
d:\WEBENZE\intan/
├── legacy/
│   └── index.legacy.html                  # Backup file monolitik lama
├── public/
│   └── assets/
│       ├── images/                        # Peta satelit NASA, wallpaper modul, logo UM
│       └── models/                        # GLB fallback models
├── src/
│   ├── assets/                            # Aset internal modul
│   ├── components/
│   │   ├── 3d/                            # React Canvas Wrappers untuk 4 engine WebGL
│   │   │   ├── EarthViewer.tsx
│   │   │   ├── TectonicViewer.tsx
│   │   │   ├── VolcanoViewer.tsx
│   │   │   └── EndogenViewer.tsx
│   │   ├── common/                        # Komponen UI umum
│   │   │   ├── ReferenceModal.tsx
│   │   │   ├── SliderContainer.tsx
│   │   │   └── LayerDetailCard.tsx
│   │   └── layout/                        # Layout utama & navigasi
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── MainLayout.tsx
│   ├── data/                              # Data terstruktur materi & kuis
│   │   ├── modules/
│   │   │   ├── modul1.ts                  # Struktur Bumi (5 slide)
│   │   │   ├── modul2.ts                  # Lempeng Tektonik (5 slide)
│   │   │   ├── modul3.ts                  # Vulkanisme Semeru (7 slide)
│   │   │   └── modul4.ts                  # Tenaga Endogen & Batuan (8 slide)
│   │   ├── quiz.ts                        # 13 soal kuis HOTS & pembahasan
│   │   └── references.ts                  # Daftar rujukan akademik
│   ├── engines/                           # 4 Engine WebGL 3D Modular (ES6 Classes)
│   │   ├── earth/
│   │   │   ├── Earth3DViewer.js
│   │   │   └── earthTextureData.js
│   │   ├── tectonic/
│   │   │   └── Tectonic3DViewer.js
│   │   ├── volcano/
│   │   │   └── Volcano3DViewer.js
│   │   └── endogen/
│   │       └── Endogen3DViewer.js
│   ├── pages/                             # Halaman Rute
│   │   ├── HomePage.tsx                   # Beranda & Pengantar
│   │   ├── ModulePage.tsx                 # Halaman Pembelajaran Modul 1–4
│   │   └── QuizPage.tsx                   # Halaman Kuis Interaktif
│   ├── styles/
│   │   └── style.css                      # Styling cyber-geo & glassmorphism
│   ├── types/
│   │   └── index.ts                       # TypeScript interfaces
│   ├── App.tsx                            # Root Router & State Provider
│   └── main.tsx                           # Vite entry point
├── index.html                             # Vite template HTML root
├── package.json                           # Dependencies & NPM scripts
├── tsconfig.json                          # TypeScript configuration
├── tsconfig.node.json                     # Node config for Vite
└── vite.config.ts                         # Vite configuration
```

---

## Tasks

### Task 1: Backup Monolitik & Scaffolding Vite + React + TypeScript

**Files:**
- Create: `legacy/index.legacy.html` (copy dari `index.html`)
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html` (Vite template baru)
- Directory: `public/assets/images/`, `public/assets/models/`

**Interfaces:**
- Produces: Project root yang siap `npm install` dan `npm run dev`.

- [ ] **Step 1: Backup `index.html` lama ke `legacy/index.legacy.html`**
- [ ] **Step 2: Pindahkan aset gambar dan model 3D ke `public/assets/`**
- [ ] **Step 3: Buat `package.json` dengan dependencies: `react`, `react-dom`, `react-router-dom`, `lucide-react` (opsional), serta devDependencies `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`**
- [ ] **Step 4: Konfigurasi `vite.config.ts`, `tsconfig.json`, dan `tsconfig.node.json`**
- [ ] **Step 5: Buat file `index.html` root untuk Vite yang memuat `<div id="root"></div>` dan `<script type="module" src="/src/main.tsx"></script>`**
- [ ] **Step 6: Jalankan `npm install` di workspace**

---

### Task 2: Integrasi Styling & TypeScript Types

**Files:**
- Create: `src/types/index.ts`
- Create: `src/styles/style.css` (migrasi dari `assets/css/style.css` dengan update path gambar `/assets/images/...`)

**Interfaces:**
- Produces: Type definitions (`Slide`, `ModuleData`, `QuizQuestion`, `QuizResult`) dan styling global antarmuka.

- [ ] **Step 1: Definisikan tipe antarmuka di `src/types/index.ts` untuk modul, slide, layer 3D, dan kuis**
- [ ] **Step 2: Salin `assets/css/style.css` ke `src/styles/style.css` dan sesuaikan URL background image agar mengarah ke `/assets/images/...`**
- [ ] **Step 3: Pastikan tidak ada selector usang Sketchfab yang tertinggal**

---

### Task 3: Ekstraksi Data Kurikulum & Bank Soal Kuis ke Modul TypeScript

**Files:**
- Create: `src/data/modules/modul1.ts`
- Create: `src/data/modules/modul2.ts`
- Create: `src/data/modules/modul3.ts`
- Create: `src/data/modules/modul4.ts`
- Create: `src/data/quiz.ts`
- Create: `src/data/references.ts`

**Interfaces:**
- Produces: `MODULES_DATA: Record<string, ModuleData>`, `QUIZ_QUESTIONS: QuizQuestion[]`, `REFERENCES: ReferenceItem[]`.

- [ ] **Step 1: Ekstrak data materi Modul 1 (Struktur Lapisan Bumi: 5 slide + data lapisan)**
- [ ] **Step 2: Ekstrak data materi Modul 2 (Lempeng Tektonik: 5 slide + boundary types)**
- [ ] **Step 3: Ekstrak data materi Modul 3 (Vulkanisme Gunung Semeru: 7 slide + anatomi gunung)**
- [ ] **Step 4: Ekstrak data materi Modul 4 (Tenaga Endogen & Batuan: 8 slide + lipatan/patahan/siklus)**
- [ ] **Step 5: Ekstrak 13 butir soal kuis HOTS beserta kunci jawaban dan penjelasan akademik ke `src/data/quiz.ts`**
- [ ] **Step 6: Ekstrak daftar pustaka ke `src/data/references.ts`**

---

### Task 4: Modularisasi 4 Engine WebGL 3D ke ES Modules

**Files:**
- Create: `src/engines/earth/earthTextureData.js`
- Create: `src/engines/earth/Earth3DViewer.js`
- Create: `src/engines/tectonic/Tectonic3DViewer.js`
- Create: `src/engines/volcano/Volcano3DViewer.js`
- Create: `src/engines/endogen/Endogen3DViewer.js`

**Interfaces:**
- Produces: ES6 Exported classes: `export class Earth3DViewer`, `export class Tectonic3DViewer`, `export class Volcano3DViewer`, `export class Endogen3DViewer`. Masing-masing memiliki method lifecycle: `constructor(containerEl, options)`, `setSlide(slideIndex)`, `setPlaying(isPlaying)`, `toggleExplode()`, `resize()`, `destroy()`.

- [ ] **Step 1: Modularisasikan `earth-3d.js` dan tekstur NASA menjadi `src/engines/earth/Earth3DViewer.js` dengan export class dan method `destroy()` pembersih event listener & RAF**
- [ ] **Step 2: Modularisasikan `tectonic-3d.js` menjadi `src/engines/tectonic/Tectonic3DViewer.js` dengan export class dan method `destroy()`**
- [ ] **Step 3: Modularisasikan `volcano-3d.js` menjadi `src/engines/volcano/Volcano3DViewer.js` dengan export class dan method `destroy()`**
- [ ] **Step 4: Modularisasikan `endogen-3d.js` menjadi `src/engines/endogen/Endogen3DViewer.js` dengan export class dan method `destroy()`**

---

### Task 5: Pembuatan React Canvas Wrappers untuk WebGL 3D

**Files:**
- Create: `src/components/3d/EarthViewer.tsx`
- Create: `src/components/3d/TectonicViewer.tsx`
- Create: `src/components/3d/VolcanoViewer.tsx`
- Create: `src/components/3d/EndogenViewer.tsx`
- Create: `src/components/3d/ModelViewerContainer.tsx`

**Interfaces:**
- Props: `{ slideIndex: number; onLayerSelect?: (layer: any) => void; isPlaying: boolean; onTogglePlay: () => void; isExploded: boolean; onToggleExplode: () => void; }`
- Produces: Komponen React yang membungkus canvas WebGL dan HUD Canvas 2D dengan sinkronisasi reaktif ke slide dan pembersihan otomatis saat unmount.

- [ ] **Step 1: Buat `EarthViewer.tsx` dengan `useRef` untuk container canvas WebGL & HUD, inisialisasi pada `useEffect`, dan cleanup pada return function**
- [ ] **Step 2: Buat `TectonicViewer.tsx` dengan integrasi slide konvergen/divergen/transform**
- [ ] **Step 3: Buat `VolcanoViewer.tsx` dengan integrasi slide erupsi Semeru**
- [ ] **Step 4: Buat `EndogenViewer.tsx` dengan integrasi slide horst/graben/siklus batuan**
- [ ] **Step 5: Buat `ModelViewerContainer.tsx` sebagai frame terpadu (HUD banner, layer card, pills pemilih lapisan, tombol reset orbit, pause/play, pisahkan lapisan)**

---

### Task 6: Komponen Navigasi, Header, Modal, dan Layout

**Files:**
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MainLayout.tsx`
- Create: `src/components/common/ReferenceModal.tsx`
- Create: `src/components/common/SliderContainer.tsx`

**Interfaces:**
- Produces: Kerangka antarmuka responsif dengan transisi halaman yang mulus.

- [ ] **Step 1: Buat `Sidebar.tsx` dengan tautan navigasi (Beranda, Modul 1, 2, 3, 4, Kuis) menggunakan React Router `NavLink`**
- [ ] **Step 2: Buat `Header.tsx` dengan judul dinamis per rute, tombol Referensi PAI/Geografi, dan status progres**
- [ ] **Step 3: Buat `ReferenceModal.tsx` untuk popup rujukan geologi dan pedoman kurikulum**
- [ ] **Step 4: Buat `SliderContainer.tsx` (indikator langkah/stepper, narasi materi, tombol Sebelumnya & Selanjutnya)**
- [ ] **Step 5: Satukan dalam `MainLayout.tsx`**

---

### Task 7: Halaman Aplikasi (HomePage, ModulePage, QuizPage)

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ModulePage.tsx`
- Create: `src/pages/QuizPage.tsx`

**Interfaces:**
- Produces: Halaman fungsional lengkap yang merender materi dan interaktivitas.

- [ ] **Step 1: Buat `HomePage.tsx` memuat Hero Banner Dinamika Litosfer, 4 kartu ringkasan modul, capaian pembelajaran (CP), dan panduan navigasi**
- [ ] **Step 2: Buat `ModulePage.tsx` yang membaca ID modul dari URL (`/modul/:moduleId`), menyajikan materi slide di panel kiri, dan canvas 3D interaktif di panel kanan**
- [ ] **Step 3: Buat `QuizPage.tsx` dengan interaktivitas 13 soal kuis, navigasi nomor soal, kalkulasi skor real-time, evaluasi ketuntasan, dan ulasan pembahasan kunci jawaban**

---

### Task 8: Root Application, Routing & Verifikasi Build

**Files:**
- Create: `src/App.tsx`
- Create: `src/main.tsx`

**Interfaces:**
- Produces: Aplikasi React lengkap yang dapat di-build dengan `npm run build` dan dijalankan dengan `npm run dev`.

- [ ] **Step 1: Konfigurasi `src/App.tsx` dengan `BrowserRouter`, `Routes`, dan `Route` untuk `/`, `/modul/:moduleId`, `/kuis`, serta fallback redirect**
- [ ] **Step 2: Buat `src/main.tsx` yang me-render `<App />` ke DOM**
- [ ] **Step 3: Jalankan `npm run build` dan pastikan tidak ada type error atau bundling warning fatal**
- [ ] **Step 4: Jalankan verifikasi fungsional (test visualisasi 4 modul 3D, perpindahan slide, dan kuis) untuk memastikan 0% regresi**
