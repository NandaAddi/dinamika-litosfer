import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ReferenceModal } from '../common/ReferenceModal';
import { ShortcutsModal } from '../common/ShortcutsModal';
import { BadgesModal } from '../common/BadgesModal';
import { StudentCertificateModal } from '../common/StudentCertificateModal';
import { BadgeToast } from '../common/BadgeToast';
import { OfflineBanner } from '../common/OfflineBanner';
import { HomePage } from '../../pages/HomePage';
import { ModulePage } from '../../pages/ModulePage';
import { QuizPage } from '../../pages/QuizPage';
import { sound } from '../../utils/soundEffects';
import { registerServiceWorker } from '../../utils/pwaManager';

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

  // Mount ModulePage secara on-demand saat modul pertama kali dibuka
  const [hasVisitedModule, setHasVisitedModule] = useState(isModule);
  useEffect(() => {
    if (isModule && !hasVisitedModule) {
      setHasVisitedModule(true);
    }
  }, [isModule, hasVisitedModule]);

  // Registrasi Service Worker PWA (Offline Cache 3T)
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Global Keyboard Shortcuts (Hotkeys Guru & Siswa)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika user sedang mengetik di input / textarea
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(targetTag)) return;

      // Abaikan jika modifier Ctrl / Alt / Meta sedang ditekan (kecuali shortcut murni)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const key = e.key;

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
      } else if (key === 'm' || key === 'M') {
        handleToggleMute();
      } else if (key === '?' || key === 'h' || key === 'H') {
        setIsShortcutsOpen((prev) => !prev);
      } else if (key >= '1' && key <= '5') {
        const stageRoutes = [
          '/modul/struktur',
          '/modul/lempeng',
          '/modul/vulkanisme',
          '/modul/endogen',
          '/kuis'
        ];
        const route = stageRoutes[parseInt(key, 10) - 1];
        if (route) {
          sound.snap();
          navigate(route);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, handleToggleMute]);

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
            <HomePage isActive={isHome} />
            {hasVisitedModule && (
              <ModulePage currentModuleId={activeModuleId} isActive={isModule} />
            )}
            <QuizPage
              isActive={isQuiz}
              onOpenCertificate={() => setIsCertOpen(true)}
              onOpenBadges={() => setIsBadgesOpen(true)}
            />
          </div>
        </main>
      </div>

      <BadgeToast />
      <OfflineBanner />
      <ReferenceModal isOpen={isRefsOpen} onClose={() => setIsRefsOpen(false)} />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        onOpenCertificate={() => setIsCertOpen(true)}
      />
      <StudentCertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
      />
    </div>
  );
};
