"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import {
  getHiraganaSet,
  shuffleChars,
  type HiraganaChar,
} from "@/lib/hiragana-data";
import { charListenLevelConfig } from "@/lib/levels";
import { shuffle } from "@/lib/random";
import { speakJapanese } from "@/lib/speech";

function pickCharRound(
  pool: HiraganaChar[],
  choiceCount: number,
): { target: HiraganaChar; choices: HiraganaChar[] } {
  const target = pool[Math.floor(Math.random() * pool.length)];
  const others = pool.filter((c) => c.char !== target.char);
  const distractors = shuffle(others).slice(0, choiceCount - 1);
  const choices = shuffle([target, ...distractors]);
  return { target, choices };
}

export function CharListenGame() {
  const { level, play, speechOn } = useSettings();
  const cfg = charListenLevelConfig[level];
  const [pool, setPool] = useState(() => shuffleChars(getHiraganaSet(level)));
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(() => pickCharRound(pool, cfg.choiceCount));
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const speakChar = useCallback(
    (char: string) => {
      if (speechOn) speakJapanese(char);
    },
    [speechOn],
  );

  const startRound = useCallback(() => {
    const r = pickCharRound(pool, cfg.choiceCount);
    setRound(r);
    setFeedback("idle");
    setTimeout(() => speakChar(r.target.reading), 300);
  }, [pool, cfg.choiceCount, speakChar]);

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    startRound();
  }, [startRound]);

  useEffect(() => {
    setPool(shuffleChars(getHiraganaSet(level)));
    reset();
  }, [reset, level]);

  const handlePick = (char: HiraganaChar) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = char.char === round.target.char;
    if (ok) setCorrect((c) => c + 1);
    setFeedback(ok ? "ok" : "ng");
  };

  const nextRound = () => {
    setRoundIndex((i) => i + 1);
    startRound();
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🔤"
        steps={["🔊 で もじの こえを きく", "おなじ もじを タップ", `${cfg.rounds} かい せいかい`]}
        speakSteps={[
          "スピーカーで文字の声を聞く",
          "同じ文字をタップ",
          `${cfg.rounds}回正解でクリア`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 ring-2 ring-violet-100">
        <p className="text-8xl font-bold text-violet-300" aria-hidden>
          ？
        </p>
        <NarrateButton
          text={round.target.reading}
          label="🔊 もじを きく"
          className="w-full max-w-xs"
        />
      </div>

      <div
        className={`grid gap-3 ${
          round.choices.length >= 4 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {round.choices.map((c) => (
          <button
            key={c.char}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => handlePick(c)}
            className="flex min-h-24 items-center justify-center rounded-3xl bg-violet-50 text-5xl font-bold text-violet-900 shadow-md ring-2 ring-violet-200 transition hover:bg-violet-100 active:scale-[0.98] disabled:opacity-70"
            aria-label={c.reading}
          >
            {c.char}
          </button>
        ))}
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

      <WinCelebration show={finished} onAgain={reset} message="もじが わかる ようになったね！" />
    </div>
  );
}
