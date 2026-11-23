import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { progressStore } from '../../data/progressStore';

interface NavItemData {
  to: string;
  icon: string;
  label: string;
  shortcut: string;
  requiresAllModules?: boolean;
}

const MODULE_ITEMS: NavItemData[] = [
  { to: '/modul/struktur', icon: '/assets/icons/struktur-bumi.webp', label: 'Struktur Bumi', shortcut: '1' },
  { to: '/modul/lempeng', icon: '/assets/icons/lempeng-tektonik.webp', label: 'Lempeng Tektonik', shortcut: '2' },
  { to: '/modul/vulkanisme', icon: '/assets/icons/vulkanisme.webp', label: 'Vulkanisme Semeru', shortcut: '3' },
  { to: '/modul/endogen', icon: '/assets/icons/tenaga-endogen.webp', label: 'Tenaga Endogen', shortcut: '4' },
  { to: '/kuis', icon: '/assets/icons/quiz.webp', label: 'Kuis Evaluasi', shortcut: '5', requiresAllModules: true }
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [unlockStatus, setUnlockStatus] = useState(() => progressStore.getQuizUnlockStatus());

  useEffect(() => {
    return progressStore.subscribe(() => {
      setUnlockStatus(progressStore.getQuizUnlockStatus());
    });
  }, []);

  return (
    <aside className="app-sidebar icon-only-sidebar" aria-label="Navigasi Modul Pembelajaran">
      <nav className="sidebar-nav">
        {MODULE_ITEMS.map((item) => {
          const isLocked = Boolean(item.requiresAllModules && !unlockStatus.unlocked);

          if (isLocked) {
            return (
              <button
                key={item.to}
                type="button"
                className="sidebar-item locked"
                aria-disabled="true"
                aria-label={`${item.label} terkunci (${unlockStatus.completedCount}/${unlockStatus.totalRequired} modul selesai)`}
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="sidebar-item-img"
                  width="40"
                  height="40"
                  loading="eager"
                />
                <span className="sidebar-lock-badge" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div className="sidebar-flyout" role="tooltip" aria-hidden="true">
                  <span className="flyout-label">Kuis Terkunci · Selesaikan 4 Modul</span>
                  <span className="flyout-badge">
                    {unlockStatus.completedCount}/{unlockStatus.totalRequired}
                  </span>
                </div>
              </button>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              aria-label={`${item.label} (Tekan ${item.shortcut})`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="sidebar-item-img"
                width="40"
                height="40"
                loading="eager"
              />
              <div className="sidebar-flyout" role="tooltip" aria-hidden="true">
                <span className="flyout-label">{item.label}</span>
                <span className="flyout-badge">{item.shortcut}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-home-btn"
          onClick={() => navigate('/')}
          aria-label="Kembali ke Beranda (Menu Utama)"
        >
          <svg
            className="home-btn-svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <div className="sidebar-flyout" role="tooltip" aria-hidden="true">
            <span className="flyout-label">Menu Utama</span>
          </div>
        </button>
      </div>
    </aside>
  );
};
