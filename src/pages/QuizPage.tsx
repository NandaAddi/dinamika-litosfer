import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { sound } from '../utils/soundEffects';
import { progressStore } from '../data/progressStore';

interface QuizPageProps {
  isActive?: boolean;
  onOpenCertificate?: () => void;
  onOpenBadges?: () => void;
}

const STORAGE_KEY = 'dinamika_litosfer_quiz_v1';

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
          isFinished
        })
      );
    } catch {}
  }, [currentIdx, selectedOpt, isAnswered, score, isFinished]);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

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
  };

  const pct = Math.round((score / totalQuestions) * 100);
  const wrongCount = totalQuestions - score;

  return (
    <section className={`page fit-view ${isActive ? 'active' : ''}`} id="page-kuis">
      <div className="quiz-box">
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

            <div className="q-grid">
              <div>
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
                  {currentIdx === totalQuestions - 1 ? 'Lihat Hasil 🏆' : 'Soal Berikutnya →'}
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
                <b>{totalQuestions}</b>
                <span>Total Soal</span>
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
                  📄 Cetak / Simpan Portofolio Belajar (A4 PDF)
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
                  🏅 Lihat Lencana Prestasi
                </button>
              )}
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                ↻ Ulangi Kuis
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
