import React, { useEffect, useRef } from 'react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: 'Navigasi Slide & Modul' | 'Kontrol Model 3D' | 'Audio & Sistem';
}

const SHORTCUTS: ShortcutItem[] = [
  {
    category: 'Navigasi Slide & Modul',
    keys: ['→', 'D'],
    description: 'Pindah ke slide materi berikutnya'
  },
  {
    category: 'Navigasi Slide & Modul',
    keys: ['←', 'A'],
    description: 'Kembali ke slide materi sebelumnya'
  },
  {
    category: 'Navigasi Slide & Modul',
    keys: ['1', '2', '3', '4', '5'],
    description: 'Lompat langsung ke Modul 1 s.d. 5 (Kuis)'
  },
  {
    category: 'Kontrol Model 3D',
    keys: ['Spasi'],
    description: 'Jeda / Jalankan rotasi animasi simulasi 3D'
  },
  {
    category: 'Kontrol Model 3D',
    keys: ['R'],
    description: 'Reset sudut kamera 3D ke posisi awal'
  },
  {
    category: 'Kontrol Model 3D',
    keys: ['L'],
    description: 'Tampilkan / Sembunyikan label penanda 3D'
  },
  {
    category: 'Kontrol Model 3D',
    keys: ['P'],
    description: 'Pisahkan / Satukan anatomi lapisan 3D (Exploded View)'
  },
  {
    category: 'Audio & Sistem',
    keys: ['M'],
    description: 'Bisu / Aktifkan efek suara (Toggle Mute)'
  },
  {
    category: 'Audio & Sistem',
    keys: ['?', 'H'],
    description: 'Buka / Tutup panduan pintasan papan ketik'
  },
  {
    category: 'Audio & Sistem',
    keys: ['Esc'],
    description: 'Tutup jendela dialog aktif'
  }
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const categories = Array.from(new Set(SHORTCUTS.map((s) => s.category)));

  return (
    <dialog
      ref={dialogRef}
      id="shortcuts-dialog"
      aria-labelledby="shortcuts-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="refs-head">
        <div className="shortcuts-modal-title">
          <span className="shortcuts-title-icon">⌨️</span>
          <div>
            <h3 id="shortcuts-title">Pintasan Papan Ketik (Keyboard Hotkeys)</h3>
            <p className="shortcuts-title-sub">
              Dirancang untuk mempermudah navigasi pengajaran guru di kelas dan eksplorasi mandiri siswa.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="refs-close"
          aria-label="Tutup panduan pintasan"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="shortcuts-dialog-body">
        {categories.map((cat) => (
          <div key={cat} className="shortcuts-category-section">
            <h4 className="shortcuts-cat-title">{cat}</h4>
            <div className="shortcuts-table">
              {SHORTCUTS.filter((s) => s.category === cat).map((s, idx) => (
                <div key={idx} className="shortcuts-row">
                  <div className="shortcuts-keys">
                    {s.keys.map((k, kIdx) => (
                      <React.Fragment key={k}>
                        {kIdx > 0 && <span className="kbd-sep">atau</span>}
                        <kbd className="kbd-key">{k}</kbd>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="shortcuts-desc">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="shortcuts-dialog-foot">
        <span className="shortcuts-foot-hint">
          💡 Tips: Tekan <kbd className="kbd-key kbd-mini">M</kbd> kapan saja untuk membisukan audio seketika di ruang kelas.
        </span>
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Tutup Panduan
        </button>
      </div>
    </dialog>
  );
};
