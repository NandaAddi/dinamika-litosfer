import React, { useEffect, useRef } from 'react';
import { Tectonic3DViewer as TectonicEngine } from '../../engines/tectonic/Tectonic3DViewer';

interface TectonicViewerProps {
  slideIndex?: number;
  isActive?: boolean;
}

export const TectonicViewer: React.FC<TectonicViewerProps> = ({ slideIndex = 0, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new TectonicEngine(containerRef.current, 'lempeng');
    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

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
    if (viewerRef.current && typeof viewerRef.current.onSlideChange === 'function') {
      viewerRef.current.onSlideChange(slideIndex);
    }
  }, [slideIndex]);

  return (
    <div className="model-frame-card" ref={containerRef}>
      <div className="model-badge">
        <span>🧩</span> 3D Interaktif · Lempeng Tektonik
      </div>
    </div>
  );
};
