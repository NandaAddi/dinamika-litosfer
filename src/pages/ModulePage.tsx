import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_MODULES } from '../data/modules';
import { SliderContainer } from '../components/common/SliderContainer';
import { EarthViewer, TectonicViewer, VolcanoViewer, EndogenViewer } from '../components/3d';

const NEXT_MODULE_CONFIG: Record<string, { target: string; label: string }> = {
  struktur: { target: '/modul/lempeng', label: 'Lanjut ke Lempeng Tektonik 🧩' },
  lempeng: { target: '/modul/vulkanisme', label: 'Lanjut ke Vulkanisme 🌋' },
  vulkanisme: { target: '/modul/endogen', label: 'Lanjut ke Tenaga Endogen ⛰️' },
  endogen: { target: '/kuis', label: 'Uji Pemahaman di Kuis 📝' }
};

interface ModulePageProps {
  currentModuleId?: string;
  isActive?: boolean;
}

export const ModulePage: React.FC<ModulePageProps> = ({ currentModuleId, isActive = true }) => {
  const { moduleId: paramModuleId = 'struktur' } = useParams<{ moduleId: string }>();
  const moduleId = currentModuleId || paramModuleId || 'struktur';
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileView, setMobileView] = useState<'model' | 'slider'>('model');

  // Sinkronisasi reset slide index seketika saat moduleId berubah (cegah race condition index out of bounds)
  const [prevModuleId, setPrevModuleId] = useState(moduleId);
  if (prevModuleId !== moduleId) {
    setPrevModuleId(moduleId);
    setCurrentSlide(0);
  }

  const moduleData = ALL_MODULES[moduleId] || ALL_MODULES.struktur;
  const nextConfig = NEXT_MODULE_CONFIG[moduleId] || { target: '/kuis', label: 'Berikutnya →' };

  return (
    <section className={`page fit-view ${isActive ? 'active' : ''}`} id={`page-${moduleId}`}>
      {/* Mobile view toggle */}
      <div className="mobile-view-toggle">
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'model' ? 'active' : ''}`}
          onClick={() => setMobileView('model')}
        >
          🧊 Model 3D
        </button>
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'slider' ? 'active' : ''}`}
          onClick={() => setMobileView('slider')}
        >
          📖 Slide Materi
        </button>
      </div>

      <div className={`material-split ${mobileView === 'model' ? 'show-model' : ''}`}>
        {/* Kolom Kiri: Model 3D Tunggal yang Aktif (Zero Context Exhaustion) */}
        {moduleId === 'struktur' && (
          <EarthViewer slideIndex={currentSlide} pageId="struktur" isActive={isActive} />
        )}
        {moduleId === 'lempeng' && (
          <TectonicViewer slideIndex={currentSlide} isActive={isActive} />
        )}
        {moduleId === 'vulkanisme' && (
          <VolcanoViewer slideIndex={currentSlide} isActive={isActive} />
        )}
        {moduleId === 'endogen' && (
          <EndogenViewer slideIndex={currentSlide} isActive={isActive} />
        )}

        {/* Kolom Kanan: Slider Konten Materi */}
        <SliderContainer
          topicTag={moduleData.badge}
          slides={moduleData.slides}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          nextCtaLabel={nextConfig.label}
          onNextCta={() => navigate(nextConfig.target)}
        />
      </div>
    </section>
  );
};
