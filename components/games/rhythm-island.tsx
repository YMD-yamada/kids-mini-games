"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeedbackBanner } from "@/components/feedback-banner";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { WinCelebration } from "@/components/win-celebration";
import { rhythmConfig } from "@/lib/levels";
import {
  playPitch,
  playPitchSequence,
  type PitchId,
} from "@/lib/tone";

const PITCHES: PitchId[] = ["low", "mid", "high"];

const PITCH_UI: Record<PitchId, { emoji: string; label: string; className: string }> = {
  low: { emoji: "🐻", label: "ひくい", className: "bg-amber-100 ring-amber-200" },
  mid: { emoji: "🐰", label: "ふつう", className: "bg-sky-100 ring-sky-200" },
  high: { emoji: "🐦", label: "たかい", className: "bg-violet-100 ring-violet-200" },
};

type Phase = "listen" | "input" | "ok" | "ng";

export function RhythmIsland() {
  const { level, play, soundOn, recordClear } = useSettings();
  const cfg = rhythmConfig[level];
  const router = useRouter();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [seq, setSeq] = useState<PitchId[]>([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("listen");
  const [won, setWon] = useState(false);
  const [highlight, setHighlight] = useState<PitchId | null>(null);

  const playDemo = useCallback(
    async (pitches: PitchId[]) => {
      setPhase("listen");
      for (const p of pitches) {
        setHighlight(p);
        playPitch(p, soundOn);
        await new Promise((r) => setTimeout(r, cfg.beatMs));
        setHighlight(null);
        await new Promise((r) => setTimeout(r, 80));
      }
      setPhase("input");
    },
    [cfg.beatMs, soundOn],
  );

  const startRound = useCallback(async () => {
    const pattern: PitchId[] = Array.from({ length: cfg.length }, () => {
      return PITCHES[Math.floor(Math.random() * PITCHES.length)];
    });
    setSeq(pattern);
    setStep(0);
    setPhase("listen");
    play("ready");
    await playDemo(pattern);
  }, [cfg.length, play, playDemo]);

  useEffect(() => {
    void startRound();
  }, [startRound, level]);

  const reset = () => {
    setRound(0);
    setCorrect(0);
    setWon(false);
    void startRound();
  };

  const onPick = (p: PitchId) => {
    if (phase !== "input") return;
    play("tap");
    playPitch(p, soundOn, 0.22);
    if (p !== seq[step]) {
      setPhase("ng");
      return;
    }
    const nextStep = step + 1;
    if (nextStep >= seq.length) {
      setCorrect((c) => c + 1);
      setPhase("ok");
      if (round + 1 >= cfg.rounds) {
        recordClear("rhythm", level);
        setWon(true);
      }
    } else {
      setStep(nextStep);
    }
  };

  const next = () => {
    setRound((r) => r + 1);
    void startRound();
  };

  return (
    <div className="flex flex-col gap-5">
      <KidPanel className="bg-lime-50 ring-lime-200">
        <KidText
          as="p"
          hiragana="おとを きいて まねする"
          standard="音をきいて同じ順番でタップ"
          picture={<span className="text-4xl">🎵🐰</span>}
          className="text-center font-display font-bold text-lime-900"
          srOnlyInPicture={false}
        />
        <NarrateButton
          text="高低の音が順番に鳴るよ。同じ順番でボタンを押してね。ことばではなく音のあそびだよ。"
          className="mt-3 w-full"
        />
      </KidPanel>

      <ProgressStars current={correct} total={cfg.rounds} />

      <KidPanel className="flex min-h-24 items-center justify-center">
        <KidText
          hiragana={phase === "listen" ? "きいてね…" : "まねしてね！"}
          standard={phase === "listen" ? "聞いてね…" : "まねしてね！"}
          picture={<span className="text-5xl">{phase === "listen" ? "👂" : "👆"}</span>}
          className="font-display text-xl font-bold text-lime-800"
          srOnlyInPicture={false}
        />
      </KidPanel>

      <div className="grid grid-cols-3 gap-3">
        {PITCHES.map((p) => {
          const ui = PITCH_UI[p];
          const active = highlight === p;
          return (
            <button
              key={p}
              type="button"
              disabled={phase !== "input"}
              onClick={() => onPick(p)}
              className={`flex min-h-28 flex-col items-center justify-center gap-1 rounded-2xl font-display text-lg font-bold shadow-sm ring-2 transition active:scale-[0.96] disabled:opacity-60 ${
                ui.className
              } ${active ? "scale-105 ring-4 ring-orange-300" : ""}`}
              aria-label={ui.label}
            >
              <span className="text-4xl" aria-hidden>
                {ui.emoji}
              </span>
              <KidText hiragana={ui.label} standard={ui.label} className="text-sm" />
            </button>
          );
        })}
      </div>

      <KidButton
        variant="secondary"
        className="w-full"
        onClick={() => void playPitchSequence(seq, soundOn, cfg.beatMs)}
        disabled={phase === "listen" || seq.length === 0}
      >
        もういちどきく
      </KidButton>

      <FeedbackBanner kind={phase === "ok" ? "ok" : phase === "ng" ? "ng" : null} />

      {(phase === "ok" || phase === "ng") && !won ? (
        <KidButton
          className="w-full"
          variant={phase === "ok" ? "primary" : "secondary"}
          onClick={phase === "ok" ? next : () => void startRound()}
        >
          {phase === "ok" ? "つぎへ" : "もういちど"}
        </KidButton>
      ) : null}

      <WinCelebration
        show={won}
        onAgain={reset}
        onHome={() => router.push("/")}
        message="おとマスター！"
        hiraganaMessage="おと マスター！"
      />
    </div>
  );
}
