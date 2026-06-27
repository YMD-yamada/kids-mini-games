"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { SAME_DIFF_ITEMS } from "@/lib/quiz-data";
import { sameDiffLevelConfig } from "@/lib/levels";

type Round = {
  left: string;
  right: string;
  isSame: boolean;
};

function makeRound(similarMode: boolean): Round {
  const left = SAME_DIFF_ITEMS[Math.floor(Math.random() * SAME_DIFF_ITEMS.length)];
  const isSame = Math.random() > 0.5;
  if (isSame) {
    return { left, right: left, isSame: true };
  }
  let right = SAME_DIFF_ITEMS[Math.floor(Math.random() * SAME_DIFF_ITEMS.length)];
  while (right === left) {
    right = SAME_DIFF_ITEMS[Math.floor(Math.random() * SAME_DIFF_ITEMS.length)];
  }
  if (similarMode && Math.random() > 0.5) {
    const pairs: [string, string][] = [
      ["🐶", "🐕"],
      ["🍎", "🍏"],
      ["⭐", "✨"],
      ["🐱", "🐯"],
    ];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    return { left: pair[0], right: pair[1], isSame: false };
  }
  return { left, right, isSame: false };
}

export function SameDiffGame() {
  const { level, play } = useSettings();
  const cfg = sameDiffLevelConfig[level];
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState<Round>(() => makeRound(cfg.similarMode));
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    setRound(makeRound(cfg.similarMode));
    setFeedback("idle");
  }, [cfg.similarMode]);

  useEffect(() => {
    reset();
  }, [reset]);

  const nextRound = () => {
    const next = roundIndex + 1;
    if (next >= cfg.rounds) return;
    setRoundIndex(next);
    setRound(makeRound(cfg.similarMode));
    setFeedback("idle");
  };

  const handleAnswer = (same: boolean) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = same === round.isSame;
    if (ok) setCorrect((c) => c + 1);
    setFeedback(ok ? "ok" : "ng");
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="👀"
        steps={[
          "ふたつの え を みる",
          "おなじ か ちがう か えらぶ",
          `${cfg.rounds} かい せいかい で クリア！`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div className="flex items-center justify-center gap-4 rounded-3xl bg-white p-6 ring-2 ring-amber-100">
        <span className="text-6xl sm:text-7xl" aria-hidden>
          {round.left}
        </span>
        <span className="text-3xl font-bold text-stone-400">？</span>
        <span className="text-6xl sm:text-7xl" aria-hidden>
          {round.right}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={feedback !== "idle"}
          onClick={() => handleAnswer(true)}
          className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-3xl bg-green-100 text-xl font-bold text-green-900 shadow-md ring-2 ring-green-200 transition hover:bg-green-200 active:scale-[0.98] disabled:opacity-70"
        >
          <span className="text-4xl" aria-hidden>
            👯
          </span>
          おなじ
        </button>
        <button
          type="button"
          disabled={feedback !== "idle"}
          onClick={() => handleAnswer(false)}
          className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-3xl bg-purple-100 text-xl font-bold text-purple-900 shadow-md ring-2 ring-purple-200 transition hover:bg-purple-200 active:scale-[0.98] disabled:opacity-70"
        >
          <span className="text-4xl" aria-hidden>
            ✌️
          </span>
          ちがう
        </button>
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ok" && !finished ? (
        <KidButton className="w-full" onClick={nextRound}>
          つぎへ →
        </KidButton>
      ) : null}
      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={() => setFeedback("idle")}>
          もういちど
        </KidButton>
      ) : null}

      <WinCelebration show={finished} onAgain={reset} message="め じょうず！" />
    </div>
  );
}
