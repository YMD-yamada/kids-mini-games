"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import {
  getHiraganaRows,
  shuffleChars,
  type HiraganaChar,
} from "@/lib/hiragana-data";
import { hiraOrderLevelConfig } from "@/lib/levels";
import { speakJapanese } from "@/lib/speech";
import { useReadingUI } from "@/lib/use-reading-ui";

export function HiraOrderGame() {
  const { level, play, speechOn } = useSettings();
  const { isPicture } = useReadingUI();
  const cfg = hiraOrderLevelConfig[level];
  const rows = useMemo(
    () => getHiraganaRows(level).slice(0, cfg.rowCount),
    [level, cfg.rowCount],
  );

  const [rowIndex, setRowIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [shuffled, setShuffled] = useState<HiraganaChar[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [won, setWon] = useState(false);

  const currentRow = rows[rowIndex] ?? [];
  const expected = currentRow[stepIndex];

  const speak = useCallback(
    (text: string) => {
      if (speechOn) speakJapanese(text);
    },
    [speechOn],
  );

  const beginRow = useCallback(
    (rIdx: number) => {
      const row = rows[rIdx];
      if (!row?.length) return;
      setShuffled(shuffleChars(row));
      setStepIndex(0);
      setFeedback("idle");
      setTimeout(() => speak(row[0].reading), 300);
    },
    [rows, speak],
  );

  const reset = useCallback(() => {
    setRowIndex(0);
    setWon(false);
    beginRow(0);
  }, [beginRow]);

  useEffect(() => {
    reset();
  }, [reset, level]);

  const totalSteps = rows.reduce((sum, r) => sum + r.length, 0);
  const doneBefore =
    rows.slice(0, rowIndex).reduce((sum, r) => sum + r.length, 0) +
    stepIndex +
    (feedback === "ok" ? 1 : 0);

  const handlePick = (char: HiraganaChar) => {
    if (!expected || feedback === "ok" || won) return;
    play("tap");

    if (char.char !== expected.char) {
      setFeedback("ng");
      return;
    }

    setFeedback("ok");
    const isLastInRow = stepIndex + 1 >= currentRow.length;
    const isLastRow = rowIndex + 1 >= rows.length;

    if (isLastInRow && isLastRow) {
      setTimeout(() => setWon(true), 500);
      return;
    }

    if (isLastInRow) {
      const nextRow = rowIndex + 1;
      setTimeout(() => {
        setRowIndex(nextRow);
        beginRow(nextRow);
      }, 550);
      return;
    }

    const nextStep = stepIndex + 1;
    setTimeout(() => {
      setStepIndex(nextStep);
      setFeedback("idle");
      speak(currentRow[nextStep].reading);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🎵"
        steps={[
          "おおきい もじの じゅんに タップ",
          "まちがえたら もういちど",
          "ぜんぶ おわったら クリア",
        ]}
        speakSteps={[
          "大きい文字の順にタップ",
          "間違えたらもう一度",
          "全部終わったらクリア",
        ]}
      />

      <ProgressStars
        current={Math.min(doneBefore, totalSteps)}
        total={Math.min(totalSteps, 10)}
      />

      <KidPanel variant="violet" className="flex flex-col items-center gap-3 py-6">
        {!isPicture ? (
          <KidText
            hiragana="つぎは どれ？"
            standard="次はどの文字？"
            className="font-display text-sm font-bold text-violet-600"
          />
        ) : null}
        <span
          className="font-display text-8xl font-extrabold text-violet-500 drop-shadow-sm"
          aria-live="polite"
        >
          {expected?.char ?? "🎉"}
        </span>
        {expected ? (
          <button
            type="button"
            onClick={() => speak(expected.reading)}
            className="rounded-full bg-violet-100 px-4 py-2 text-xl ring-2 ring-violet-200"
            aria-label={`${expected.reading} を きく`}
          >
            🔊
          </button>
        ) : null}
      </KidPanel>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {shuffled.map((c) => (
          <button
            key={`${rowIndex}-${c.char}`}
            type="button"
            onClick={() => handlePick(c)}
            disabled={feedback === "ok"}
            className="flex aspect-square items-center justify-center rounded-2xl bg-white font-display text-3xl font-extrabold text-violet-900 shadow-sm ring-2 ring-violet-100 transition hover:bg-violet-50 active:scale-[0.96] disabled:opacity-60 sm:text-4xl"
            aria-label={c.reading}
          >
            {c.char}
          </button>
        ))}
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={() => setFeedback("idle")}>
          もういちど
        </KidButton>
      ) : null}

      <WinCelebration
        show={won}
        onAgain={reset}
        title="クリア！"
        message="あいうえお じゅんが できるね！"
        hiraganaMessage="じゅんばんが できるね！"
      />
    </div>
  );
}
