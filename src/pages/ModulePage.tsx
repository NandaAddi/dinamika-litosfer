import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_MODULES } from '../data/modules';
import { SliderContainer } from '../components/common/SliderContainer';
import { SeismicPreloader, PreloaderModuleType } from '../components/common/SeismicPreloader';
import { progressStore } from '../data/progressStore';
import { INQUIRY_CHALLENGES } from '../data/inquiryChallenges';
import { sound } from '../utils/soundEffects';
import { MagmaSandboxModal } from '../components/common/MagmaSandboxModal';
import { MagmaParams } from '../data/magmaPhysics';
import { useIsMobileViewport } from '../utils/devicePerf';

// Lazy-load masing-masing engine 3D secara terpisah agar pindah halaman hanya memuat 1 engine aktif
const EarthViewer = lazy(() => import('../components/3d/EarthViewer').then((m) => ({ default: m.EarthViewer })));
const TectonicViewer = lazy(() => import('../components/3d/TectonicViewer').then((m) => ({ default: m.TectonicViewer })));
const VolcanoViewer = lazy(() => import('../components/3d/VolcanoViewer').then((m) => ({ default: m.VolcanoViewer })));
const EndogenViewer = lazy(() => import('../components/3d/EndogenViewer').then((m) => ({ default: m.EndogenViewer })));

const NEXT_MODULE_CONFIG: Record<string, { target: string; label: string }> = {
  struktur: { target: '/modul/lempeng', label: 'Lanjut ke Lempeng Tektonik' },
  lempeng: { target: '/modul/vulkanisme', label: 'Lanjut ke Vulkanisme' },
  vulkanisme: { target: '/modul/endogen', label: 'Lanjut ke Tenaga Endogen' },
  endogen: { target: '/kuis', label: 'Uji Pemahaman di Kuis' }
};

interface ModulePageProps {
  currentModuleId?: string;
  isActive?: boolean;
}

