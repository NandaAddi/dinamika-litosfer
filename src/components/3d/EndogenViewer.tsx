import React, { useEffect, useRef } from 'react';
import { Endogen3DViewer as EndogenEngine } from '../../engines/endogen/Endogen3DViewer';

interface EndogenViewerProps {
  slideIndex?: number;
  isActive?: boolean;
}

export const EndogenViewer: React.FC<EndogenViewerProps> = ({ slideIndex = 0, isActive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new EndogenEngine(containerRef.current);
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
        <span>⛰️</span> 3D Interaktif · Lipatan, Sesar Horst-Graben &amp; Siklus Batuan
      </div>
    </div>
  );
};
