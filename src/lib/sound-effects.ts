// Web Audio API Synthesized Cyber Sound Effects
// 100% programmatic oscillators - Zero external audio files or network overhead.

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Initialize mute state from localStorage (default to true for polite first impressions)
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("dagim_sfx_enabled");
  // Default to muted unless explicitly enabled by user
  isMuted = saved === "true" ? false : true;
}

const listeners = new Set<(muted: boolean) => void>();

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const sfx = {
  isMuted(): boolean {
    return isMuted;
  },

  setMuted(muted: boolean) {
    isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("dagim_sfx_enabled", muted ? "false" : "true");
    }
    listeners.forEach((fn) => fn(isMuted));
  },

  toggle(): boolean {
    this.setMuted(!isMuted);
    if (!isMuted) {
      this.playSwitch();
    }
    return isMuted;
  },

  subscribe(fn: (muted: boolean) => void): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  // 1. Tactile Micro-Click: For slider adjustments & button hovers
  playTick(pitch: number = 1.0) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio playback safety catch
    }
  },

  // 2. 3D Cube Face Snap: Mechanical cyber-lock tone
  playSnap() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.065);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Audio safety catch
    }
  },

  // 3. Cyber Switch Tone: For tab & mode switching
  playSwitch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [
        { freq: 880, delay: 0 },
        { freq: 1320, delay: 0.04 },
      ].forEach(({ freq, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.035, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.05);
      });
    } catch {
      // Audio safety catch
    }
  },

  // 4. Sub-Bass Seismic Shockwave: Deep low-frequency resonant sweep
  playSeismic() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.45);

      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(90, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.45);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.45);
      subOsc.stop(now + 0.45);
    } catch {
      // Audio safety catch
    }
  },

  // 5. Success / Verified Chime: Warm harmonic chord on download or copy
  playSuccess() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.035, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.22);
      });
    } catch {
      // Audio safety catch
    }
  },
};
