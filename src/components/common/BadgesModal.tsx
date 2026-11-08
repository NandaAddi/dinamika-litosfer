import React, { useEffect, useRef, useState } from 'react';
import { progressStore, getRankTitle, ProgressData } from '../../data/progressStore';
import { sound } from '../../utils/soundEffects';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificate?: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  onOpenCertificate
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<ProgressData>(() => progressStore.getData());

  useEffect(() => {
    return progressStore.subscribe(() => {
      setData({ ...progressStore.getData() });
    });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const rank = getRankTitle(data.xp);
  const badgesList = Object.values(data.badges);
  const unlockedCount = badgesList.filter((b) => b.unlocked).length;

  return (
    <dialog
      ref={dialogRef}
      id="badges-dialog"
      aria-labelledby="badges-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="refs-head">
        <div className="shortcuts-modal-title">
          <span className="shortcuts-title-icon">🏅</span>
          <div>
            <h3 id="badges-title">Pencapaian &amp; Lencana Geolog Lapangan</h3>
            <p className="shortcuts-title-sub">
              Daftar lencana kompetensi ilmiah yang telah Anda kuasai dalam ekspedisi litosfer.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="refs-close"
          aria-label="Tutup lencana prestasi"
          onClick={() => {
            sound.snap();
            onClose();
          }}
        >
          ✕
        </button>
      </div>

      <div className="badges-dialog-body">
        {/* Banner Pangkat Karir Siswa */}
        <div className="rank-overview-card">
          <div className="rank-left">
            <span className="rank-avatar-icon">{rank.icon}</span>
            <div>
              <span className="rank-level-tag">TINGKATAN KARIR GEOLOG · LEVEL {rank.level}</span>
              <h4 className="rank-title">{rank.title}</h4>
              <div className="rank-xp-meta">
                <b>{data.xp} XP</b> terkumpul · {unlockedCount} dari 5 Lencana Terbuka
              </div>
            </div>
          </div>
          <div className="rank-progress-wrap">
            <div className="rank-progress-label">
              <span>Menuju Level Berikutnya</span>
              <span>{Math.min(100, Math.round((data.xp / rank.nextXp) * 100))}%</span>
            </div>
            <div className="rank-progress-track">
              <div
                className="rank-progress-fill"
                style={{ width: `${Math.min(100, (data.xp / rank.nextXp) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid 5 Lencana Prestasi */}
        <div className="badges-grid">
          {badgesList.map((b) => (
            <div
              key={b.id}
              className={`badge-card ${b.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="badge-card-icon-box">
                <span className="badge-main-icon">{b.unlocked ? b.icon : '🔒'}</span>
                {b.unlocked && <span className="badge-shine-effect"></span>}
              </div>
              <div className="badge-card-info">
                <div className="badge-card-head">
                  <span className="badge-topic-tag">{b.topic}</span>
                  <span className="badge-xp-reward">+{b.xpReward} XP</span>
                </div>
                <h5 className="badge-card-title">{b.title}</h5>
                <p className="badge-card-desc">{b.subtitle}</p>
                <div className="badge-card-status">
                  {b.unlocked ? (
                    <span className="badge-unlocked-time">
                      ✨ Terbuka: {b.unlockedAt || 'Selesai'}
                    </span>
                  ) : (
                    <span className="badge-locked-hint">
                      🔒 Tuntaskan materi untuk membuka
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shortcuts-dialog-foot">
        {onOpenCertificate && (
          <button
            type="button"
            className="btn btn-magma"
            onClick={() => {
              sound.snap();
              onClose();
              onOpenCertificate();
            }}
          >
            📄 Cetak / Simpan Portofolio Belajar (A4)
          </button>
        )}
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            sound.snap();
            onClose();
          }}
          style={{ marginLeft: 'auto' }}
        >
          Tutup
        </button>
      </div>
    </dialog>
  );
};
