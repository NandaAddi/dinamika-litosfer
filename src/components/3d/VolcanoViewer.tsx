import React, { useEffect, useRef, useState } from 'react';
import { Volcano3DViewer as VolcanoEngine } from '../../engines/volcano/Volcano3DViewer';
import { MagmaParams, calculateMagmaPhysics } from '../../data/magmaPhysics';
import { SeismicPreloader } from '../common/SeismicPreloader';
import { sound } from '../../utils/soundEffects';

interface VolcanoViewerProps {
  slideIndex?: number;
  isActive?: boolean;
  onInspect?: (target: { type: 'layer' | 'part' | 'action'; id?: number | string; name?: string; action?: string; state?: any }) => void;
  sandboxActive?: boolean;
  sandboxParams?: MagmaParams;
  isErupting?: boolean;
}

export const VolcanoViewer: React.FC<VolcanoViewerProps> = ({
  slideIndex = 0,
  isActive = true,
  onInspect,
  sandboxActive = false,
  sandboxParams,
  isErupting = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;
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
            viewer = new VolcanoEngine(containerRef.current, 'vulkanisme');
            if (onInspect) (viewer as any).onInspect = onInspect;
            if (slideIndex && typeof viewer.onSlideChange === 'function') {
              viewer.onSlideChange(slideIndex);
            }
            if (sandboxActive && typeof viewer.toggleSandboxMode === 'function') {
              viewer.toggleSandboxMode(sandboxActive);
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
            console.warn('WebGL initialization failed in VolcanoViewer:', err);
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
    if (viewerRef.current && typeof viewerRef.current.toggleSandboxMode === 'function') {
      viewerRef.current.toggleSandboxMode(sandboxActive);
    }
  }, [sandboxActive]);

  useEffect(() => {
    if (viewerRef.current && sandboxParams && typeof viewerRef.current.setSandboxParams === 'function') {
      const telemetry = calculateMagmaPhysics(sandboxParams.silicaPercent, sandboxParams.gasContentPercent);
      viewerRef.current.setSandboxParams({
        silica: sandboxParams.silicaPercent,
        gas: sandboxParams.gasContentPercent,
        regime: telemetry.regime
      });
    }
  }, [sandboxParams]);

  useEffect(() => {
    if (viewerRef.current && isErupting && typeof viewerRef.current.triggerSandboxEruption === 'function') {
      viewerRef.current.triggerSandboxEruption();
    }
  }, [isErupting]);

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
    if (viewerRef.current && typeof viewerRef.current.onSlideChange === 'function' && !sandboxActive) {
      viewerRef.current.onSlideChange(slideIndex);
    }
  }, [slideIndex, sandboxActive]);

  return (
    <div className="model-frame-card" ref={containerRef} style={{ position: 'relative' }}>
      {isLoading && (
        <SeismicPreloader moduleType="vulkanisme" isFading={isFading} />
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
        {sandboxActive ? 'Sandbox Fisika Magma Aktif' : '3D Interaktif · Anatomi Gunung Api'}
      </div>
    </div>
  );
};
