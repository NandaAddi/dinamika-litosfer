import React, { useEffect, useRef, useState } from 'react';
import { Earth3DViewer as EarthEngine } from '../../engines/earth/Earth3DViewer';
import { SeismicPreloader, PreloaderModuleType } from '../common/SeismicPreloader';
import { sound } from '../../utils/soundEffects';

interface EarthViewerProps {
  slideIndex?: number;
  pageId?: string;
  badgeTitle?: string;
  isActive?: boolean;
  hideSpoilers?: boolean;
  variant?: 'card' | 'embedded';
  onInspect?: (target: { type: 'layer' | 'part' | 'action'; id?: number | string; name?: string; action?: string; state?: any }) => void;
}

export const EarthViewer: React.FC<EarthViewerProps> = ({
  slideIndex = 0,
  pageId = 'struktur',
  badgeTitle = '3D Interaktif · Struktur Lapisan Bumi',
  isActive = true,
  hideSpoilers = false,
  variant = 'card',
  onInspect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;
  const hideSpoilersRef = useRef(hideSpoilers);
  hideSpoilersRef.current = hideSpoilers;
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsLoading(true);
    setIsFading(false);
    setHasError(false);
    if (pageId !== 'beranda') {
      sound.slideWhoosh();
    }

    const mountTime = performance.now();
    let isCancelled = false;
    let viewer: any = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let removeTimer: ReturnType<typeof setTimeout> | null = null;

    // Untuk halaman beranda, beri jeda 380ms agar preloader UM layar penuh memudar mulus;
    // untuk halaman modul, tunggu 2 frame paint + 60ms agar UI halaman baru ter-render instan dulu
    const initDelay = pageId === 'beranda' ? 380 : 60;
    let raf1 = 0;
    let raf2 = 0;
    let initTimer: ReturnType<typeof setTimeout> | null = null;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (isCancelled) return;
        initTimer = setTimeout(() => {
          if (isCancelled || !containerRef.current) return;

          try {
            viewer = new EarthEngine(containerRef.current, pageId);
            if (onInspect) (viewer as any).onInspect = onInspect;
            viewer.setQuizState?.(hideSpoilersRef.current);
            if (slideIndex && typeof viewer.onSlideChange === 'function') {
              viewer.onSlideChange(slideIndex);
            }
            viewerRef.current = viewer;

            if (!isActiveRef.current) {
              viewer.pause?.();
            }

            viewer.onReady = () => {
              if (isCancelled) return;
              const elapsed = performance.now() - mountTime;
              const minDisplayTime = 240;
              const delay = Math.max(0, minDisplayTime - elapsed);

              fadeTimer = setTimeout(() => {
                if (isCancelled) return;
                setIsFading(true);
                removeTimer = setTimeout(() => {
                  if (isCancelled) return;
                  setIsLoading(false);
                }, 180);
              }, delay);
            };
          } catch (err) {
            console.warn('WebGL initialization failed in EarthViewer:', err);
            if (isCancelled) return;
            setHasError(true);
            setIsLoading(false);
          }
        }, initDelay);
      });
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (initTimer) clearTimeout(initTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (removeTimer) clearTimeout(removeTimer);
      if (viewer) {
        viewer.destroy();
        viewerRef.current = null;
      }
    };
  }, [pageId]);

  useEffect(() => {
    if (viewerRef.current) {
      (viewerRef.current as any).onInspect = onInspect;
    }
  }, [onInspect]);

  useEffect(() => {
    if (viewerRef.current) {
      if (isActive) {
        viewerRef.current.resize?.();
        viewerRef.current.resume?.();
      } else {
        viewerRef.current.pause?.();
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (viewerRef.current && typeof viewerRef.current.setQuizState === 'function') {
      viewerRef.current.setQuizState(hideSpoilers);
    }
  }, [hideSpoilers]);

  useEffect(() => {
    if (viewerRef.current && typeof viewerRef.current.onSlideChange === 'function') {
      viewerRef.current.onSlideChange(slideIndex);
    }
  }, [slideIndex]);

  const moduleType: PreloaderModuleType = pageId === 'beranda' ? 'beranda' : 'struktur';

  return (
    <div
      className={`model-frame-card ${variant === 'embedded' ? 'model-embedded-viewport' : ''}`}
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      {isLoading && (
        <SeismicPreloader moduleType={moduleType} isFading={isFading} />
      )}
      {hasError && (
        <div className="webgl-fallback-card" role="alert">
          <p className="fallback-title">Simulasi 3D Tidak Tersedia</p>
          <p className="fallback-desc">
            Akselerasi grafis WebGL tidak aktif pada peramban ini. Anda tetap dapat mempelajari seluruh materi dan menyelesaikan kuis evaluasi.
          </p>
        </div>
      )}
      <div className="model-badge">
        {badgeTitle}
      </div>
    </div>
  );
};
