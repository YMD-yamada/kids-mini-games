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
import { countConfig } from "@/lib/levels";
import { shuffle } from "@/lib/random";
import { speakJapanese } from "@/lib/speech";

const EMOJIS = ["🍎", "⭐", "🐟", "🌸", "🐶", "🎈"];

export function CountIsland() {
  const { level, play, speechOn, recordClear } = useSettings();
  const cfg = countConfig[level];
  const router = useRouter();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [count, setCount] = useState(1);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [choices, setChoices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [won, setWon] = useState(false);

  const startRound = useCallback(() => {
    const n = 1 + Math.floor(Math.random() * cfg.maxCount);
    const e = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const distractors = new Set<number>([n]);
    while (distractors.size < 3) {
      distractors.add(1 + Math.floor(Math.random() * cfg.maxCount));
    }
    setCount(n);
    setEmoji(e);
    setChoices(shuffle([...distractors]));
    setFeedback("idle");
    if (speechOn) speakJapanese(`${n}こ ある？`);
  }, [cfg.maxCount, speechOn]);

  useEffect(() => {
    startRound();
  }, [startRound, level]);

  const reset = () => {
    setRound(0);
    setCorrect(0);
    setWon(false);
    startRound();
  };

  const onPick = (n: number) => {
    if (feedback !== "idle") return;
    play("tap");
    if (n === count) {
      setCorrect((c) => c + 1);
      setFeedback("ok");
      if (round + 1 >= cfg.rounds) {
        recordClear("count", level);
        setWon(true);
      }
    } else {
      setFeedback("ng");
    }
  };

  const next = () => {
    setRound((r) => r + 1);
    startRound();
  };

  return (
    <div className="flex flex-col gap-5">
      <KidPanel variant="sky">
        <KidText
          as="p"
          hiragana="いくつ ある？ かぞえてね"
          standard="いくつある？かぞえて答えよう"
          picture={<span className="text-4xl">🔢👀</span>}
          className="text-center font-display font-bold text-sky-900"
          srOnlyInPicture={false}
        />
        <NarrateButton text="絵をかぞえて、数字をタップしてね。" className="mt-3 w-full" />
      </KidPanel>

      <ProgressStars current={correct} total={cfg.rounds} />

      <KidPanel className="flex min-h-36 flex-wrap items-center justify-center gap-2 p-6 text-4xl">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} aria-hidden>
            {emoji}
          </span>
        ))}
        <span className="sr-only">{count}こ</span>
      </KidPanel>

      <div className="grid grid-cols-3 gap-3">
        {choices.map((n) => (
          <button
            key={n}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => onPick(n)}
            className="flex min-h-20 items-center justify-center rounded-2xl bg-white font-display text-3xl font-extrabold text-sky-900 shadow-sm ring-2 ring-sky-100 transition hover:bg-sky-50 active:scale-[0.98] disabled:opacity-70"
          >
            {n}
          </button>
        ))}
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback} />

      {(feedback === "ok" || feedback === "ng") && !won ? (
        <KidButton
          className="w-full"
          variant={feedback === "ok" ? "primary" : "secondary"}
          onClick={feedback === "ok" ? next : () => setFeedback("idle")}
        >
          {feedback === "ok" ? "つぎへ" : "もういちど"}
        </KidButton>
      ) : null}

      <WinCelebration
        show={won}
        onAgain={reset}
        onHome={() => router.push("/")}
        message="かずマスター！"
        hiraganaMessage="かず マスター！"
      />
    </div>
  );
}
