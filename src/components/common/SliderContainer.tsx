import React from 'react';
import { Slide } from '../../types';

interface SliderContainerProps {
  topicTag: string;
  slides: Slide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  nextCtaLabel?: string;
  onNextCta?: () => void;
  isEndogenRockCycle?: boolean;
}

export const SliderContainer: React.FC<SliderContainerProps> = ({
  topicTag,
  slides,
  currentSlide,
  onSlideChange,
  nextCtaLabel = 'Berikutnya →',
  onNextCta
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

  const handlePrev = () => {
    if (!isFirst) {
      onSlideChange(safeIdx - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      onSlideChange(safeIdx + 1);
    } else if (onNextCta) {
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

      <div className="slider-body">
        <div className="slide-item active">
          <h3>{slide.title}</h3>
          <p>{slide.desc}</p>

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
              viewBox="0 0 420 190"
              role="img"
              aria-label="Diagram siklus batuan: magma, batuan beku, batuan sedimen, batuan metamorf"
              style={{ width: '100%', maxWidth: '420px', margin: '14px auto', display: 'block' }}
            >
              <defs>
                <marker
                  id="rc-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10 z" fill="#c3c3cc" />
                </marker>
              </defs>
              <g fill="none" stroke="#70707d" strokeWidth="1.5" markerEnd="url(#rc-arrow)">
                <path d="M265 23 Q355 23 355 76" />
                <path d="M355 108 Q355 163 267 163" />
                <path d="M155 163 Q65 163 65 110" />
                <path d="M65 76 Q65 23 153 23" />
              </g>
              <g fontSize="11.5" fontWeight="480" textAnchor="middle">
                <rect x="155" y="8" width="110" height="30" rx="15" fill="#5266eb" />
                <text x="210" y="27" fill="#ffffff">Magma</text>

                <rect x="300" y="78" width="110" height="30" rx="15" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="355" y="97" fill="#ededf3">Batuan Beku</text>

                <rect x="155" y="148" width="110" height="30" rx="15" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="210" y="167" fill="#ededf3">Batuan Sedimen</text>

                <rect x="10" y="78" width="110" height="30" rx="15" fill="#272735" stroke="#70707d" strokeWidth="1" />
                <text x="65" y="97" fill="#ededf3">Batuan Metamorf</text>
              </g>
              <g fontSize="10.5" fontWeight="400" fill="#c3c3cc">
                <text x="295" y="46">Pembekuan</text>
                <text x="280" y="184">Pelapukan &amp; litifikasi</text>
                <text x="14" y="140">Tekanan &amp; suhu</text>
                <text x="18" y="46">Pelelehan</text>
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
          ← Sebelumnya
        </button>
        <button
          type="button"
          className="btn btn-magma btn-next-slide"
          onClick={handleNext}
        >
          {isLast ? nextCtaLabel : 'Berikutnya →'}
        </button>
      </div>
    </div>
  );
};
