import React from 'react';

export type PreloaderModuleType = 'beranda' | 'struktur' | 'lempeng' | 'vulkanisme' | 'endogen';

interface SeismicPreloaderProps {
  moduleType: PreloaderModuleType;
  isFading?: boolean;
}

const MODULE_LABELS: Record<PreloaderModuleType, { title: string; subtitle: string; icon: string }> = {
  beranda: {
    icon: '◈',
    title: 'Memindai Globe Interaktif Litosfer',
    subtitle: 'Menyelaraskan topografi bumi & atmosfer 3D...'
  },
  struktur: {
    icon: '◐',
    title: 'Memindai Penampang Interior Bumi',
    subtitle: 'Menyiapkan tomografi Moho, Gutenberg, & Lehmann...'
  },
  lempeng: {
    icon: '◫',
    title: 'Mengalkulasi Batas Lempeng Tektonik',
    subtitle: 'Memetakan zona subduksi & sesar mendatar...'
  },
  vulkanisme: {
    icon: '△',
    title: 'Menyiapkan Dapur Magma Semeru',
    subtitle: 'Mengalkulasi geometri kubah lava & saluran pipa magma...'
  },
  endogen: {
    icon: '◬',
    title: 'Menyusun Blok Sesar & Siklus Batuan',
    subtitle: 'Merekonstruksi graben, horst, & deformasi tektonik...'
  }
};

export const SeismicPreloader: React.FC<SeismicPreloaderProps> = ({ moduleType, isFading = false }) => {
  const meta = MODULE_LABELS[moduleType] || MODULE_LABELS.struktur;

  return (
    <div
      className={`seismic-preloader-overlay ${isFading ? 'fade-out' : ''}`}
      aria-live="polite"
      aria-label={`Memuat simulasi: ${meta.title}`}
    >
      <div className="seismic-radar-rig">
        {/* Radar Sweeping Line */}
        <div className="radar-sweep-cone" />

        {/* Concentric Seismic Wave Rings */}
        <div className="seismic-ring ring-1" />
        <div className="seismic-ring ring-2" />
        <div className="seismic-ring ring-3" />

        {/* Epicenter Central Node */}
        <div className="seismic-epicenter">
          <span className="epicenter-core" />
          <span className="epicenter-pulse" />
        </div>
      </div>

      <div className="seismic-status-card">
        <div className="seismic-status-badge">
          <span className="seismic-dot" />
          <span className="seismic-icon">{meta.icon}</span>
          <span className="seismic-title">{meta.title}</span>
        </div>
        <span className="seismic-sub">{meta.subtitle}</span>
      </div>
    </div>
  );
};
