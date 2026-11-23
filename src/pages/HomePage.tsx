import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeismicPreloader } from '../components/common/SeismicPreloader';
import { sound } from '../utils/soundEffects';
import { useIsMobileViewport } from '../utils/devicePerf';

const EarthViewer = lazy(() => import('../components/3d/EarthViewer').then((m) => ({ default: m.EarthViewer })));

interface HomePageProps {
  isActive?: boolean;
}

const STAGES = [
  { path: '/modul/struktur', num: '01', title: 'Struktur Bumi', icon: '◐', tag: 'Geologi Dasar' },
  { path: '/modul/lempeng', num: '02', title: 'Lempeng Tektonik', icon: '◫', tag: 'Dinamika Kerak' },
  { path: '/modul/vulkanisme', num: '03', title: 'Vulkanisme Semeru', icon: '△', tag: 'Aktivitas Magma' },
  { path: '/modul/endogen', num: '04', title: 'Tenaga Endogen', icon: '◬', tag: 'Morfologi & Batuan' }
];

export const HomePage: React.FC<HomePageProps> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobileViewport();
  const [activeTab, setActiveTab] = useState<'lobby' | 'pemantik'>('lobby');
  const [mobileView, setMobileView] = useState<'model' | 'slider'>('slider');
  const [hasOpenedModel, setHasOpenedModel] = useState<boolean>(() => !isMobile);

  useEffect(() => {
    if (!isMobile || mobileView === 'model') {
      setHasOpenedModel(true);
    }
  }, [isMobile, mobileView]);

  const shouldRenderViewer = isActive && (!isMobile || hasOpenedModel);
  const isViewerActive = isActive && (!isMobile || mobileView === 'model');

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
          Globe 3D
        </button>
        <button
          type="button"
          className={`mobile-toggle-btn ${mobileView === 'slider' ? 'active' : ''}`}
          onClick={() => {
            sound.snap();
            setMobileView('slider');
          }}
        >
          {activeTab === 'lobby' ? 'Lobby Belajar' : 'Pertanyaan Pemantik'}
        </button>
      </div>

      <div className={`home-unified-card ${mobileView === 'model' ? 'show-model' : ''}`}>
        {/* Kolom Kiri: Panel Konten (Lobby Belajar / Pertanyaan Pemantik) */}
        <div className="home-pane-content">
          <div className="home-scroll-area">
            {activeTab === 'lobby' ? (
              <div className="home-lobby-view">
                <div className="hero-badges">
                  <span className="hbadge">4 Simulasi 3D</span>
                  <span className="hbadge">4 Modul Materi</span>
                  <span className="hbadge">Kurikulum Merdeka</span>
                </div>

                <h1 className="mercury-hero-title">
                  <img
                    src="/logo-horizontal.svg"
                    alt="LITOVERSE — Dinamika Litosfer"
                    className="hero-brand-logo"
                    width="1088"
                    height="340"
                  />
                </h1>
                <p className="mercury-lead">
                  Arena eksplorasi 3D interaktif kebumian: struktur interior planet, batas lempeng, dapur magma Semeru, hingga siklus batuan Nusantara.
                </p>

                <div className="hero-cta-row">
                  <button
                    type="button"
                    className="btn btn-magma btn-play-game"
                    onClick={() => handleStageClick('/modul/struktur')}
                  >
                    Mulai Petualangan
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => switchTab('pemantik')}
                  >
                    Pertanyaan Pemantik
                  </button>
                </div>

                {/* Stage Select Grid 2x2 (Cardless & Balanced) */}
                <div className="stage-select-section">
                  <div className="stage-select-title">
                    <span>PILIH STAGE</span>
                  </div>
                  <div className="stage-grid">
                    {STAGES.map((s) => (
                      <button
                        type="button"
                        key={s.path}
                        className="stage-card"
                        onClick={() => handleStageClick(s.path)}
                        title={`${s.title} — ${s.tag}`}
                      >
                        <span className="stage-num">{s.num}</span>
                        <span className="stage-name">{s.title}</span>
                        <span className="stage-ic" aria-hidden="true">{s.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hero-goal">
                  <p className="hero-goal-line">
                    <b>Tujuan Pembelajaran:</b> Analisis lapisan bumi, batas lempeng, vulkanisme Semeru, siklus batuan, dan deformasi endogen-eksogen.
                  </p>
                  <p className="hero-dev-meta">
                    Departemen Geografi · FIS · Universitas Negeri Malang
                  </p>
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
                    Kembali ke Beranda
                  </button>
                  <button
                    type="button"
                    className="btn btn-magma"
                    onClick={() => handleStageClick('/modul/struktur')}
                  >
                    Mulai Stage 01: Struktur Bumi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Viewport 3D Terpadu */}
        <div className="home-pane-viewport">
          {shouldRenderViewer && (
            <Suspense
              fallback={
                <div className="model-frame-card model-embedded-viewport" style={{ position: 'relative' }}>
                  <SeismicPreloader moduleType="beranda" />
                </div>
              }
            >
              <EarthViewer
                pageId="beranda"
                badgeTitle="3D Interaktif · Dinamika Litosfer"
                isActive={isViewerActive}
                variant="embedded"
              />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
};
