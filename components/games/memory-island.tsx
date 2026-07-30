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
import { memoryConfig } from "@/lib/levels";
import { buildSequencePool, pickRandom, shuffle } from "@/lib/random";

const SYMBOLS = ["🍎", "⭐", "🐟", "🌸", "🚗", "🎈", "🐶", "🌈"];

type Phase = "show" | "input" | "ok" | "ng";

export function MemoryIsland() {
  const { level, play, recordClear } = useSettings();
  const cfg = memoryConfig[level];
  const router = useRouter();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [seq, setSeq] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("show");
  const [won, setWon] = useState(false);

  const startRound = useCallback(async () => {
    const nextSeq = pickRandom(SYMBOLS, cfg.length);
    const nextPool = buildSequencePool(nextSeq, SYMBOLS, Math.max(4, cfg.length + 2));
    setSeq(nextSeq);
    setPool(shuffle(nextPool));
    setStep(0);
    setPhase("show");
    setFlash(null);
    play("ready");

    for (const s of nextSeq) {
      await new Promise((r) => setTimeout(r, 200));
      setFlash(s);
      play("flip");
      await new Promise((r) => setTimeout(r, cfg.showMs));
      setFlash(null);
    }
    setPhase("input");
  }, [cfg, play]);

  useEffect(() => {
    void startRound();
  }, [startRound, level]);

  const reset = () => {
    setRound(0);
    setCorrect(0);
    setWon(false);
    void startRound();
  };

  const onPick = (sym: string) => {
    if (phase !== "input") return;
    play("tap");
    if (sym !== seq[step]) {
      setPhase("ng");
      return;
    }
    const nextStep = step + 1;
    if (nextStep >= seq.length) {
      setCorrect((c) => c + 1);
      setPhase("ok");
      if (round + 1 >= cfg.rounds) {
        recordClear("memory", level);
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
      <KidPanel variant="violet">
        <KidText
          as="p"
          hiragana="でた じゅんばんを おぼえる"
          standard="出てきた順番をおぼえてタップ"
          picture={<span className="text-4xl">🧠✨</span>}
          className="text-center font-display font-bold text-violet-900"
          srOnlyInPicture={false}
        />
        <NarrateButton
          text="絵が順番に出るよ。同じ順番でタップしてね。"
          className="mt-3 w-full"
        />
      </KidPanel>

      <ProgressStars current={correct} total={cfg.rounds} />

      <KidPanel className="flex min-h-28 items-center justify-center text-6xl">
        {phase === "show" ? flash ?? "…" : phase === "input" ? "👆" : "✨"}
      </KidPanel>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {pool.map((sym) => (
          <button
            key={sym}
            type="button"
            disabled={phase !== "input"}
            onClick={() => onPick(sym)}
            className="flex aspect-square items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-2 ring-violet-100 transition hover:bg-violet-50 active:scale-[0.96] disabled:opacity-50"
          >
            {sym}
          </button>
        ))}
      </div>

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
        message="きおくマスター！"
        hiraganaMessage="きおく マスター！"
      />
    </div>
  );
}
