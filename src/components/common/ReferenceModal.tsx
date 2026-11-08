import React, { useEffect, useRef } from 'react';
import { REFERENCES_DATA } from '../../data/references';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <dialog
      ref={dialogRef}
      id="refs"
      aria-labelledby="refs-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="refs-head">
        <h3 id="refs-title">Referensi Literatur Geologi &amp; Kurikulum</h3>
        <button
          type="button"
          className="refs-close"
          aria-label="Tutup referensi"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <ul className="refs-list">
        {REFERENCES_DATA.map((ref, idx) => (
          <li key={idx}>
            <div className="refs-item-top">
              <strong>{ref.citation}</strong>
              <span className="hbadge">{ref.category}</span>
            </div>
            <p className="refs-item-desc">{ref.description}</p>
          </li>
        ))}
      </ul>
    </dialog>
  );
};