export const ModulePage: React.FC<ModulePageProps> = ({ currentModuleId, isActive = true }) => {
  const { moduleId: paramModuleId = 'struktur' } = useParams<{ moduleId: string }>();
  const moduleId = currentModuleId || paramModuleId || 'struktur';
  const navigate = useNavigate();
  const isMobile = useIsMobileViewport();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileView, setMobileView] = useState<'model' | 'slider'>('model');
  const isViewerActive = isActive && (!isMobile || mobileView === 'model');

  const moduleData = ALL_MODULES[moduleId] || ALL_MODULES.struktur;
  const [quizUnlockStatus, setQuizUnlockStatus] = useState(() => progressStore.getQuizUnlockStatus());

  useEffect(() => {
    return progressStore.subscribe(() => {
      setQuizUnlockStatus(progressStore.getQuizUnlockStatus());
    });
  }, []);

  const remainingBeforeQuiz = quizUnlockStatus.remainingModules.find((m) => m.id !== 'endogen');
  const nextConfig = moduleId === 'endogen'
    ? (remainingBeforeQuiz
        ? { target: remainingBeforeQuiz.path, label: `Lanjut ke ${remainingBeforeQuiz.title}` }
        : NEXT_MODULE_CONFIG.endogen)
    : (NEXT_MODULE_CONFIG[moduleId] || NEXT_MODULE_CONFIG.endogen);
  const challenge = INQUIRY_CHALLENGES[moduleId] || null;

  const [isChallengeDone, setIsChallengeDone] = useState(() =>
    challenge ? progressStore.isChallengeCompleted(challenge.id) : true
  );

  // State Sandbox Fisika Magma (Opsi C)
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [sandboxParams, setSandboxParams] = useState<MagmaParams>({
    silicaPercent: 58,
    gasContentPercent: 3.8
  });
  const [isErupting, setIsErupting] = useState(false);

  const handleTriggerEruption = useCallback(() => {
    setIsErupting(true);
    setTimeout(() => setIsErupting(false), 900);
  }, []);

  useEffect(() => {
    if (challenge) {
      setIsChallengeDone(progressStore.isChallengeCompleted(challenge.id));
    } else {
      setIsChallengeDone(true);
    }
  }, [moduleId, challenge]);

  // Event Bridge: Menerima interaksi 3D dari kanvas WebGL
  const handleInspect = useCallback(
    (target: { type: string; id?: any; action?: string }) => {
      if (!challenge) return;
      if (progressStore.isChallengeCompleted(challenge.id)) return;

      let matched = false;
      if (challenge.targetType === 'layer' && target.type === 'layer') {
        if (Number(target.id) === Number(challenge.targetId)) {
          matched = true;
        }
      } else if (challenge.targetType === 'part' && target.type === 'part') {
        if (Number(target.id) === Number(challenge.targetId)) {
          matched = true;
        }
      } else if (challenge.targetAction && target.type === 'action' && target.action === challenge.targetAction) {
        matched = true;
      }

      if (matched) {
        sound.quizCorrect();
        progressStore.completeChallenge(challenge.id, challenge.xpReward);
        setIsChallengeDone(true);
      }
    },
    [challenge]
  );

  // Aksesibilitas Guru / Bypass Cepat
  const handleBypassInquiry = useCallback(() => {
    if (!challenge) return;
    sound.snap();
    progressStore.completeChallenge(challenge.id, challenge.xpReward);
    setIsChallengeDone(true);
  }, [challenge]);

  // Otomatis buka badge saat mencapai slide terakhir materi
  useEffect(() => {
    if (moduleData && currentSlide >= moduleData.slides.length - 1) {
      progressStore.completeModule(moduleId);
    }
  }, [moduleId, currentSlide, moduleData]);

  const handleNextCta = () => {
    progressStore.completeModule(moduleId);
    if (moduleId === 'endogen') {
      const latestStatus = progressStore.getQuizUnlockStatus();
      navigate(latestStatus.unlocked ? '/kuis' : latestStatus.remainingModules[0].path);
      return;
    }
    navigate(nextConfig.target);
  };

  return (
    <section className={`page fit-view ${isActive ? 'active' : ''}`} id={`page-${moduleId}`}>
      {/* Mobile view toggle & Action bar */}
      <div className="mobile-view-toggle">
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'model' ? 'active' : ''}`}
          onClick={() => setMobileView('model')}
        >
          Model 3D
        </button>
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'slider' ? 'active' : ''}`}
          onClick={() => setMobileView('slider')}
        >
          Slide Materi
        </button>

        {moduleId === 'vulkanisme' && (
          <button
            type="button"
            className="mobile-toggle-btn sandbox-pill-btn"
            onClick={() => {
              sound.snap();
              setIsSandboxOpen(true);
            }}
            title="Buka Laboratorium Fisika Magma Semeru"
          >
            Sandbox Magma
          </button>
        )}
      </div>

      <div className={`material-split ${mobileView === 'model' ? 'show-model' : ''}`}>
        {/* Kolom Kiri: Model 3D Tunggal yang Aktif dengan Lazy-Chunk & Jembatan Inspeksi */}
        {isActive && (
          <Suspense
            fallback={
              <div className="model-frame-card" style={{ position: 'relative' }}>
                <SeismicPreloader moduleType={(moduleId as PreloaderModuleType) || 'struktur'} />
              </div>
            }
          >
            {moduleId === 'struktur' && (
              <EarthViewer
                slideIndex={currentSlide}
                pageId="struktur"
                isActive={isViewerActive}
                onInspect={handleInspect}
              />
            )}
            {moduleId === 'lempeng' && (
              <TectonicViewer
                slideIndex={currentSlide}
                isActive={isViewerActive}
                onInspect={handleInspect}
              />
            )}
            {moduleId === 'vulkanisme' && (
              <VolcanoViewer
                slideIndex={currentSlide}
                isActive={isViewerActive}
                onInspect={handleInspect}
                sandboxActive={isSandboxOpen}
                sandboxParams={sandboxParams}
                isErupting={isErupting}
              />
            )}
            {moduleId === 'endogen' && (
              <EndogenViewer
                slideIndex={currentSlide}
                isActive={isViewerActive}
                onInspect={handleInspect}
              />
            )}
          </Suspense>
        )}

        {/* Kolom Kanan: Slider Konten Materi + Gerbang Inkuiri Terbimbing */}
        <SliderContainer
          topicTag={moduleData.badge}
          slides={moduleData.slides}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          nextCtaLabel={nextConfig.label}
          onNextCta={handleNextCta}
          inquiryChallenge={challenge}
          isInquiryCompleted={isChallengeDone}
          onBypassInquiry={handleBypassInquiry}
        />
      </div>

      {moduleId === 'vulkanisme' && (
        <MagmaSandboxModal
          isOpen={isSandboxOpen}
          onClose={() => setIsSandboxOpen(false)}
          params={sandboxParams}
          onChangeParams={setSandboxParams}
          onTriggerEruption={handleTriggerEruption}
        />
      )}
    </section>
  );
};
