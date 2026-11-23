// Service Worker: Dinamika Litosfer (Universitas Negeri Malang) - Offline Cache
const CACHE_NAME = 'dinamika-litosfer-v3';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/icons/icon.svg',
  '/assets/icons/struktur-bumi.webp',
  '/assets/icons/lempeng-tektonik.webp',
  '/assets/icons/vulkanisme.webp',
  '/assets/icons/tenaga-endogen.webp',
  '/assets/icons/quiz.webp',
  '/assets/images/Lambang-UM.webp',
  '/assets/images/earth_daymap.webp'
];

// 1. Install Event: Pre-cache aset berat kejuruan (3D GLB & Tekstur Satelit NASA)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          PRECACHE_ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[SW] Gagal pre-cache aset:', url, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Bersihkan cache versi lama secara otomatis
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Strategi Hibrida Network-First (SPA) & Cache-First (Media 3D)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // A. Navigasi SPA (Rute Klien: /modul/struktur, /kuis, dll)
  // Network-First dengan Fallback ke /index.html saat offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cachedIndex = await caches.match('/index.html');
        if (cachedIndex) return cachedIndex;
        const cachedRoot = await caches.match('/');
        return cachedRoot || Response.error();
      })
    );
    return;
  }

  // B. Chunk JS/CSS Ber-Hash Vite (Same-Origin): Immutable Cache-First
  const isHashedBundle =
    url.origin === self.location.origin &&
    url.pathname.startsWith('/assets/') &&
    (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'));

  if (isHashedBundle) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // C. Aset Statis, Font & Tekstur WebP: Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Sajikan langsung dari cache, lalu revalidate di latar belakang jika online
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        // Jika belum ada di cache, ambil dari jaringan lalu simpan
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            return Response.error();
          });
      })
    );
    return;
  }

  // C. Permintaan Lainnya: Default Network dengan fallback cache
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});
