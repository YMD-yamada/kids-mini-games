"use client";

import { useMemo, useState } from "react";
import { KidButton } from "@/components/kid-button";
import { quizQuestions } from "@/lib/quiz-data";

export function QuizGame() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const total = quizQuestions.length;
  const current = quizQuestions[index];
  const isLast = index >= total - 1;

  const progress = useMemo(
    () => `${index + 1} / ${total}`,
    [index, total],
  );

  const resetAll = () => {
    setIndex(0);
    setFeedback("idle");
  };

  const advance = () => {
    setFeedback("idle");
    if (isLast) {
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleChoice = (correct: boolean) => {
    if (feedback !== "idle") return;
    setFeedback(correct ? "ok" : "ng");
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-sm font-bold text-stone-500">{progress}</p>
      <p className="min-h-[3.5rem] text-center text-2xl font-bold leading-snug text-stone-800">
        {current.prompt}
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        {current.choices.map((c) => {
          const base =
            "flex min-h-24 flex-col items-center justify-center rounded-3xl text-xl font-bold shadow-md ring-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[0.98] sm:min-h-28 sm:text-2xl";
          const surface = c.surfaceClass ?? "bg-white text-stone-800 ring-amber-200";
          const stateClass =
            feedback === "idle"
              ? "hover:bg-amber-50"
              : c.correct && feedback === "ok"
                ? "ring-green-400 ring-4"
                : !c.correct && feedback === "ng"
                  ? "opacity-60"
                  : "";

          return (
            <button
              key={c.id}
              type="button"
              className={`${base} ${surface} ${stateClass}`}
              onClick={() => handleChoice(c.correct)}
              disabled={feedback !== "idle"}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {feedback === "ok" ? (
        <div className="rounded-3xl bg-green-50 p-4 text-center ring-2 ring-green-200">
          <p className="text-3xl" aria-hidden>
            ✨
          </p>
          <p className="mt-1 text-xl font-bold text-green-800">せいかい！</p>
          <KidButton className="mt-4 w-full sm:w-auto" onClick={advance}>
            {isLast ? "はじめから" : "つぎへ"}
          </KidButton>
        </div>
      ) : null}

      {feedback === "ng" ? (
        <div className="rounded-3xl bg-amber-50 p-4 text-center ring-2 ring-amber-200">
          <p className="text-xl font-bold text-amber-900">ちがうよ、もういちど！</p>
          <KidButton
            className="mt-4 w-full sm:w-auto"
            variant="secondary"
            onClick={() => setFeedback("idle")}
          >
            もどる
          </KidButton>
        </div>
      ) : null}

      <KidButton variant="secondary" className="self-center" onClick={resetAll}>
        いちばんはじめから
      </KidButton>
    </div>
  );
}
