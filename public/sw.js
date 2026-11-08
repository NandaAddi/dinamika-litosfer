// ==========================================================================
// SERVICE WORKER - DINAMIKA LITOSFER (UNIVERSITAS NEGERI MALANG)
// Offline-First Caching for 3T School Computer Labs
// ==========================================================================

const CACHE_NAME = 'dinamika-litosfer-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/icons/icon.svg',
  '/assets/images/Lambang-UM.webp',
  '/assets/images/earth_daymap.jpg',
  '/assets/images/bg_beranda.jpg',
  '/assets/images/bg_struktur.jpg',
  '/assets/images/bg_lempeng.jpg',
  '/assets/images/bg_vulkanisme.jpg',
  '/assets/images/bg_endogen.jpg',
  '/assets/images/bg_kuis.jpg',
  '/assets/models/struktur-bumi.glb',
  '/assets/models/lempeng-tektonik.glb',
  '/assets/models/vulkanisme.glb',
  '/assets/models/tenaga-endogen.glb'
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

  // B. Aset Statis, Font, Tekstur Blue Marble, dan Model 3D GLB
  // Cache-First dengan Stale-While-Revalidate untuk performa loading 0ms
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.glb') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
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
