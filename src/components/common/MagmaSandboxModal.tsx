import React, { useEffect, useRef } from 'react';
import {
  MagmaParams,
  EruptionTelemetry,
  calculateMagmaPhysics,
  MAGMA_PRESETS
} from '../../data/magmaPhysics';
import { sound } from '../../utils/soundEffects';

interface MagmaSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: MagmaParams;
  onChangeParams: (params: MagmaParams) => void;
  onTriggerEruption: () => void;
}

export const MagmaSandboxModal: React.FC<MagmaSandboxModalProps> = ({
  isOpen,
  onClose,
  params,
  onChangeParams,
  onTriggerEruption
}) => {
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

  const telemetry: EruptionTelemetry = calculateMagmaPhysics(
    params.silicaPercent,
    params.gasContentPercent
  );

  const handleSilicaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeParams({
      ...params,
      silicaPercent: Number(e.target.value)
    });
  };

  const handleGasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeParams({
      ...params,
      gasContentPercent: Number(e.target.value)
    });
  };

  const handleSelectPreset = (presetKey: string) => {
    const p = MAGMA_PRESETS[presetKey];
    if (p) {
      sound.snap();
      onChangeParams({
        silicaPercent: p.silica,
        gasContentPercent: p.gas
      });
    }
  };

  const handleTrigger = () => {
    sound.volcanicExplosion(telemetry.vei, telemetry.regime === 'plinian');
    onTriggerEruption();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      sound.snap();
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="magma-sandbox-dialog"
      onClick={handleBackdropClick}
      aria-label="Laboratorium Fisika Magma Semeru"
    >
      <div className="sandbox-dialog-header">
        <div className="sandbox-title-wrap">
          <span className="sandbox-icon">🧪</span>
          <div>
            <h3>Laboratorium Fisika Magma Semeru</h3>
            <p>Eksperimen Interaktif Viskositas Silika ($SiO_2$), Tekanan Gas &amp; Dinamika Erupsi</p>
          </div>
        </div>
        <button
          type="button"
          className="close-btn"
          aria-label="Tutup simulator"
          onClick={() => {
            sound.snap();
            onClose();
          }}
        >
          ✕
        </button>
      </div>

      <div className="sandbox-dialog-body">
        {/* Preset Cepat Analogi Gunung Api */}
        <div className="sandbox-presets-bar">
          <span className="presets-label">⚡ Preset Gunung Api:</span>
          <div className="presets-chips">
            {Object.entries(MAGMA_PRESETS).map(([key, item]) => {
              const isSelected =
                params.silicaPercent === item.silica &&
                params.gasContentPercent === item.gas;
              return (
                <button
                  key={key}
                  type="button"
                  className={`preset-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectPreset(key)}
                  title={item.desc}
                >
                  <span>{item.icon}</span> {item.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Kontrol Slider Fisika */}
        <div className="sandbox-sliders-grid">
          {/* Slider 1: Viskositas Silika */}
          <div className="sandbox-control-card">
            <div className="ctrl-card-header">
              <label htmlFor="silica-slider">
                <b>1. Viskositas Magma &amp; Silika ($SiO_2$):</b>
              </label>
              <span className="ctrl-val-badge">
                {params.silicaPercent}% $SiO_2$
              </span>
            </div>
            <input
              id="silica-slider"
              type="range"
              min="45"
              max="75"
              step="1"
              value={params.silicaPercent}
              onChange={handleSilicaChange}
              className="magma-range-slider"
            />
            <div className="slider-ticks-row">
              <span>45% (Basa Encer)</span>
              <span>58% (Andesit Semeru)</span>
              <span>75% (Asam Kental)</span>
            </div>
            <div className="ctrl-note">
              <span>Suhu Lelehan: <b>± {telemetry.temperatureCelsius} °C</b></span>
              <span>Karakteristik: <b>{telemetry.viscosityRating}</b></span>
            </div>
          </div>

          {/* Slider 2: Kandungan Gas Volatil */}
          <div className="sandbox-control-card">
            <div className="ctrl-card-header">
              <label htmlFor="gas-slider">
                <b>2. Kandungan Gas Volatil ($H_2O, CO_2, SO_2$):</b>
              </label>
              <span className="ctrl-val-badge gas">
                {params.gasContentPercent}% wt
              </span>
            </div>
            <input
              id="gas-slider"
              type="range"
              min="0.5"
              max="6.5"
              step="0.1"
              value={params.gasContentPercent}
              onChange={handleGasChange}
              className="magma-range-slider gas"
            />
            <div className="slider-ticks-row">
              <span>0.5% (Efusif Tenang)</span>
              <span>3.5% (Eksplosif Semeru)</span>
              <span>6.5% (Katastrofik)</span>
            </div>
            <div className="ctrl-note">
              <span>Daya Ledak: <b>{telemetry.gasPressureRating}</b></span>
            </div>
          </div>
        </div>

        {/* Kartu Hasil Telemetri Geofisika */}
        <div className="sandbox-telemetry-panel">
          <div className="telemetry-header">
            <div className="regime-title">
              <span className="regime-badge">HASIL DIAGNOSIS SAINS</span>
              <h4>{telemetry.regimeName}</h4>
            </div>
            <div className="vei-gauge">
              <span className="vei-lbl">Skala Indeks Letusan</span>
              <span className="vei-number">VEI {telemetry.vei}</span>
            </div>
          </div>

          <div className="telemetry-stats-row">
            <div className="tele-stat-card">
              <span className="t-lbl">Tinggi Kolom Letusan</span>
              <b className="t-val">{telemetry.columnHeightKm} km</b>
            </div>
            <div className="tele-stat-card">
              <span className="t-lbl">Kecepatan Aliran / APG</span>
              <b className="t-val">{telemetry.flowVelocityKmH} km/jam</b>
            </div>
            <div className="tele-stat-card">
              <span className="t-lbl">Batuan Beku Terbentuk</span>
              <b className="t-val small">{telemetry.rockFormed}</b>
            </div>
          </div>

          <div className="telemetry-analysis-box">
            <p className="analysis-text">{telemetry.explanation}</p>
            <div className="hazard-warning">
              <span>⚠️ Bahaya Utama:</span> {telemetry.primaryHazard}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sandbox-footer-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              sound.snap();
              onClose();
            }}
          >
            👁️ Amati Model 3D Bebas
          </button>
          <button
            type="button"
            className="btn btn-magma btn-trigger-erupt"
            onClick={handleTrigger}
          >
            💥 Picu Erupsi Magma (Simulasi 3D)
          </button>
        </div>
      </div>
    </dialog>
  );
};
