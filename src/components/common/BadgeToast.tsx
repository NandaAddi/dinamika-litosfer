import React, { useEffect, useState } from 'react';
import { BadgeInfo, progressStore } from '../../data/progressStore';
import { sound } from '../../utils/soundEffects';

export const BadgeToast: React.FC = () => {
  const [toastBadge, setToastBadge] = useState<BadgeInfo | null>(null);

  useEffect(() => {
    progressStore.setToastListener((badge: BadgeInfo) => {
      sound.quizFinish();
      setToastBadge(badge);

      const timer = setTimeout(() => {
        setToastBadge(null);
      }, 4800);

      return () => clearTimeout(timer);
    });

    return () => {
      progressStore.setToastListener(null);
    };
  }, []);

  if (!toastBadge) return null;

  return (
    <div className="badge-toast-container" role="status" aria-live="polite">
      <div className="badge-toast" onClick={() => setToastBadge(null)}>
        <div className="badge-toast-icon">{toastBadge.icon}</div>
        <div className="badge-toast-body">
          <div className="badge-toast-headline">
            <span>✨ LENCANA PRESTASI TERBUKA!</span>
            <span className="badge-toast-xp">+{toastBadge.xpReward} XP</span>
          </div>
          <div className="badge-toast-title">{toastBadge.title}</div>
          <div className="badge-toast-sub">{toastBadge.subtitle}</div>
        </div>
        <button
          type="button"
          className="badge-toast-close"
          onClick={(e) => {
            e.stopPropagation();
            setToastBadge(null);
          }}
          aria-label="Tutup notifikasi"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
