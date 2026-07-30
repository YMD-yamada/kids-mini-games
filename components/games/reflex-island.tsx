"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { WinCelebration } from "@/components/win-celebration";
import { reflexConfig } from "@/lib/levels";
import { useRouter } from "next/navigation";

type Phase = "idle" | "wait" | "go" | "ok" | "ng" | "early";

export function ReflexIsland() {
  const { level, play, recordClear } = useSettings();
  const cfg = reflexConfig[level];
  const router = useRouter();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [won, setWon] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goAtRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startWait = useCallback(() => {
    clearTimer();
    setPhase("wait");
    play("ready");
    const wait =
      cfg.waitMin + Math.random() * (cfg.waitMax - cfg.waitMin);
    timerRef.current = setTimeout(() => {
      goAtRef.current = Date.now();
      setPhase("go");
      play("go");
      timerRef.current = setTimeout(() => {
        setPhase("ng");
      }, cfg.reactMs);
    }, wait);
  }, [cfg, play]);

  useEffect(() => () => clearTimer(), []);

  const reset = () => {
    clearTimer();
    setRound(0);
    setCorrect(0);
    setWon(false);
    setPhase("idle");
  };

  const onPad = () => {
    if (phase === "wait") {
      clearTimer();
      setPhase("early");
      play("wrong");
      return;
    }
    if (phase !== "go") return;
    clearTimer();
    const ms = Date.now() - goAtRef.current;
    if (ms <= cfg.reactMs) {
      const nextCorrect = correct + 1;
      setCorrect(nextCorrect);
      setPhase("ok");
      if (round + 1 >= cfg.rounds) {
        recordClear("reflex", level);
        setWon(true);
      }
    } else {
      setPhase("ng");
    }
  };

  const next = () => {
    setRound((r) => r + 1);
    startWait();
  };

  return (
    <div className="flex flex-col gap-5">
      <KidPanel variant="sky">
        <KidText
          as="p"
          hiragana="ぴょんが でたら タッチ！"
          standard="ぴょんが出たらタッチ！"
          picture={<span className="text-4xl">⚡🐰</span>}
          className="text-center font-display font-bold text-sky-900"
          srOnlyInPicture={false}
        />
        <NarrateButton
          text="まつあいだはタッチしないで。ぴょんが出たらはやくタッチしてね。"
          className="mt-3 w-full"
        />
      </KidPanel>

      <ProgressStars current={correct} total={cfg.rounds} />

      <button
        type="button"
        onClick={onPad}
        className={`flex min-h-56 w-full flex-col items-center justify-center rounded-[2rem] text-7xl shadow-[var(--shadow-card)] ring-4 transition active:scale-[0.98] ${
          phase === "go"
            ? "bg-orange-400 ring-orange-300 kid-pulse"
            : phase === "wait"
              ? "bg-slate-200 ring-slate-300"
              : "bg-white ring-sky-100"
        }`}
        aria-label={phase === "go" ? "タッチ！" : "まつ"}
      >
        {phase === "go" ? "🐰" : phase === "wait" ? "…" : "👆"}
      </button>

      {phase === "idle" ? (
        <KidButton className="w-full" onClick={startWait}>
          はじめる
        </KidButton>
      ) : null}

      <FeedbackBanner
        kind={
          phase === "ok"
            ? "ok"
            : phase === "ng" || phase === "early"
              ? "ng"
              : null
        }
        ngText={phase === "early" ? "まだだよ！まってね" : "おそいよ！"}
        ngHiragana={phase === "early" ? "まだだよ！まってね" : "おそいよ！"}
      />

      {(phase === "ok" || phase === "ng" || phase === "early") && !won ? (
        <KidButton
          className="w-full"
          variant={phase === "ok" ? "primary" : "secondary"}
          onClick={phase === "ok" ? next : startWait}
        >
          {phase === "ok" ? "つぎへ" : "もういちど"}
        </KidButton>
      ) : null}

      <WinCelebration
        show={won}
        onAgain={reset}
        onHome={() => router.push("/")}
        message="はやわざマスター！"
        hiraganaMessage="はやわざ マスター！"
      />
    </div>
  );
}
