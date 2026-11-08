import React, { useEffect, useRef } from 'react';
import { Earth3DViewer as EarthEngine } from '../../engines/earth/Earth3DViewer';

interface EarthViewerProps {
  slideIndex?: number;
  pageId?: string;
  badgeTitle?: string;
  isActive?: boolean;
  variant?: 'card' | 'embedded';
  onInspect?: (target: { type: 'layer' | 'part' | 'action'; id?: number | string; name?: string; action?: string; state?: any }) => void;
}

export const EarthViewer: React.FC<EarthViewerProps> = ({
  slideIndex = 0,
  pageId = 'struktur',
  badgeTitle = '3D Interaktif · Struktur Lapisan Bumi',
  isActive = true,
  variant = 'card',
  onInspect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new EarthEngine(containerRef.current, pageId);
    if (onInspect) (viewer as any).onInspect = onInspect;
    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
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
    <div
      className={`model-frame-card ${variant === 'embedded' ? 'model-embedded-viewport' : ''}`}
      ref={containerRef}
    >
      <div className="model-badge">
        <span>🌍</span> {badgeTitle}
      </div>
    </div>
  );
};
