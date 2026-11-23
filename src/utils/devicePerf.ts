import { useEffect, useState } from 'react';

export interface DevicePerfProfile {
  isMobile: boolean;
  isLowEnd: boolean;
  maxDpr: number;
  hudDpr: number;
  useAntialias: boolean;
  useAlpha: boolean;
  shaderMobileLite: boolean;
  earthTexWidth: number;
  earthTexHeight: number;
  earthLatSegs: number;
  earthLonSegs: number;
  hudFrameSkip: number;
}

let cachedProfile: DevicePerfProfile | null = null;

function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const coarsePointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 900px)').matches;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return coarsePointer || narrowViewport || mobileUA;
}

export function getDevicePerfProfile(): DevicePerfProfile {
  if (cachedProfile) return cachedProfile;

  const isMobile = detectMobile();
  const cores =
    typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
      ? navigator.hardwareConcurrency
      : 8;
  const mem =
    typeof navigator !== 'undefined' && typeof (navigator as any).deviceMemory === 'number'
      ? (navigator as any).deviceMemory
      : 8;
  const isLowEnd = isMobile && (cores <= 4 || mem <= 4);

  if (isMobile) {
    cachedProfile = {
      isMobile: true,
      isLowEnd,
      maxDpr: isLowEnd ? 1.0 : 1.25,
      hudDpr: 1.0,
      useAntialias: false,
      useAlpha: true,
      shaderMobileLite: true,
      earthTexWidth: 1024,
      earthTexHeight: 512,
      earthLatSegs: isLowEnd ? 28 : 32,
      earthLonSegs: isLowEnd ? 40 : 48,
      hudFrameSkip: 2
    };
  } else {
    cachedProfile = {
      isMobile: false,
      isLowEnd: false,
      maxDpr: 2.0,
      hudDpr: 2.0,
      useAntialias: true,
      useAlpha: true,
      shaderMobileLite: false,
      earthTexWidth: 2048,
      earthTexHeight: 1024,
      earthLatSegs: 56,
      earthLonSegs: 80,
      hudFrameSkip: 1
    };
  }

  return cachedProfile;
}

/**
 * Menyiapkan source fragment shader sesuai profil perangkat.
 * Di mobile, menyuntikkan #define MOBILE_LITE dan menurunkan precision float ke mediump
 * agar ALU GPU mobile (Adreno/Mali) berjalan hingga 2x lebih cepat.
 */
export function buildMobileFragmentSource(fragSrc: string, isMobileLite: boolean): string {
  if (!isMobileLite) return fragSrc;
  const downgraded = fragSrc
    .replace(/precision\s+highp\s+float\s*;/g, 'precision mediump float;')
    .replace(/uniform\s+float\s+uTime\s*;/g, 'uniform highp float uTime;');
  return `#define MOBILE_LITE 1\n${downgraded}`;
}

export function useIsMobileViewport(breakpointPx = 900): boolean {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return isMobile;
}
