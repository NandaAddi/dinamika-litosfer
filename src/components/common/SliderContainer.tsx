import React, { useRef } from 'react';
import { Slide } from '../../types';
import { sound } from '../../utils/soundEffects';
import { InquiryChallenge } from '../../data/inquiryChallenges';
import { InquiryGateCard } from './InquiryGateCard';

interface SliderContainerProps {
  topicTag: string;
  slides: Slide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  nextCtaLabel?: string;
  onNextCta?: () => void;
  isEndogenRockCycle?: boolean;
  inquiryChallenge?: InquiryChallenge | null;
  isInquiryCompleted?: boolean;
  onBypassInquiry?: () => void;
}

export const SliderContainer: React.FC<SliderContainerProps> = ({
  topicTag,
  slides,
  currentSlide,
  onSlideChange,
  nextCtaLabel = 'Berikutnya →',
  onNextCta,
  inquiryChallenge,
  isInquiryCompleted = true,
  onBypassInquiry
}) => {
  const total = slides ? slides.length : 0;
  const safeIdx = total > 0 ? Math.max(0, Math.min(total - 1, currentSlide)) : 0;
  const fallbackSlide: Slide = {
    number: '01',
    title: '',
    desc: '',
    points: [],
    chips: []
  };
  const slide: Slide = (slides && slides[safeIdx]) ? slides[safeIdx] : fallbackSlide;
  const isFirst = safeIdx === 0;
  const isLast = safeIdx === total - 1;
  const progressPct = total > 0 ? ((safeIdx + 1) / total) * 100 : 0;
  const isChallengeActive = !!(inquiryChallenge && inquiryChallenge.targetSlide === safeIdx);
  const isLocked = isChallengeActive && !isInquiryCompleted;
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    swipeStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - swipeStartRef.current.x;
    const dy = e.changedTouches[0].clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;

    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    if (dx < 0 && !isLast && !isLocked) {
      sound.slideWhoosh();
      onSlideChange(safeIdx + 1);
    } else if (dx > 0 && !isFirst) {
      sound.slideWhoosh();
      onSlideChange(safeIdx - 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      sound.slideWhoosh();
      onSlideChange(safeIdx - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      sound.slideWhoosh();
      onSlideChange(safeIdx + 1);
    } else if (onNextCta) {
      sound.snap();
      onNextCta();
    }
  };

  return (
    <div className="slider-frame-card">
      <div className="slider-header">
        <div className="slider-top-meta">
          <span className="slider-topic-tag">{topicTag}</span>
          <span className="slider-step-count">
            Slide {currentSlide + 1} dari {total}
          </span>
        </div>
        <div className="slider-stepper-track">
          <div className="slider-stepper-fill" style={{ width: `${progressPct}%` }}></div>
        </div>
      </div>

      <div
        className="slider-body"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slide-item active">
          <div className="slide-intro">
            <h3>{slide.title}</h3>
            <p>{slide.desc}</p>
          </div>

          {/* Gerbang Inkuiri 3D Interaktif jika slide ini memiliki misi kebumian */}
          {isChallengeActive && inquiryChallenge && (
            <InquiryGateCard
              challenge={inquiryChallenge}
              isCompleted={!isLocked}
              onBypass={onBypassInquiry || (() => {})}
            />
          )}

          {slide.points && slide.points.length > 0 && (
            <ul className="info-points">
              {slide.points.map((pt, idx) => {
                const parts = pt.split(': ');
                return (
                  <li key={idx}>
                    <span className="b-ic" aria-hidden="true">◇</span>
                    <div>
                      {parts.length > 1 ? (
                        <>
                          <b>{parts[0]}: </b>
                          <span>{parts.slice(1).join(': ')}</span>
                        </>
                      ) : (
                        <span>{pt}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Diagram Siklus Batuan Khusus Slide 5 Tenaga Endogen */}
          {topicTag.includes('Geomorfologi') && currentSlide === 4 && (
            <svg
              className="rock-cycle"
              viewBox="0 0 380 140"
              role="img"
              aria-label="Diagram siklus batuan: magma, batuan beku, batuan sedimen, batuan metamorf"
              style={{ width: '100%', maxWidth: '340px', height: '115px', margin: '6px auto', display: 'block' }}
            >
              <defs>
                <marker
                  id="rc-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10 z" fill="#c3c3cc" />
                </marker>
              </defs>
              <g fill="none" stroke="#70707d" strokeWidth="1.2" markerEnd="url(#rc-arrow)">
                <path d="M245 18 Q325 18 325 56" />
                <path d="M325 84 Q325 122 247 122" />
                <path d="M135 122 Q55 122 55 84" />
                <path d="M55 56 Q55 18 133 18" />
              </g>
              <g fontSize="10.5" fontWeight="500" textAnchor="middle">
                <rect x="140" y="6" width="100" height="24" rx="12" fill="#5266eb" />
                <text x="190" y="22" fill="#ffffff">Magma</text>

                <rect x="270" y="58" width="100" height="24" rx="12" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="320" y="74" fill="#ededf3">Batuan Beku</text>

                <rect x="140" y="110" width="100" height="24" rx="12" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="190" y="126" fill="#ededf3">Batuan Sedimen</text>

                <rect x="10" y="58" width="100" height="24" rx="12" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="60" y="74" fill="#ededf3">Batuan Metamorf</text>
              </g>
              <g fontSize="9.5" fontWeight="400" fill="#9c9cb2">
                <text x="270" y="36">Pembekuan</text>
                <text x="250" y="136">Pelapukan &amp; litifikasi</text>
                <text x="16" y="104">Tekanan &amp; suhu</text>
                <text x="18" y="36">Pelelehan</text>
              </g>
            </svg>
          )}

          {slide.alert && (
            <div className="highlight-box">
              <b>{slide.alert.title}</b>
              <br />
              {slide.alert.desc}
            </div>
          )}

          {slide.chips && slide.chips.length > 0 && (
            <div className="chips">
              {slide.chips.map((chip, idx) => (
                <span key={idx}>
                  {chip.label}
                  {chip.val ? ` (${chip.val})` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="slider-footer">
        <button
          type="button"
          className="btn btn-outline btn-prev-slide"
          onClick={handlePrev}
          disabled={isFirst}
        >
          Sebelumnya
        </button>
        <button
          type="button"
          className={`btn ${isLocked ? 'btn-outline inquiry-locked' : 'btn-magma'} btn-next-slide`}
          onClick={handleNext}
          disabled={isLocked}
          title={isLocked ? 'Selesaikan investigasi 3D di sebelah kiri untuk membuka materi' : undefined}
        >
          {isLocked
            ? 'Selesaikan Misi Inkuiri'
            : isLast
            ? nextCtaLabel
            : 'Berikutnya'}
        </button>
      </div>
    </div>
  );
};
