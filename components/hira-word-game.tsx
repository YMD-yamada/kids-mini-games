"use client";

import { useCallback, useEffect, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { LISTEN_WORDS, pickListenRound, type ListenWord } from "@/lib/listen-data";
import { hiraWordLevelConfig } from "@/lib/levels";
import { speakJapanese } from "@/lib/speech";
import { useReadingUI } from "@/lib/use-reading-ui";

export function HiraWordGame() {
  const { level, play, speechOn } = useSettings();
  const { isPicture } = useReadingUI();
  const cfg = hiraWordLevelConfig[level];
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
    if (ok) speakWord(item.word);
  };

  const nextRound = () => {
    setRoundIndex((i) => i + 1);
    startRound();
  };

  const finished = feedback === "ok" && roundIndex >= cfg.rounds - 1;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🍎"
        steps={[
          "大きな えを 見る",
          "あう ひらがなを タップ",
          `${cfg.rounds} かい せいかい`,
        ]}
        hiraganaSteps={[
          "おおきな えを みる",
          "あう ひらがなを タップ",
          `${cfg.rounds} かい せいかい`,
        ]}
        speakSteps={[
          "大きな絵を見る",
          "合うひらがなをタップ",
          `${cfg.rounds}回正解でクリア`,
        ]}
      />

      <ProgressStars current={correct} total={cfg.rounds} />

      <KidPanel className="flex flex-col items-center gap-4 py-8">
        <span className="text-8xl drop-shadow-sm" aria-hidden>
          {round.target.emoji}
        </span>
        {!isPicture ? (
          <KidText
            hiragana="どの ことば？"
            standard="どのことばかな？"
            className="font-display text-lg font-bold text-violet-700"
          />
        ) : null}
        <NarrateButton
          text={round.target.word}
          hiraganaLabel="🔊 きく"
          standardLabel="🔊 ことばを聞く"
          className="w-full max-w-xs"
        />
      </KidPanel>

      <div
        className={`grid gap-3 ${
          round.choices.length >= 4 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {round.choices.map((item) => {
          const showAnswer =
            feedback !== "idle" && item.id === round.target.id;
          return (
            <button
              key={item.id}
              type="button"
              disabled={feedback !== "idle"}
              onClick={() => handlePick(item)}
              className={`flex min-h-20 items-center justify-center rounded-2xl px-4 font-display text-2xl font-extrabold shadow-sm ring-2 transition active:scale-[0.98] disabled:opacity-80 ${
                showAnswer
                  ? "bg-green-100 text-green-900 ring-green-300"
                  : "bg-violet-50 text-violet-900 ring-violet-200 hover:bg-violet-100"
              }`}
            >
              {item.word}
            </button>
          );
        })}
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"} />

      {feedback === "ok" && !finished ? (
        <KidButton variant="violet" className="w-full" onClick={nextRound}>
          つぎへ →
        </KidButton>
      ) : null}
      {feedback === "ng" ? (
        <KidButton variant="secondary" className="w-full" onClick={() => setFeedback("idle")}>
          もういちど
        </KidButton>
      ) : null}

      <WinCelebration
        show={finished}
        onAgain={reset}
        title="クリア！"
        message="ことばが 読める ようになったね！"
        hiraganaMessage="ことばが よめる ようになったね！"
      />
    </div>
  );
}
