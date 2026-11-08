import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EarthViewer } from '../components/3d';
import { sound } from '../utils/soundEffects';

interface HomePageProps {
  isActive?: boolean;
}

const STAGES = [
  { path: '/modul/struktur', num: '01', title: 'Struktur Bumi', icon: '◐', tag: 'Geologi Dasar' },
  { path: '/modul/lempeng', num: '02', title: 'Lempeng Tektonik', icon: '◫', tag: 'Dinamika Kerak' },
  { path: '/modul/vulkanisme', num: '03', title: 'Vulkanisme Semeru', icon: '△', tag: 'Aktivitas Magma' },
  { path: '/modul/endogen', num: '04', title: 'Tenaga Endogen', icon: '◬', tag: 'Morfologi & Batuan' },
  { path: '/kuis', num: '05', title: 'Kuis Evaluasi', icon: '◇', tag: 'Tantangan 13 Soal' },
];

export const HomePage: React.FC<HomePageProps> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lobby' | 'pemantik'>('lobby');
  const [mobileView, setMobileView] = useState<'model' | 'slider'>('slider');

  const switchTab = (tab: 'lobby' | 'pemantik') => {
    sound.snap();
    setActiveTab(tab);
  };

  const handleStageClick = (path: string) => {
    sound.snap();
    navigate(path);
  };

  return (
    <section className={`page fit-view ${isActive ? 'active' : ''}`} id="page-beranda">
      {/* Mobile view toggle */}
      <div className="mobile-view-toggle">
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'model' ? 'active' : ''}`}
          onClick={() => {
            sound.snap();
            setMobileView('model');
          }}
        >
          🧊 Globe 3D
        </button>
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'slider' ? 'active' : ''}`}
          onClick={() => {
            sound.snap();
            setMobileView('slider');
          }}
        >
          🎮 {activeTab === 'lobby' ? 'Lobby Belajar' : 'Pertanyaan Pemantik'}
        </button>
      </div>

      <div className={`home-unified-card ${mobileView === 'model' ? 'show-model' : ''}`}>
        {/* Kolom Kiri: Panel Konten (Lobby Belajar / Pertanyaan Pemantik) */}
        <div className="home-pane-content">
          <div className="home-nav-header">
            <div className="home-tab-switcher">
              <button
                type="button"
                className={`home-tab-btn ${activeTab === 'lobby' ? 'active' : ''}`}
                onClick={() => switchTab('lobby')}
              >
                <span className="tab-icon">🎮</span> Lobby Belajar
              </button>
              <button
                type="button"
                className={`home-tab-btn ${activeTab === 'pemantik' ? 'active' : ''}`}
                onClick={() => switchTab('pemantik')}
              >
                <span className="tab-icon">💡</span> Pertanyaan Pemantik
              </button>
            </div>
            <span className="home-edition-badge">Geografi SMA/MA · Kurikulum Merdeka</span>
          </div>

          <div className="home-scroll-area">
            {activeTab === 'lobby' ? (
              <div className="home-lobby-view">
                <div className="hero-badges">
                  <span className="hbadge">🎮 Interactive Learning Game</span>
                  <span className="hbadge">4 Simulasi 3D</span>
                  <span className="hbadge">13 Soal Evaluasi</span>
                </div>

                <h1 className="mercury-hero-title">
                  Dinamika <em>Litosfer</em>
                </h1>
                <p className="mercury-lead">
                  Selamat datang di arena eksplorasi interaktif kebumian! Pelajari struktur interior planet, pergerakan lempeng, dapur magma Semeru, hingga siklus batuan Nusantara.
                </p>

                <div className="hero-cta-row">
                  <button
                    type="button"
                    className="btn btn-magma btn-play-game"
                    onClick={() => handleStageClick('/modul/struktur')}
                  >
                    ▶ Mulai Petualangan
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleStageClick('/kuis')}
                  >
                    🏆 Kuis Evaluasi
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => switchTab('pemantik')}
                  >
                    💡 Pertanyaan Pemantik →
                  </button>
                </div>

                {/* Stage Select Grid */}
                <div className="stage-select-section">
                  <div className="stage-select-title">
                    <span>PILIH MISI / STAGE MODUL</span>
                  </div>
                  <div className="stage-grid">
                    {STAGES.map((s) => (
                      <div
                        key={s.path}
                        className="stage-card"
                        onClick={() => handleStageClick(s.path)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleStageClick(s.path);
                        }}
                      >
                        <div className="stage-head">
                          <span className="stage-num">STAGE {s.num}</span>
                          <span className="stage-ic">{s.icon}</span>
                        </div>
                        <div className="stage-name">{s.title}</div>
                        <span className="stage-tag">{s.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hero-goal">
                  <b>Tujuan Pembelajaran Geografi</b>
                  <span>
                    Menganalisis karakteristik lapisan bumi, batas lempeng, vulkanisme Semeru, siklus batuan, serta deformasi tenaga endogen dan perombakan eksogen-antropogenik.
                  </span>
                  <div className="hero-dev-meta">
                    <b>Pengembang:</b> Departemen Geografi · FIS · Universitas Negeri Malang (Diktisaintek Berdampak)
                  </div>
                </div>
              </div>
            ) : (
              <div className="home-pemantik-view">
                <div className="pemantik-header-block">
                  <h3 className="pemantik-title">
                    Pertanyaan Pemantik untuk Diskusi Kelas
                  </h3>
                  <p className="pemantik-subtitle">
                    Renungkan 4 fenomena esensial ini sebelum menjelajahi materi dan simulasi 3D kebumian:
                  </p>
                </div>

                <div className="pemantik-grid">
                  <div className="pemantik-card">
                    <span className="p-tag">01 · BUKTI INTERIOR BUMI</span>
                    <p>
                      Jika lubang terdalam Kola hanya 12 km, bagaimana ilmuwan tahu inti bumi terdiri dari besi-nikel cair &amp; padat?
                    </p>
                  </div>
                  <div className="pemantik-card">
                    <span className="p-tag">02 · SEBARAN GEMPA NUSANTARA</span>
                    <p>
                      Mengapa gempa bumi sangat aktif di Sumatra dan Jawa, namun relatif jarang di Kalimantan? Telusuri batas lempeng tektonik!
                    </p>
                  </div>
                  <div className="pemantik-card">
                    <span className="p-tag">03 · MERAPI VS KILAUEA</span>
                    <p>
                      Mengapa letusan Merapi menghasilkan awan panas (<i>nuée ardente</i>), sedangkan Hawaii berupa lelehan lava tenang?
                    </p>
                  </div>
                  <div className="pemantik-card">
                    <span className="p-tag">04 · ANTROPOGENIK JAKARTA</span>
                    <p>
                      Penurunan tanah Jakarta mencapai 5–15 cm/tahun. Apakah murni alami atau akibat eksploitasi air tanah manusia?
                    </p>
                  </div>
                </div>

                <div className="pemantik-action-row">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => switchTab('lobby')}
                  >
                    ← Kembali ke Lobby Belajar
                  </button>
                  <button
                    type="button"
                    className="btn btn-magma"
                    onClick={() => handleStageClick('/modul/struktur')}
                  >
                    Mulai Stage 01: Struktur Bumi →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Viewport 3D Terpadu */}
        <div className="home-pane-viewport">
          <EarthViewer
            pageId="beranda"
            badgeTitle="3D Interaktif · Dinamika Litosfer"
            isActive={isActive}
            variant="embedded"
          />
        </div>
      </div>
    </section>
  );
};
