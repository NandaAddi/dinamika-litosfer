import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';

// Inisialisasi progress controller untuk preloader yang halus dan responsif 60fps
function setupPreloader() {
  const pre = document.getElementById('preloader');
  const bar = document.getElementById('pre-bar');
  const status = document.getElementById('pre-status');
  if (!pre || !bar) return () => {};

  let progress = 12;
  const statusMessages = [
    'Menyiapkan media interaktif...',
    'Memuat visualisasi kebumian...',
    'Menyusun materi geografi...',
    'Siap untuk belajar!'
  ];

  const interval = setInterval(() => {
    progress += 8;
    if (progress > 85) progress = 85;
    bar.style.width = `${progress}%`;

    if (progress >= 30 && progress < 60 && status) status.textContent = statusMessages[1];
    else if (progress >= 60 && status) status.textContent = statusMessages[2];
  }, 60);

  return function finish() {
    clearInterval(interval);
    pre.style.pointerEvents = 'none';
    if (bar) bar.style.width = '100%';
    if (status) status.textContent = statusMessages[3];

    setTimeout(() => {
      pre.classList.add('fade-out');
      setTimeout(() => {
        pre.remove();
        // Beri tahu halaman bahwa preloader telah selesai dan transisi siap
        window.dispatchEvent(new CustomEvent('app:ready'));
      }, 500);
    }, 180);
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

  // Selesaikan preloader segera setelah mount awal React selesai
  setTimeout(finishPreloader, 320);
}
