"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { SEQUENCE_SYMBOLS, pickRandom } from "@/lib/quiz-data";
import { sequenceLevelConfig } from "@/lib/levels";

type Phase = "show" | "input" | "result";

function makeSequence(length: number) {
  return pickRandom(SEQUENCE_SYMBOLS, length);
}

export function SequenceGame() {
  const { level, play } = useSettings();
  const cfg = sequenceLevelConfig[level];
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [sequence, setSequence] = useState<string[]>(() =>
    makeSequence(cfg.length),
  );
  const [input, setInput] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("show");
  const [showIndex, setShowIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [pool, setPool] = useState<string[]>([]);

  const startRound = useCallback(() => {
    const seq = makeSequence(cfg.length);
    setSequence(seq);
    setInput([]);
    setPhase("show");
    setShowIndex(0);
    setFeedback("idle");
    setPool(pickRandom(SEQUENCE_SYMBOLS, Math.min(6, cfg.length + 2)));
  }, [cfg.length]);

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    startRound();
  }, [startRound]);

  useEffect(() => {
    reset();
  }, [reset, level]);

  useEffect(() => {
    if (phase !== "show") return;
    if (showIndex >= sequence.length) {
      const t = setTimeout(() => setPhase("input"), 400);
      return () => clearTimeout(t);
    }
    play("flip");
    const t = setTimeout(() => setShowIndex((i) => i + 1), 700);
    return () => clearTimeout(t);
  }, [phase, showIndex, sequence.length, play]);

  const handleTap = (symbol: string) => {
    if (phase !== "input" || feedback !== "idle") return;
    play("tap");
    const next = [...input, symbol];
    setInput(next);
    const expected = sequence[next.length - 1];
    if (symbol !== expected) {
      setFeedback("ng");
      setPhase("result");
      return;
    }
    if (next.length === sequence.length) {
      setFeedback("ok");
      setCorrect((c) => c + 1);
      setPhase("result");
    }
  };

  const nextRound = () => {
    const next = roundIndex + 1;
    if (next >= cfg.rounds) return;
    setRoundIndex(next);
    startRound();
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🧩"
        steps={[
          "でてきた じゅんばん を おぼえる",
          "おなじ じゅんばん で タップ",
          `${cfg.rounds} かい せいかい で クリア！`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div className="flex min-h-[8rem] flex-col items-center justify-center gap-3 rounded-3xl bg-white p-6 ring-2 ring-amber-100">
        {phase === "show" ? (
          <>
            <p className="text-sm font-bold text-stone-500">よく みてね！</p>
            <p className="text-6xl" aria-hidden>
              {showIndex < sequence.length ? sequence[showIndex] : "👀"}
            </p>
            <p className="text-base text-stone-600">
              {showIndex + 1} / {sequence.length}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-stone-500">
              おぼえた とおり に タップ！
            </p>
            <div className="flex gap-2">
              {sequence.map((_, i) => (
                <span
                  key={i}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ring-2 ${
                    i < input.length
                      ? "bg-green-100 ring-green-300"
                      : "bg-stone-100 ring-stone-200"
                  }`}
                >
                  {i < input.length ? input[i] : "？"}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {phase === "input" ? (
        <div className="grid grid-cols-3 gap-3">
          {pool.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => handleTap(sym)}
              className="flex aspect-square items-center justify-center rounded-3xl bg-amber-50 text-4xl shadow-md ring-2 ring-amber-200 transition hover:bg-amber-100 active:scale-[0.98]"
            >
              {sym}
            </button>
          ))}
        </div>
      ) : null}

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ok" && !finished ? (
        <KidButton className="w-full" onClick={nextRound}>
          つぎへ →
        </KidButton>
      ) : null}
      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={startRound}>
          もういちど
        </KidButton>
      ) : null}

      <WinCelebration show={finished} onAgain={reset} message="じゅんばん マスター！" />
    </div>
  );
}
