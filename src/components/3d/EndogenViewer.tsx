import React, { useEffect, useRef, useState } from 'react';
import { Endogen3DViewer as EndogenEngine } from '../../engines/endogen/Endogen3DViewer';
import { SeismicPreloader } from '../common/SeismicPreloader';
import { sound } from '../../utils/soundEffects';

interface EndogenViewerProps {
  slideIndex?: number;
  isActive?: boolean;
  hideSpoilers?: boolean;
  badgeTitle?: string;
  onInspect?: (target: { type: 'layer' | 'part' | 'action'; id?: number | string; name?: string; action?: string; state?: any }) => void;
}

export const EndogenViewer: React.FC<EndogenViewerProps> = ({
  slideIndex = 0,
  isActive = true,
  hideSpoilers = false,
  badgeTitle = '3D Interaktif · Lipatan, Sesar Horst-Graben & Siklus Batuan',
  onInspect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;
  const hideSpoilersRef = useRef(hideSpoilers);
  hideSpoilersRef.current = hideSpoilers;
  const slideIndexRef = useRef(slideIndex);
  slideIndexRef.current = slideIndex;
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsLoading(true);
    setIsFading(false);
    setHasError(false);
    sound.slideWhoosh();

    const mountTime = performance.now();
    let isCancelled = false;
    let viewer: any = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let removeTimer: ReturnType<typeof setTimeout> | null = null;

    // Tunggu 2 frame paint + 60ms agar transisi halaman & teks materi langsung tampil instan
    let raf1 = 0;
    let raf2 = 0;
    let initTimer: ReturnType<typeof setTimeout> | null = null;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (isCancelled) return;
        initTimer = setTimeout(() => {
          if (isCancelled || !containerRef.current) return;

          try {
            viewer = new EndogenEngine(containerRef.current);
            if (onInspect) (viewer as any).onInspect = onInspect;
            viewer.setQuizState?.(hideSpoilersRef.current);
            if (slideIndexRef.current && typeof viewer.onSlideChange === 'function') {
              viewer.onSlideChange(slideIndexRef.current);
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
            console.warn('WebGL initialization failed in EndogenViewer:', err);
            if (isCancelled) return;
            setHasError(true);
            setIsLoading(false);
          }
        }, 60);
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
  }, []);

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

  return (
    <div className="model-frame-card" ref={containerRef} style={{ position: 'relative' }}>
      {isLoading && (
        <SeismicPreloader moduleType="endogen" isFading={isFading} />
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
