/** Extra tones for rhythm island (beyond preset SFX). */
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

export type PitchId = "low" | "mid" | "high";

const PITCH_FREQ: Record<PitchId, number> = {
  low: 262,
  mid: 392,
  high: 587,
};

export function playPitch(id: PitchId, enabled: boolean, duration = 0.28) {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = PITCH_FREQ[id];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export async function playPitchSequence(
  pitches: PitchId[],
  enabled: boolean,
  beatMs: number,
) {
  for (const p of pitches) {
    playPitch(p, enabled);
    await new Promise((r) => setTimeout(r, beatMs));
  }
}
