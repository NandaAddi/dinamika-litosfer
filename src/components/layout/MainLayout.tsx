import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BadgeToast } from '../common/BadgeToast';
import { OfflineBanner } from '../common/OfflineBanner';
import { HomePage } from '../../pages/HomePage';
import { SeismicPreloader, PreloaderModuleType } from '../common/SeismicPreloader';
import { sound } from '../../utils/soundEffects';
import { registerServiceWorker } from '../../utils/pwaManager';
import { progressStore } from '../../data/progressStore';

// Dynamic Lazy Imports untuk modul berat dan modal dialog
const ModulePage = lazy(() => import('../../pages/ModulePage').then(m => ({ default: m.ModulePage })));
const QuizPage = lazy(() => import('../../pages/QuizPage').then(m => ({ default: m.QuizPage })));
const ReferenceModal = lazy(() => import('../common/ReferenceModal').then(m => ({ default: m.ReferenceModal })));
const ShortcutsModal = lazy(() => import('../common/ShortcutsModal').then(m => ({ default: m.ShortcutsModal })));
const BadgesModal = lazy(() => import('../common/BadgesModal').then(m => ({ default: m.BadgesModal })));
const StudentCertificateModal = lazy(() => import('../common/StudentCertificateModal').then(m => ({ default: m.StudentCertificateModal })));

export const MainLayout: React.FC = () => {
  const [isRefsOpen, setIsRefsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sound.isMuted);

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  // Tentukan halaman aktif berdasarkan pathname
  const isHome = path === '/' || path === '';
  const isQuiz = path === '/kuis';
  const isModule = path.startsWith('/modul/') || (!isHome && !isQuiz);

  let activeModuleId = 'struktur';
  if (path.startsWith('/modul/')) {
    const segment = path.split('/')[2];
    if (segment) activeModuleId = segment;
  }

  // Registrasi Service Worker PWA saat idle agar tidak membebani initial loading
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => registerServiceWorker());
    } else {
      const timer = setTimeout(registerServiceWorker, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Global Keyboard Shortcuts (Hotkeys Guru & Siswa)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika user sedang mengetik di input / textarea / select
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) return;

      // Abaikan jika modifier Ctrl / Alt / Meta sedang ditekan (kecuali shortcut murni)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Abaikan shortcut navigasi/3D ketika ada dialog modal terbuka
      if (document.querySelector('dialog[open]')) return;

      const key = e.key;

      if (key === 'm' || key === 'M') {
        handleToggleMute();
        return;
      }
      if (key === '?' || key === 'h' || key === 'H') {
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Saat halaman kuis aktif, cegah perpindahan halaman atau trigger slide/3D tak sengaja
      if (isQuiz) return;

      if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        const nextBtn = document.querySelector<HTMLButtonElement>('.btn-next-slide');
        if (nextBtn && !nextBtn.disabled) {
          nextBtn.click();
        }
      } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        const prevBtn = document.querySelector<HTMLButtonElement>('.btn-prev-slide');
        if (prevBtn && !prevBtn.disabled) {
          prevBtn.click();
        }
      } else if (key === ' ') {
        e.preventDefault();
        const playBtn = document.querySelector<HTMLButtonElement>('[data-action="play"]');
        if (playBtn) {
          sound.snap();
          playBtn.click();
        }
      } else if (key === 'r' || key === 'R') {
        const resetBtn = document.querySelector<HTMLButtonElement>('[data-action="reset"]');
        if (resetBtn) {
          sound.snap();
          resetBtn.click();
        }
      } else if (key === 'l' || key === 'L') {
        const labelBtn = document.querySelector<HTMLButtonElement>('[data-action="labels"]');
        if (labelBtn) {
          sound.snap();
          labelBtn.click();
        }
      } else if (key === 'p' || key === 'P') {
        const explodeBtn = document.querySelector<HTMLButtonElement>('[data-action="explode"]');
        if (explodeBtn) {
          sound.rumble();
          explodeBtn.click();
        }
      } else if (key >= '1' && key <= '5') {
        const stageRoutes = [
          '/modul/struktur',
          '/modul/lempeng',
          '/modul/vulkanisme',
          '/modul/endogen',
          '/kuis'
        ];
        const route = stageRoutes[parseInt(key, 10) - 1];
        if (route === '/kuis' && !progressStore.getQuizUnlockStatus().unlocked) {
          sound.quizWrong();
          return;
        }
        if (route) {
          sound.snap();
          navigate(route);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, handleToggleMute, isQuiz]);

  return (
    <div id="app" className={isHome ? 'layout-home' : 'layout-module'}>
      <Header
        onOpenRefs={() => setIsRefsOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
      <div className="app-body">
        {!isHome && <Sidebar />}
        <main className="main-content">
          <div className="pages">
            {isHome && <HomePage isActive={true} />}
            {isModule && (
              <Suspense fallback={<SeismicPreloader moduleType={activeModuleId as PreloaderModuleType} />}>
                <ModulePage key={activeModuleId} currentModuleId={activeModuleId} isActive={true} />
              </Suspense>
            )}
            {isQuiz && (
              <Suspense fallback={<SeismicPreloader moduleType="beranda" />}>
                <QuizPage
                  isActive={true}
                  onOpenCertificate={() => setIsCertOpen(true)}
                  onOpenBadges={() => setIsBadgesOpen(true)}
                />
              </Suspense>
            )}
          </div>
        </main>
      </div>

      <BadgeToast />
      <OfflineBanner />
      {isRefsOpen && (
        <Suspense fallback={null}>
          <ReferenceModal isOpen={isRefsOpen} onClose={() => setIsRefsOpen(false)} />
        </Suspense>
      )}
      {isShortcutsOpen && (
        <Suspense fallback={null}>
          <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
        </Suspense>
      )}
      {isBadgesOpen && (
        <Suspense fallback={null}>
          <BadgesModal
            isOpen={isBadgesOpen}
            onClose={() => setIsBadgesOpen(false)}
            onOpenCertificate={() => setIsCertOpen(true)}
          />
        </Suspense>
      )}
      {isCertOpen && (
        <Suspense fallback={null}>
          <StudentCertificateModal
            isOpen={isCertOpen}
            onClose={() => setIsCertOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};
