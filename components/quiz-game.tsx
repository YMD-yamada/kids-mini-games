"use client";

import { useEffect, useMemo, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { getQuizForLevel } from "@/lib/quiz-data";
import { quizLevelConfig } from "@/lib/levels";

export function QuizGame() {
  const { level, play } = useSettings();
  const cfg = quizLevelConfig[level];
  const [questions, setQuestions] = useState(() =>
    getQuizForLevel(level, cfg.questionCount),
  );
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setQuestions(getQuizForLevel(level, quizLevelConfig[level].questionCount));
    setIndex(0);
    setFeedback("idle");
    setCorrectCount(0);
  }, [level]);

  const current = questions[index];
  const isLast = index >= questions.length - 1;
  const finished = feedback === "ok" && isLast;

  const displayChoices = useMemo(() => {
    if (!current) return [];
    const choices = [...current.choices];
    if (choices.length <= cfg.choiceCount) return choices;
    const correct = choices.find((c) => c.correct)!;
    const wrong = choices.filter((c) => !c.correct);
    const picked = wrong.sort(() => Math.random() - 0.5).slice(0, cfg.choiceCount - 1);
    return [...picked, correct].sort(() => Math.random() - 0.5);
  }, [current, cfg.choiceCount]);

  const restart = () => {
    setQuestions(getQuizForLevel(level, cfg.questionCount));
    setIndex(0);
    setFeedback("idle");
    setCorrectCount(0);
  };

  const advance = () => {
    setFeedback("idle");
    if (isLast) {
      restart();
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleChoice = (correct: boolean) => {
    if (feedback !== "idle" || !current) return;
    play("tap");
    if (correct) {
      setCorrectCount((c) => c + 1);
    }
    setFeedback(correct ? "ok" : "ng");
  };

  if (!current) return null;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="❓"
        steps={[
          "もんだい を よむ",
          "こたえ を タップ",
          "せいかい したら つぎへ！",
        ]}
      />

      <ProgressStars current={correctCount} total={questions.length} />

      <div className="rounded-3xl bg-white p-5 text-center shadow-sm ring-2 ring-amber-100">
        {current.promptEmoji ? (
          <p className="text-5xl" aria-hidden>
            {current.promptEmoji}
          </p>
        ) : null}
        <p className="mt-2 text-2xl font-bold leading-snug text-stone-800">
          {current.prompt}
        </p>
        <p className="mt-2 text-sm font-bold text-stone-400">
          {index + 1} もんめ / {questions.length} もん
        </p>
      </div>

      <div
        className={`grid gap-3 ${
          displayChoices.length >= 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
        }`}
      >
        {displayChoices.map((c) => {
          const base =
            "flex min-h-20 flex-col items-center justify-center rounded-3xl text-xl font-bold shadow-md ring-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[0.98] sm:min-h-24 sm:text-2xl";
          const surface = c.surfaceClass ?? "bg-white text-stone-800 ring-amber-200";
          const stateClass =
            feedback === "idle"
              ? "hover:bg-amber-50"
              : c.correct && feedback === "ok"
                ? "ring-green-400 ring-4"
                : !c.correct && feedback === "ng"
                  ? "opacity-50"
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

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ok" && !finished ? (
        <KidButton className="w-full" onClick={advance}>
          つぎの もんだい →
        </KidButton>
      ) : null}

      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={() => setFeedback("idle")}>
          もういちど えらぶ
        </KidButton>
      ) : null}

      <KidButton variant="secondary" className="self-center" onClick={restart}>
        さいしょから
      </KidButton>

      <WinCelebration
        show={finished}
        message={`${questions.length} もん ぜんぶ せいかい！`}
        onAgain={restart}
      />
    </div>
  );
}
