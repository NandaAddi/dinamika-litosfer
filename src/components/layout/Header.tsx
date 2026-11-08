import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenRefs: () => void;
}

const CRUMB_MAP: Record<string, string> = {
  '/': 'Beranda',
  '/modul/struktur': '01 · Struktur Bumi',
  '/modul/lempeng': '02 · Lempeng Tektonik',
  '/modul/vulkanisme': '03 · Vulkanisme',
  '/modul/endogen': '04 · Tenaga Endogen',
  '/kuis': '05 · Kuis Interaktif'
};

export const Header: React.FC<HeaderProps> = ({ onOpenRefs }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentCrumb = CRUMB_MAP[location.pathname] || 'Dinamika Litosfer';

  return (
    <header className="topbar">
      {/* Left: Mercury Brand Mark with Concentric-Circle Lithosphere Icon */}
      <div
        className="aside-brand"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/');
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

      {/* Right: Partner Logo, Crumb Indicator & Ghost Pill Action */}
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
        <button
          type="button"
          className="refs-btn"
          id="btn-refs"
          onClick={onOpenRefs}
        >
          Referensi
        </button>
      </div>
    </header>
  );
};
