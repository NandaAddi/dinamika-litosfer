// ==========================================================================
// PWA & OFFLINE MANAGER - DINAMIKA LITOSFER
// Mengelola Registrasi Service Worker, Prompt Instalasi & Status Koneksi
// ==========================================================================

export interface PWAState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isOfflineReady: boolean;
}

let deferredPrompt: any = null;
const listeners = new Set<(state: PWAState) => void>();

const currentState: PWAState = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isInstallable: false,
  isInstalled: false,
  isOfflineReady: false
};

function notify(): void {
  listeners.forEach((listener) => listener({ ...currentState }));
}

// Deteksi apakah sedang dibuka dalam mode standalone (sudah terinstal)
if (typeof window !== 'undefined') {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;
  currentState.isInstalled = isStandalone;

  // Pantau perubahan koneksi internet
  window.addEventListener('online', () => {
    currentState.isOnline = true;
    notify();
  });

  window.addEventListener('offline', () => {
    currentState.isOnline = false;
    notify();
  });

  // Tangkap event sebelum instalasi browser (Chrome / Edge / Android)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    currentState.isInstallable = true;
    notify();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    currentState.isInstallable = false;
    currentState.isInstalled = true;
    notify();
  });
}

export function subscribePWA(listener: (state: PWAState) => void): () => void {
  listeners.add(listener);
  listener({ ...currentState });
  return () => listeners.delete(listener);
}

export function getPWAState(): PWAState {
  return { ...currentState };
}

export async function promptPWAInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    return false;
  }
  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    currentState.isInstallable = false;
    notify();
    return outcome === 'accepted';
  } catch {
    return false;
  }
}

export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Daftarkan Service Worker setelah halaman selesai dimuat sepenuhnya
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        // Cek apakah service worker sudah aktif meng-cache
        if (reg.active) {
          currentState.isOfflineReady = true;
          notify();
        }

        reg.addEventListener('updatefound', () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (
                installingWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                currentState.isOfflineReady = true;
                notify();
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('[PWA] Registrasi Service Worker gagal:', err);
      });
  });
}
