import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavItemData {
  to: string;
  icon: string;
  label: string;
  badge: string;
}

const MODULE_ITEMS: NavItemData[] = [
  { to: '/modul/struktur', icon: '◐', label: 'Struktur Bumi', badge: '01' },
  { to: '/modul/lempeng', icon: '◫', label: 'Lempeng Tektonik', badge: '02' },
  { to: '/modul/vulkanisme', icon: '△', label: 'Vulkanisme Semeru', badge: '03' },
  { to: '/modul/endogen', icon: '◬', label: 'Tenaga Endogen', badge: '04' },
  { to: '/kuis', icon: '◇', label: 'Kuis Evaluasi', badge: '05' }
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="app-sidebar" aria-label="Navigasi Modul Pembelajaran">
      <div className="sidebar-header">
        <span className="sidebar-section-tag">Daftar Modul</span>
      </div>

      <nav className="sidebar-nav">
        {MODULE_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-item-ic" aria-hidden="true">{item.icon}</span>
            <span className="sidebar-item-label">{item.label}</span>
            <span className="sidebar-item-badge">{item.badge}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-home-btn"
          onClick={() => navigate('/')}
          title="Kembali ke Beranda (Lobby Game)"
        >
          <span className="home-btn-ic">⌂</span>
          <span className="home-btn-txt">Menu Utama</span>
        </button>
      </div>
    </aside>
  );
};
