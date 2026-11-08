import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';

// Background images yang akan di-preload di background saat browser idle
const BACKGROUND_IMAGES = [
  '/assets/images/bg_beranda.jpg',
  '/assets/images/bg_struktur.jpg',
  '/assets/images/bg_lempeng.jpg',
  '/assets/images/bg_vulkanisme.jpg',
  '/assets/images/bg_endogen.jpg',
  '/assets/images/bg_kuis.jpg'
];

function preloadBackgrounds() {
  BACKGROUND_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

// Inisialisasi progress controller untuk preloader yang halus dan responsif
function setupPreloader() {
  const pre = document.getElementById('preloader');
  const bar = document.getElementById('pre-bar');
  const status = document.getElementById('pre-status');
  if (!pre || !bar) return () => {};

  let progress = 0;
  const statusMessages = [
    'Menyiapkan media interaktif...',
    'Memuat visualisasi 3D bumi...',
    'Menyusun materi geografi...',
    'Siap untuk belajar!'
  ];

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 10;
    if (progress > 88) progress = 88; // Tahan di 88% hingga render selesai
    bar.style.width = `${progress}%`;

    if (progress >= 30 && progress < 60 && status) status.textContent = statusMessages[1];
    else if (progress >= 60 && status) status.textContent = statusMessages[2];
  }, 90);

  return function finish() {
    clearInterval(interval);
    pre.style.pointerEvents = 'none';
    if (bar) bar.style.width = '100%';
    if (status) status.textContent = statusMessages[3];
    setTimeout(() => {
      pre.classList.add('fade-out');
      setTimeout(() => {
        pre.remove();
        // Preload background images secara santai setelah preloader selesai dan interaksi siap
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(preloadBackgrounds);
        } else {
          setTimeout(preloadBackgrounds, 1000);
        }
      }, 550);
    }, 200);
  };
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const finishPreloader = setupPreloader();

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Selesaikan preloader segera setelah mount awal selesai
  setTimeout(finishPreloader, 350);
}
