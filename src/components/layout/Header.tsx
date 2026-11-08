import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sound } from '../../utils/soundEffects';
import { progressStore, getRankTitle, ProgressData } from '../../data/progressStore';
import { subscribePWA, getPWAState, promptPWAInstall, PWAState } from '../../utils/pwaManager';

interface HeaderProps {
  onOpenRefs: () => void;
  onOpenShortcuts: () => void;
  onOpenBadges: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const CRUMB_MAP: Record<string, string> = {
  '/': 'Beranda',
  '/modul/struktur': '01 · Struktur Bumi',
  '/modul/lempeng': '02 · Lempeng Tektonik',
  '/modul/vulkanisme': '03 · Vulkanisme',
  '/modul/endogen': '04 · Tenaga Endogen',
  '/kuis': '05 · Kuis Interaktif'
};

export const Header: React.FC<HeaderProps> = ({
  onOpenRefs,
  onOpenShortcuts,
  onOpenBadges,
  isMuted,
  onToggleMute
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentCrumb = CRUMB_MAP[location.pathname] || 'Dinamika Litosfer';

  const [progress, setProgress] = useState<ProgressData>(() => progressStore.getData());
  const [pwaState, setPwaState] = useState<PWAState>(() => getPWAState());

  useEffect(() => {
    return progressStore.subscribe(() => {
      setProgress({ ...progressStore.getData() });
    });
  }, []);

  useEffect(() => {
    return subscribePWA((state) => {
      setPwaState(state);
    });
  }, []);

  const rank = getRankTitle(progress.xp);
  const unlockedBadgesCount = Object.values(progress.badges).filter((b) => b.unlocked).length;

  const handleGoHome = () => {
    sound.snap();
    navigate('/');
  };

  const handleRefsClick = () => {
    sound.snap();
    onOpenRefs();
  };

  const handleShortcutsClick = () => {
    sound.snap();
    onOpenShortcuts();
  };

  const handleBadgesClick = () => {
    sound.snap();
    onOpenBadges();
  };

  return (
    <header className="topbar">
      {/* Left: Mercury Brand Mark with Concentric-Circle Lithosphere Icon */}
      <div
        className="aside-brand"
        onClick={handleGoHome}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleGoHome();
        }}
        title="Kembali ke Beranda (Lobby Game)"
      >
        <svg
          className="mercury-mark"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.85" />
          <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.6" />
          <circle cx="16" cy="16" r="4.5" fill="#5266eb" />
        </svg>
        <div className="brand-text">
          <b>Dinamika Litosfer</b>
          <small>Geografi · UM</small>
        </div>
      </div>

      {/* Right: Partner Logo, Crumb Indicator, Sound Toggle, Shortcuts & Reference Action */}
      <div className="topbar-actions">
        <div className="partner-banner">
          <img
            src="/assets/images/Picture1.png"
            alt="Logo Mitra: Diktisaintek Berdampak, Universitas Negeri Malang, FIS, Departemen Geografi"
            className="topbar-logo-img"
          />
        </div>
        <div className="crumb" id="crumb">
          {currentCrumb}
        </div>

        {/* Offline Status Badge (Muncul saat koneksi terputus) */}
        {!pwaState.isOnline && (
          <div
            className="topbar-offline-indicator"
            title="Koneksi internet terputus. Mode offline aktif dengan aset lokal."
          >
            <span className="dot amber"></span>
            <span className="lbl">Offline</span>
          </div>
        )}

        {/* Tombol Install PWA 1-Klik (Muncul di Chrome/Edge saat installable) */}
        {pwaState.isInstallable && !pwaState.isInstalled && (
          <button
            type="button"
            className="refs-btn pwa-install-btn"
            id="btn-pwa-install"
            onClick={async () => {
              sound.snap();
              await promptPWAInstall();
            }}
            title="Pasang aplikasi Dinamika Litosfer di PC lab / tablet untuk akses cepat"
          >
            📲 Pasang App
          </button>
        )}

        {/* Gamification Rank & Badges Button */}
        <button
          type="button"
          className="refs-btn rank-pill-btn"
          id="btn-badges"
          onClick={handleBadgesClick}
          title={`Pangkat Geolog: ${rank.title} (${progress.xp} XP). Klik untuk melihat lencana.`}
        >
          <span className="rank-btn-icon">{rank.icon}</span>
          <span className="rank-btn-label">Lv.{rank.level} · {rank.title.split(' ')[0]}</span>
          <span className="rank-btn-badge-count">{unlockedBadgesCount}/5</span>
        </button>

        {/* Keyboard Hotkeys Guide Button */}
        <button
          type="button"
          className="refs-btn shortcuts-btn"
          id="btn-shortcuts"
          onClick={handleShortcutsClick}
          title="Panduan Pintasan Papan Ketik Guru & Siswa (Tekan ?)"
        >
          ⌨️ Pintasan
        </button>

        {/* Audio Mute / Unmute Toggle Button */}
        <button
          type="button"
          className={`refs-btn sound-toggle-btn ${isMuted ? 'muted' : 'active'}`}
          id="btn-sound-toggle"
          onClick={onToggleMute}
          title={isMuted ? 'Aktifkan Efek Suara (Tekan M)' : 'Bisukan Suara (Tekan M)'}
          aria-label={isMuted ? 'Suara dinonaktifkan' : 'Suara aktif'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Literature Reference Button */}
        <button
          type="button"
          className="refs-btn"
          id="btn-refs"
          onClick={handleRefsClick}
        >
          Referensi
        </button>
      </div>
    </header>
  );
};
