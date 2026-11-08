// ==========================================================================
// PROCEDURAL WEB AUDIO ENGINE - DINAMIKA LITOSFER
// Murni procedural Web Audio API (0 KB file eksternal, anti-lag, 60fps safe)
// ==========================================================================

const STORAGE_MUTE_KEY = 'dinamika_litosfer_sound_muted';

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private _isMuted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem(STORAGE_MUTE_KEY);
      this._isMuted = saved === 'true';
    } catch {
      this._isMuted = false;
    }
  }

  public get isMuted(): boolean {
    return this._isMuted;
  }

  private ensureContext(): AudioContext | null {
    if (this._isMuted) return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // Kalibrasi volume aman untuk proyektor & speaker sekolah (-14dB / ~0.15)
      this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this._isMuted = muted;
    try {
      localStorage.setItem(STORAGE_MUTE_KEY, String(muted));
    } catch {}

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this._isMuted);
    if (!this._isMuted) {
      // Mainkan snap uji saat suara diaktifkan
      this.snap();
    }
    return this._isMuted;
  }

  // Klik tombol lembut (Snappy UI Tap)
  public snap(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.035);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Sapuan desiran halus saat berpindah slide materi
  public slideWhoosh(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.value = 1.8;

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Gemuruh seismik lembut saat memisahkan/merotasi 3D
  public rumble(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Chime akor mayor saat jawaban kuis benar (C5 -> E5 -> G5 -> C6)
  public quizCorrect(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const freqs = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const noteTime = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.08, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }

  // Nada minor ganda bersahabat saat jawaban kuis salah (D3 -> Db3)
  public quizWrong(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const freqs = [155.56, 138.59];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const noteTime = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.1, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteTime);
      osc.stop(noteTime + 0.2);
    });
  }

  // Chime kemenangan meriah saat kuis selesai tuntas
  public quizFinish(): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const notes = [
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 783.99, d: 0.1 },
      { f: 1046.5, d: 0.35 }
    ];
    let offset = 0;
    const now = ctx.currentTime;

    notes.forEach((n) => {
      const noteTime = now + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, noteTime);

      gain.gain.setValueAtTime(0.12, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + n.d);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteTime);
      osc.stop(noteTime + n.d + 0.05);
      offset += 0.09;
    });
  }

  // Dentuman erupsi vulkanik dinamis (VEI-calibrated procedural rumble & blast)
  public volcanicExplosion(veiLevel = 2, isPlinian = false): void {
    if (this._isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    const now = ctx.currentTime;
    const duration = isPlinian ? 1.4 : 0.6 + veiLevel * 0.12;

    // 1. Noise Generator untuk desis & pecahan gas
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    // Brown noise integration
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isPlinian ? 260 : 120 + veiLevel * 25, now);
    filter.frequency.exponentialRampToValueAtTime(45, now + duration);

    const noiseGain = ctx.createGain();
    const peakGain = Math.min(0.28, 0.1 + veiLevel * 0.03);
    noiseGain.gain.setValueAtTime(peakGain, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + duration);

    // 2. Sub-bass thump (gelombang kejut frekuensi rendah 35 - 75 Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(isPlinian ? 85 : 55, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + duration * 0.7);

    subGain.gain.setValueAtTime(Math.min(0.22, 0.08 + veiLevel * 0.025), now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + duration);
  }
}

export const sound = new SoundEffectsEngine();
