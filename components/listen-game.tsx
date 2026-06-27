"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { LISTEN_WORDS, pickListenRound, type ListenWord } from "@/lib/listen-data";
import { listenLevelConfig } from "@/lib/levels";
import { speakJapanese } from "@/lib/speech";

export function ListenGame() {
  const { level, play, speechOn } = useSettings();
  const cfg = listenLevelConfig[level];
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(() =>
    pickListenRound(LISTEN_WORDS, cfg.choiceCount),
  );
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");

  const speakWord = useCallback(
    (word: string) => {
      if (speechOn) speakJapanese(word);
    },
    [speechOn],
  );

  const startRound = useCallback(() => {
    const r = pickListenRound(LISTEN_WORDS, cfg.choiceCount);
    setRound(r);
    setFeedback("idle");
    setTimeout(() => speakWord(r.target.word), 300);
  }, [cfg.choiceCount, speakWord]);

  const reset = useCallback(() => {
    setRoundIndex(0);
    setCorrect(0);
    startRound();
  }, [startRound]);

  useEffect(() => {
    reset();
  }, [reset, level]);

  const handlePick = (item: ListenWord) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = item.id === round.target.id;
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
        emoji="👂"
        steps={["🔊 を おして こえを きく", "おなじ え を タップ", `${cfg.rounds} かい せいかい`]}
        speakSteps={[
          "スピーカーを押して声を聞く",
          "同じ絵をタップ",
          `${cfg.rounds}回正解でクリア`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 ring-2 ring-amber-100">
        <p className="text-6xl kid-pulse" aria-hidden>
          🔊
        </p>
        <NarrateButton
          text={round.target.word}
          label="🔊 もういちど きく"
          className="w-full max-w-xs"
        />
        <KidButton
          variant="secondary"
          className="w-full max-w-xs"
          onClick={() => speakWord(round.target.word)}
        >
          👂 こえを きく
        </KidButton>
      </div>

      <div
        className={`grid gap-3 ${
          round.choices.length >= 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {round.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => handlePick(c)}
            className="flex min-h-28 flex-col items-center justify-center rounded-3xl bg-amber-50 text-6xl shadow-md ring-2 ring-amber-200 transition hover:bg-amber-100 active:scale-[0.98] disabled:opacity-70"
            aria-label={c.word}
          >
            {c.emoji}
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

      <WinCelebration show={finished} onAgain={reset} message="ことば じょうず！" />
    </div>
  );
}
