// ==========================================================================
// STUDENT PROGRESS & GAMIFICATION STORE - DINAMIKA LITOSFER
// LocalStorage Persistence + Event Subscriber Pattern
// ==========================================================================

export interface BadgeInfo {
  id: string;
  title: string;
  subtitle: string;
  topic: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: string | null;
  xpReward: number;
}

export interface StudentProfile {
  name: string;
  school: string;
  className: string;
}

export interface ProgressData {
  profile: StudentProfile;
  xp: number;
  completedModules: string[];
  completedChallenges: string[];
  badges: Record<string, BadgeInfo>;
  quizResult: {
    score: number;
    total: number;
    percentage: number;
    completedAt: string | null;
  } | null;
}

const STORAGE_KEY = 'dinamika_litosfer_student_progress_v1';

export const INITIAL_BADGES: Record<string, BadgeInfo> = {
  seismologist: {
    id: 'seismologist',
    title: 'Seismologist Muda',
    subtitle: 'Analisis Interior Bumi & Gelombang Seismik P & S',
    topic: 'Struktur Lapisan Bumi',
    icon: '🌍',
    unlocked: false,
    unlockedAt: null,
    xpReward: 150
  },
  tectonic: {
    id: 'tectonic',
    title: 'Kartografer Lempeng',
    subtitle: 'Rekonstruksi Superbenua Pangea & Batas Tektonik',
    topic: 'Lempeng Tektonik',
    icon: '🧩',
    unlocked: false,
    unlockedAt: null,
    xpReward: 150
  },
  volcano: {
    id: 'volcano',
    title: 'Vulkanolog Semeru',
    subtitle: 'Eksplorasi Dapur Magma & Mitigasi Awan Panas',
    topic: 'Vulkanisme Semeru',
    icon: '🌋',
    unlocked: false,
    unlockedAt: null,
    xpReward: 150
  },
  endogen: {
    id: 'endogen',
    title: 'Spesialis Geomorfologi',
    subtitle: 'Identifikasi Deformasi Sesar & Siklus Batuan',
    topic: 'Tenaga Endogen',
    icon: '⛰️',
    unlocked: false,
    unlockedAt: null,
    xpReward: 150
  },
  master: {
    id: 'master',
    title: 'Grand Master Litosfer',
    subtitle: 'Lulus Kuis Evaluasi Formatif dengan Nilai ≥ 80%',
    topic: 'Evaluasi Kebumian',
    icon: '🏆',
    unlocked: false,
    unlockedAt: null,
    xpReward: 250
  }
};

export function getRankTitle(xp: number): { title: string; level: number; nextXp: number; icon: string } {
  if (xp >= 800) {
    return { title: 'Master Geologist Nusantara', level: 5, nextXp: 1000, icon: '👑' };
  }
  if (xp >= 600) {
    return { title: 'Volcanology Specialist', level: 4, nextXp: 800, icon: '🌋' };
  }
  if (xp >= 400) {
    return { title: 'Tectonic Surveyor', level: 3, nextXp: 600, icon: '🧭' };
  }
  if (xp >= 200) {
    return { title: 'Junior Seismologist', level: 2, nextXp: 400, icon: '🔬' };
  }
  return { title: 'Novice Explorer', level: 1, nextXp: 200, icon: '🌱' };
}

class ProgressStore {
  private data: ProgressData;
  private listeners: Set<() => void> = new Set();
  private toastListener: ((badge: BadgeInfo) => void) | null = null;

  constructor() {
    this.data = this.loadFromStorage();
  }

  private loadFromStorage(): ProgressData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Merge badges in case new badges were added
        const mergedBadges = { ...INITIAL_BADGES };
        if (parsed.badges) {
          Object.keys(parsed.badges).forEach((k) => {
            if (mergedBadges[k]) {
              mergedBadges[k] = { ...mergedBadges[k], ...parsed.badges[k] };
            }
          });
        }
        return {
          profile: parsed.profile || { name: '', school: '', className: '' },
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
          completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
          completedChallenges: Array.isArray(parsed.completedChallenges) ? parsed.completedChallenges : [],
          badges: mergedBadges,
          quizResult: parsed.quizResult || null
        };
      }
    } catch {}

    return {
      profile: { name: '', school: '', className: '' },
      xp: 0,
      completedModules: [],
      completedChallenges: [],
      badges: { ...INITIAL_BADGES },
      quizResult: null
    };
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {}
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public setToastListener(listener: ((badge: BadgeInfo) => void) | null): void {
    this.toastListener = listener;
  }

  public getData(): ProgressData {
    return this.data;
  }

  public getProfile(): StudentProfile {
    return this.data.profile;
  }

  public setProfile(profile: Partial<StudentProfile>): void {
    this.data.profile = { ...this.data.profile, ...profile };
    this.save();
  }

  public addXP(amount: number): void {
    this.data.xp += amount;
    this.save();
  }

  public completeChallenge(challengeId: string, xpReward = 75): boolean {
    if (!this.data.completedChallenges) {
      this.data.completedChallenges = [];
    }
    if (!this.data.completedChallenges.includes(challengeId)) {
      this.data.completedChallenges.push(challengeId);
      this.addXP(xpReward);
      return true;
    }
    return false;
  }

  public isChallengeCompleted(challengeId: string): boolean {
    return Array.isArray(this.data.completedChallenges) && this.data.completedChallenges.includes(challengeId);
  }

  public completeModule(moduleId: string): void {
    if (!this.data.completedModules.includes(moduleId)) {
      this.data.completedModules.push(moduleId);
      this.addXP(150);

      // Map module to corresponding badge
      const badgeMap: Record<string, string> = {
        struktur: 'seismologist',
        lempeng: 'tectonic',
        vulkanisme: 'volcano',
        endogen: 'endogen'
      };

      const badgeId = badgeMap[moduleId];
      if (badgeId) {
        this.unlockBadge(badgeId);
      } else {
        this.save();
      }
    }
  }

  public unlockBadge(badgeId: string): void {
    const badge = this.data.badges[badgeId];
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      this.data.xp += badge.xpReward;
      this.save();

      // Trigger toast notification
      if (this.toastListener) {
        this.toastListener(badge);
      }
    }
  }

  public saveQuizScore(score: number, total: number): void {
    const percentage = Math.round((score / total) * 100);
    this.data.quizResult = {
      score,
      total,
      percentage,
      completedAt: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Tambah XP berdasarkan jawaban benar (+20 XP per jawaban benar)
    this.addXP(score * 20);

    // Buka badge Master jika skor >= 80%
    if (percentage >= 80) {
      this.unlockBadge('master');
    } else {
      this.save();
    }
  }

  public resetProgress(): void {
    this.data = {
      profile: { name: '', school: '', className: '' },
      xp: 0,
      completedModules: [],
      completedChallenges: [],
      badges: { ...INITIAL_BADGES },
      quizResult: null
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    this.notify();
  }
}

export const progressStore = new ProgressStore();
