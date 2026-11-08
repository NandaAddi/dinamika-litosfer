import React, { useEffect, useRef } from 'react';
import { Volcano3DViewer as VolcanoEngine } from '../../engines/volcano/Volcano3DViewer';

interface VolcanoViewerProps {
  slideIndex?: number;
  isActive?: boolean;
}

export const VolcanoViewer: React.FC<VolcanoViewerProps> = ({ slideIndex = 0, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new VolcanoEngine(containerRef.current, 'vulkanisme');
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
        <span>🌋</span> 3D Interaktif · Anatomi Gunung Semeru
      </div>
    </div>
  );
};
