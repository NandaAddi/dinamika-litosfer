import React from 'react';
import { InquiryChallenge } from '../../data/inquiryChallenges';
import { sound } from '../../utils/soundEffects';

interface InquiryGateCardProps {
  challenge: InquiryChallenge;
  isCompleted: boolean;
  onBypass: () => void;
}

export const InquiryGateCard: React.FC<InquiryGateCardProps> = ({
  challenge,
  isCompleted,
  onBypass
}) => {
  const [showHint, setShowHint] = React.useState(false);

  const handleToggleHint = () => {
    sound.snap();
    setShowHint((prev) => !prev);
  };

  const handleBypassClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sound.snap();
    onBypass();
  };

  return (
    <div
      className={`inquiry-gate-card ${isCompleted ? 'completed' : 'pending'}`}
      role="region"
      aria-label="Misi Inkuiri 3D Kebumian"
    >
      <div className="inquiry-gate-header">
        <div className="inquiry-badge-tag">
          <span className="inquiry-badge-icon">🎯</span>
          <span>{challenge.badge}</span>
        </div>
        <div className="inquiry-xp-pill">
          {isCompleted ? '✓ +75 XP Diperoleh' : '+75 XP Menanti'}
        </div>
      </div>

      <h4 className="inquiry-title">{challenge.title}</h4>

      {!isCompleted ? (
        <div className="inquiry-pending-body">
          <p className="inquiry-instruction">{challenge.instruction}</p>

          <div className="inquiry-status-radar">
            <span className="radar-dot"></span>
            <span className="radar-text">
              Investigasi kanvas 3D: Klik atau pilih komponen yang tepat pada model geologi di sebelah kiri.
            </span>
          </div>

          <div className="inquiry-actions-row">
            <button
              type="button"
              className="inquiry-hint-btn"
              onClick={handleToggleHint}
              aria-expanded={showHint}
            >
              {showHint ? 'Tutup Petunjuk ▲' : '💡 Butuh Petunjuk? ▼'}
            </button>

            <button
              type="button"
              className="inquiry-bypass-btn"
              onClick={handleBypassClick}
              title="Lewati tantangan inkuiri (Mode Guru / Akses Cepat)"
            >
              Lewati Tantangan ➔
            </button>
          </div>

          {showHint && (
            <div className="inquiry-hint-box" role="alert">
              <span className="hint-label">Petunjuk Geologi:</span> {challenge.hint}
            </div>
          )}
        </div>
      ) : (
        <div className="inquiry-success-body">
          <div className="inquiry-success-banner">
            <span className="success-icon">✨</span>
            <div>
              <strong>{challenge.revealedKnowledge.headline}</strong>
              <p>{challenge.revealedKnowledge.fact}</p>
            </div>
          </div>

          <div className="inquiry-significance-box">
            <span className="box-title">🔬 Signifikansi Geologis & Kebencanaan:</span>
            <p>{challenge.revealedKnowledge.significance}</p>
          </div>

          <div className="inquiry-reflection-box">
            <span className="box-title">💭 Pertanyaan Pemantik Refleksi (Diskusi Kelas):</span>
            <p className="reflection-text">"{challenge.reflectionPrompt}"</p>
          </div>
        </div>
      )}
    </div>
  );
};
