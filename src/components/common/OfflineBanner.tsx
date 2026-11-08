import React, { useEffect, useState } from 'react';
import { subscribePWA } from '../../utils/pwaManager';
import { sound } from '../../utils/soundEffects';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let wasOffline = false;
    return subscribePWA((state) => {
      if (!state.isOnline) {
        setIsOnline(false);
        setDismissed(false);
        wasOffline = true;
      } else {
        setIsOnline(true);
        if (wasOffline) {
          setShowReconnected(true);
          const t = setTimeout(() => setShowReconnected(false), 3600);
          return () => clearTimeout(t);
        }
      }
    });
  }, []);

  if (showReconnected) {
    return (
      <div className="offline-toast reconnected" role="status">
        <span className="toast-dot green"></span>
        <div className="toast-text">
          <b>Terhubung Kembali!</b>
          <span>Koneksi internet sekolah terdeteksi aktif kembali.</span>
        </div>
      </div>
    );
  }

  if (!isOnline && !dismissed) {
    return (
      <div className="offline-toast offline" role="status">
        <span className="toast-dot amber"></span>
        <div className="toast-text">
          <b>Mode Offline Aktif</b>
          <span>
            Laboratorium offline siap: Seluruh objek 3D, materi, &amp; kuis tetap berjalan lancar.
          </span>
        </div>
        <button
          type="button"
          className="toast-close"
          onClick={() => {
            sound.snap();
            setDismissed(true);
          }}
          aria-label="Tutup pemberitahuan"
        >
          ✕
        </button>
      </div>
    );
  }

  return null;
};
