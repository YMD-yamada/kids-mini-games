"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { COLOR_ITEMS, pickRandom } from "@/lib/quiz-data";
import { colorLevelConfig } from "@/lib/levels";

type Round = {
  target: (typeof COLOR_ITEMS)[number];
  choices: (typeof COLOR_ITEMS)[number][];
};

function makeRound(level: 1 | 2 | 3): Round {
  const cfg = colorLevelConfig[level];
  const target = COLOR_ITEMS[Math.floor(Math.random() * COLOR_ITEMS.length)];
  const others = pickRandom(
    COLOR_ITEMS.filter((c) => c.id !== target.id),
    cfg.choiceCount - 1,
  );
  const choices = [...others, target].sort(() => Math.random() - 0.5);
  return { target, choices };
}

export function ColorMatchGame() {
  const { level, play } = useSettings();
  const cfg = colorLevelConfig[level];
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState<Round>(() => makeRound(level));
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    setRound(makeRound(level));
    setFeedback("idle");
  }, [level]);

  useEffect(() => {
    reset();
  }, [reset]);

  const nextRound = () => {
    const next = roundIndex + 1;
    if (next >= cfg.rounds) return;
    setRoundIndex(next);
    setRound(makeRound(level));
    setFeedback("idle");
  };

  const handlePick = (id: string) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = id === round.target.id;
    if (ok) setCorrect((c) => c + 1);
    setFeedback(ok ? "ok" : "ng");
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🎨"
        steps={[
          "おおきな いろ を みる",
          "おなじ いろ を タップ",
          `${cfg.rounds} かい せいかい で クリア！`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 ring-2 ring-amber-100">
        <div
          className="h-28 w-28 rounded-full shadow-inner ring-4 ring-white"
          style={{ backgroundColor: round.target.hex }}
          aria-hidden
        />
        {cfg.showName ? (
          <p className="text-3xl font-bold text-stone-800">
            {round.target.emoji} {round.target.name}
          </p>
        ) : (
          <p className="text-2xl font-bold text-stone-700">この いろ は どれ？</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {round.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => handlePick(c.id)}
            className="flex min-h-24 flex-col items-center justify-center gap-1 rounded-3xl bg-white p-3 shadow-md ring-2 ring-stone-200 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            <span
              className="h-14 w-14 rounded-2xl ring-2 ring-white"
              style={{ backgroundColor: c.hex }}
              aria-hidden
            />
            {cfg.showName ? (
              <span className="text-sm font-bold text-stone-700">{c.name}</span>
            ) : null}
          </button>
        ))}
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ok" && !finished ? (
        <KidButton className="w-full" onClick={nextRound}>
          つぎの いろ →
        </KidButton>
      ) : null}
      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={() => setFeedback("idle")}>
          もういちど
        </KidButton>
      ) : null}

      <WinCelebration show={finished} onAgain={reset} message="いろ マスター！" />
    </div>
  );
}
