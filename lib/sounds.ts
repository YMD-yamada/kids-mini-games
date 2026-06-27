export type SoundId =
  | "tap"
  | "flip"
  | "match"
  | "wrong"
  | "win"
  | "go"
  | "ready";

type ToneSpec = {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
};

const SOUND_PRESETS: Record<SoundId, ToneSpec[]> = {
  tap: [{ freq: 520, duration: 0.06, gain: 0.08 }],
  flip: [{ freq: 440, duration: 0.07, gain: 0.07 }],
  match: [
    { freq: 523, duration: 0.1, gain: 0.1 },
    { freq: 659, duration: 0.12, gain: 0.09, delay: 0.08 },
  ],
  wrong: [{ freq: 220, duration: 0.15, type: "triangle", gain: 0.06 }],
  win: [
    { freq: 523, duration: 0.12, gain: 0.1 },
    { freq: 659, duration: 0.12, gain: 0.09, delay: 0.1 },
    { freq: 784, duration: 0.18, gain: 0.08, delay: 0.2 },
  ],
  go: [{ freq: 880, duration: 0.14, type: "square", gain: 0.05 }],
  ready: [{ freq: 330, duration: 0.08, gain: 0.05 }],
};

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

export function playSound(id: SoundId, enabled: boolean) {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const now = ctx.currentTime;
  for (const tone of SOUND_PRESETS[id]) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = tone.type ?? "sine";
    osc.frequency.value = tone.freq;
    const start = now + (tone.delay ?? 0);
    const peak = tone.gain ?? 0.08;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + tone.duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + tone.duration + 0.05);
  }
}
