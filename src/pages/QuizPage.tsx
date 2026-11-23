import React, { Suspense, lazy, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { sound } from '../utils/soundEffects';
import { progressStore } from '../data/progressStore';
import { SeismicPreloader } from '../components/common/SeismicPreloader';

const EarthViewer = lazy(() =>
  import('../components/3d/EarthViewer').then((m) => ({ default: m.EarthViewer }))
);
const TectonicViewer = lazy(() =>
  import('../components/3d/TectonicViewer').then((m) => ({ default: m.TectonicViewer }))
);
const EndogenViewer = lazy(() =>
  import('../components/3d/EndogenViewer').then((m) => ({ default: m.EndogenViewer }))
);

interface QuizPageProps {
  isActive?: boolean;
  onOpenCertificate?: () => void;
  onOpenBadges?: () => void;
}

interface AnswerRecord {
  id: number;
  selected: number;
  correct: number;
}

const STORAGE_KEY = 'dinamika_litosfer_quiz_v2';

export const QuizPage: React.FC<QuizPageProps> = ({
  isActive = true,
  onOpenCertificate,
  onOpenBadges
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentIdx === 'number' && parsed.currentIdx < QUIZ_QUESTIONS.length) {
          return parsed.currentIdx;
        }
      }
    } catch {}
    return 0;
  });

  const [selectedOpt, setSelectedOpt] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.selectedOpt === 'number' ? parsed.selectedOpt : null;
      }
    } catch {}
    return null;
  });

  const [isAnswered, setIsAnswered] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isAnswered);
      }
    } catch {}
    return false;
  });

  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.score === 'number' ? parsed.score : 0;
      }
    } catch {}
    return 0;
  });

  const [isFinished, setIsFinished] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isFinished);
      }
    } catch {}
    return false;
  });

  const [answersHistory, setAnswersHistory] = useState<AnswerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.answersHistory) ? parsed.answersHistory : [];
      }
    } catch {}
    return [];
  });

  const [showReview, setShowReview] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentIdx,
          selectedOpt,
          isAnswered,
          score,
          isFinished,
          answersHistory
        })
      );
    } catch {}
  }, [currentIdx, selectedOpt, isAnswered, score, isFinished, answersHistory]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    setAnswersHistory((prev) => [
      ...prev.filter((item) => item.id !== currentQ.id),
      { id: currentQ.id, selected: idx, correct: currentQ.answer }
    ]);

    const isCorrect = idx === currentQ.answer;
    if (isCorrect) {
      sound.quizCorrect();
      setScore((prev) => prev + 1);
    } else {
      sound.quizWrong();
    }
  };

  const handleNext = () => {
    sound.snap();
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const pct = Math.round((score / totalQuestions) * 100);
      progressStore.saveQuizScore(score, totalQuestions);
      if (pct >= 80) {
        sound.quizFinish();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleReset = () => {
    sound.snap();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setAnswersHistory([]);
    setShowReview(false);
  };

  const pct = Math.round((score / totalQuestions) * 100);
  const wrongCount = totalQuestions - score;
  const bestScore = Math.max(score, progressStore.getData().bestQuizScore || 0);

  const modelSpec = !isFinished ? currentQ.model3d : undefined;
  const hideSpoilers = !isAnswered;
  const quizBadgeTitle = isAnswered ? undefined : 'Objek 3D · Putar untuk mengamati';

  return (
    <section className={`page fit-view ${isActive ? 'active' : ''}`} id="page-kuis">
      <div className={`quiz-box ${modelSpec ? 'with-model' : ''}`}>
        {!isFinished ? (
          <div id="q-body">
            <div className="q-head">
              <div className="q-count">
                Soal {currentIdx + 1} dari {totalQuestions}
              </div>
              <div className="q-tag">{currentQ.category}</div>
            </div>

            <div className="q-progress">
              <i style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}></i>
            </div>

            <div className={`q-grid ${modelSpec ? 'with-model' : ''}`}>
              {modelSpec && (
                <div className="q-model-col">
                  <Suspense
                    fallback={
                      <div className="model-frame-card" style={{ position: 'relative' }}>
                        <SeismicPreloader
                          moduleType={
                            modelSpec.viewer === 'earth'
                              ? 'struktur'
                              : modelSpec.viewer === 'tectonic'
                              ? 'lempeng'
                              : 'endogen'
                          }
                        />
                      </div>
                    }
                  >
                    {modelSpec.viewer === 'earth' && (
                      <EarthViewer
                        key="quiz-earth"
                        slideIndex={modelSpec.slideIndex}
                        pageId="struktur"
                        isActive={isActive}
                        hideSpoilers={hideSpoilers}
                        badgeTitle={quizBadgeTitle || 'Pembahasan Visual 3D · Struktur Bumi'}
                      />
                    )}
                    {modelSpec.viewer === 'tectonic' && (
                      <TectonicViewer
                        key="quiz-tectonic"
                        slideIndex={modelSpec.slideIndex}
                        isActive={isActive}
                        hideSpoilers={hideSpoilers}
                        badgeTitle={quizBadgeTitle || 'Pembahasan Visual 3D · Lempeng Tektonik'}
                      />
                    )}
                    {modelSpec.viewer === 'endogen' && (
                      <EndogenViewer
                        key="quiz-endogen"
                        slideIndex={modelSpec.slideIndex}
                        isActive={isActive}
                        hideSpoilers={hideSpoilers}
                        badgeTitle={quizBadgeTitle || 'Pembahasan Visual 3D · Tenaga Endogen'}
                      />
                    )}
                  </Suspense>
                  {modelSpec.hint && !isAnswered && (
                    <p className="q-model-hint">{modelSpec.hint}</p>
                  )}
                </div>
              )}

              <div className="q-question-col">
                <div className="q-text">{currentQ.question}</div>
                <div className="q-opts">
                  {currentQ.options.map((opt, i) => {
                    let optClass = 'q-opt';
                    if (isAnswered) {
                      if (i === currentQ.answer) {
                        optClass += ' correct';
                      } else if (i === selectedOpt) {
                        optClass += ' wrong';
                      }
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        className={optClass}
                        disabled={isAnswered}
                        onClick={() => handleSelect(i)}
                      >
                        <span className="letter">{'ABCD'[i]}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {isAnswered && (
              <div
                className={`q-fb show ${selectedOpt === currentQ.answer ? 'ok' : 'no'}`}
                id="q-fb"
              >
                {selectedOpt === currentQ.answer ? (
                  <>
                    ✔ <b>Benar!</b> {currentQ.explanation}
                  </>
                ) : (
                  <>
                    ✘ <b>Salah.</b> {currentQ.explanation}
                  </>
                )}
              </div>
            )}

            <div className="q-actions">
              {isAnswered && (
                <button
                  type="button"
                  className="btn btn-magma"
                  id="q-next"
                  onClick={handleNext}
                >
                  {currentIdx === totalQuestions - 1 ? 'Lihat Hasil' : 'Soal Berikutnya'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div id="q-result">
            <h3 className="q-res-title">Evaluasi Selesai</h3>
            <p className="q-res-sub">
              Berikut hasil evaluasi pemahaman materi Dinamika Litosfer:
            </p>

            <div
              className="score-ring"
              style={{ ['--p' as any]: pct }}
            >
              <b>
                {pct}
                <small>/100</small>
              </b>
            </div>

            <div className="r-stats">
              <div className="ok">
                <b>{score}</b>
                <span>Benar</span>
              </div>
              <div className="no">
                <b>{wrongCount}</b>
                <span>Salah</span>
              </div>
              <div>
                <b>{bestScore}/{totalQuestions}</b>
                <span>Skor Terbaik</span>
              </div>
            </div>

            <p className="q-res-summary">
              {pct >= 80
                ? 'Luar biasa! Kamu sudah menguasai materi dinamika litosfer dengan sangat mendalam.'
                : pct >= 60
                ? 'Bagus! Pelajari kembali bagian materi yang masih keliru ya.'
                : 'Ayo pelajari kembali materi slide di setiap modul, lalu coba kuis ini lagi!'}
            </p>

            <div className="quiz-result-cta-row">
              {onOpenCertificate && (
                <button
                  type="button"
                  className="btn btn-magma btn-cert-cta"
                  onClick={() => {
                    sound.snap();
                    onOpenCertificate();
                  }}
                >
                  Cetak / Simpan Portofolio Belajar (A4 PDF)
                </button>
              )}
              {answersHistory.length > 0 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    sound.snap();
                    setShowReview((prev) => !prev);
                  }}
                >
                  {showReview ? 'Sembunyikan Pembahasan' : 'Tinjau Pembahasan Jawaban'}
                </button>
              )}
              {onOpenBadges && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    sound.snap();
                    onOpenBadges();
                  }}
                >
                  Lihat Lencana Prestasi
                </button>
              )}
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                Ulangi Kuis
              </button>
            </div>

            {showReview && answersHistory.length > 0 && (
              <div className="quiz-review-list" aria-label="Pembahasan Jawaban Kuis">
                {QUIZ_QUESTIONS.map((q, qIdx) => {
                  const rec = answersHistory.find((a) => a.id === q.id);
                  if (!rec) return null;
                  const isRight = rec.selected === q.answer;
                  return (
                    <div key={q.id} className={`quiz-review-item ${isRight ? 'ok' : 'no'}`}>
                      <div className="qr-head">
                        <span className="qr-num">Soal {qIdx + 1} · {q.category}</span>
                        <span className={`qr-badge ${isRight ? 'ok' : 'no'}`}>
                          {isRight ? 'Benar' : 'Keliru'}
                        </span>
                      </div>
                      <p className="qr-question">{q.question}</p>
                      <p className="qr-answer-meta">
                        Jawaban Anda: <b>{'ABCD'[rec.selected]}. {q.options[rec.selected]}</b>
                        {!isRight && (
                          <>
                            {' · '}Kunci: <b>{'ABCD'[q.answer]}. {q.options[q.answer]}</b>
                          </>
                        )}
                      </p>
                      <p className="qr-explanation">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
