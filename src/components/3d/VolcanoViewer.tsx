import React, { useEffect, useRef } from 'react';
import { Volcano3DViewer as VolcanoEngine } from '../../engines/volcano/Volcano3DViewer';
import { MagmaParams, calculateMagmaPhysics } from '../../data/magmaPhysics';

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

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new VolcanoEngine(containerRef.current, 'vulkanisme');
    if (onInspect) (viewer as any).onInspect = onInspect;
    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
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
    <div className="model-frame-card" ref={containerRef}>
      <div className="model-badge">
        <span>🌋</span> {sandboxActive ? '🧪 Sandbox Fisika Magma Aktif' : '3D Interaktif · Anatomi Gunung Semeru'}
      </div>
    </div>
  );
};
