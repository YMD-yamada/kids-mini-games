"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { COUNT_EMOJIS } from "@/lib/quiz-data";
import { countLevelConfig } from "@/lib/levels";

const NUMBER_LABELS = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

type Round = {
  emoji: string;
  count: number;
  options: number[];
};

function makeRound(maxCount: number): Round {
  const count = 1 + Math.floor(Math.random() * maxCount);
  const emoji = COUNT_EMOJIS[Math.floor(Math.random() * COUNT_EMOJIS.length)];
  const wrong = new Set<number>();
  while (wrong.size < 2) {
    const n = 1 + Math.floor(Math.random() * maxCount);
    if (n !== count) wrong.add(n);
  }
  const options = [count, ...wrong].sort(() => Math.random() - 0.5);
  return { emoji, count, options };
}

export function CountingGame() {
  const { level, play } = useSettings();
  const cfg = countLevelConfig[level];
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState<Round>(() => makeRound(cfg.maxCount));
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    setRound(makeRound(cfg.maxCount));
    setFeedback("idle");
  }, [cfg.maxCount]);

  useEffect(() => {
    reset();
  }, [reset]);

  const nextRound = () => {
    const next = roundIndex + 1;
    if (next >= cfg.rounds) return;
    setRoundIndex(next);
    setRound(makeRound(cfg.maxCount));
    setFeedback("idle");
  };

  const handlePick = (n: number) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = n === round.count;
    if (ok) setCorrect((c) => c + 1);
    setFeedback(ok ? "ok" : "ng");
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🔢"
        steps={[
          "え の かず を かぞえる",
          "なんこ か タップ",
          `${cfg.rounds} かい せいかい で クリア！`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div
        className="rounded-3xl bg-white p-6 text-center ring-2 ring-amber-100"
        aria-label={`${round.emoji}が ${round.count}こ`}
      >
        <p className="text-sm font-bold text-stone-500">なんこ ある？</p>
        <p className="mt-3 flex flex-wrap justify-center gap-2 text-4xl" aria-hidden>
          {Array.from({ length: round.count }, (_, i) => (
            <span key={i} aria-hidden>
              {round.emoji}
            </span>
          ))}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {round.options.map((n) => (
          <button
            key={n}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => handlePick(n)}
            className="flex min-h-20 items-center justify-center rounded-3xl bg-sky-100 text-3xl font-bold text-sky-900 shadow-md ring-2 ring-sky-200 transition hover:bg-sky-200 active:scale-[0.98] disabled:opacity-70"
          >
            {NUMBER_LABELS[n]}
          </button>
        ))}
      </div>

      <FeedbackBanner
        kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"}
        ngText="もういちど かぞえてみよう！"
      />

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

      <WinCelebration show={finished} onAgain={reset} message="かぞえ じょうず！" />
    </div>
  );
}
