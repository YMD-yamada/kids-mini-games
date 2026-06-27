"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { reflexLevelConfig } from "@/lib/levels";

type Phase =
  | "intro"
  | "ready"
  | "wait"
  | "go"
  | "early"
  | "win"
  | "miss"
  | "cleared";

export function ReflexGame() {
  const { level, play } = useSettings();
  const config = reflexLevelConfig[level];
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => clearTimer(), []);

  useEffect(() => {
    setPhase("intro");
    setRound(0);
    clearTimer();
  }, [level]);

  const startRound = useCallback(() => {
    clearTimer();
    setPhase("ready");
    play("ready");
    timerRef.current = setTimeout(() => {
      setPhase("wait");
      const delay =
        config.waitMin + Math.random() * (config.waitMax - config.waitMin);
      timerRef.current = setTimeout(() => {
        setPhase("go");
        play("go");
      }, delay);
    }, 900);
  }, [config, play]);

  useEffect(() => {
    if (phase !== "go") return;
    const t = setTimeout(() => {
      setPhase((p) => {
        if (p === "go") play("wrong");
        return p === "go" ? "miss" : p;
      });
    }, config.reactMs);
    return () => clearTimeout(t);
  }, [phase, config.reactMs, play]);

  const onTapDuringWait = () => {
    clearTimer();
    play("wrong");
    setPhase("early");
  };

  const onTapGo = () => {
    clearTimer();
    play("match");
    const next = round + 1;
    setRound(next);
    if (next >= config.targetRounds) {
      setPhase("cleared");
    } else {
      setPhase("win");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <GameInstruction
        emoji="⚡"
        steps={[
          "「はじめる」を おす",
          "🐼 が でるまで まつ",
          "でたら すばやく タッチ！",
        ]}
      />

      {phase !== "intro" ? (
        <ProgressStars current={round} total={config.targetRounds} />
      ) : null}

      {phase === "intro" ? (
        <>
          <div className="rounded-3xl bg-white p-6 ring-2 ring-amber-100">
            <p className="text-6xl" aria-hidden>
              🐼
            </p>
            <p className="mt-3 text-lg font-bold text-stone-700">
              {config.targetRounds} かい せいこう したら クリア！
            </p>
          </div>
          <KidButton onClick={startRound}>はじめる</KidButton>
        </>
      ) : null}

      {phase === "ready" ? (
        <p className="text-4xl font-bold text-stone-700 kid-pulse">よーい…</p>
      ) : null}

      {phase === "wait" ? (
        <button
          type="button"
          className="flex min-h-[12rem] w-full max-w-md flex-col items-center justify-center gap-2 rounded-3xl bg-stone-200 text-stone-500 ring-2 ring-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          onClick={onTapDuringWait}
        >
          <span className="text-5xl" aria-hidden>
            ⏳
          </span>
          <span className="text-2xl font-bold">まってね…</span>
          <span className="text-sm">まだ おさないで！</span>
        </button>
      ) : null}

      {phase === "go" ? (
        <button
          type="button"
          className="kid-pulse flex min-h-[12rem] w-full max-w-md flex-col items-center justify-center gap-2 rounded-3xl bg-orange-400 text-5xl shadow-lg ring-4 ring-orange-300 transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-[0.99]"
          onClick={onTapGo}
        >
          <span aria-hidden>🐼</span>
          <span className="text-3xl font-bold text-white">タッチ！</span>
        </button>
      ) : null}

      {phase === "early" ? (
        <div className="w-full max-w-md rounded-3xl bg-amber-50 p-6 ring-2 ring-amber-200">
          <p className="text-5xl" aria-hidden>
            🐢
          </p>
          <p className="mt-2 text-xl font-bold text-amber-900">はやかったよ！</p>
          <p className="mt-2 text-stone-600">🐼 が でてから おしてね</p>
          <KidButton className="mt-6 w-full" onClick={startRound}>
            もういちど
          </KidButton>
        </div>
      ) : null}

      {phase === "win" ? (
        <div className="w-full max-w-md rounded-3xl bg-green-50 p-6 ring-2 ring-green-200">
          <p className="text-5xl" aria-hidden>
            🎉
          </p>
          <p className="mt-2 text-2xl font-bold text-green-800">すごい！</p>
          <p className="mt-1 text-stone-600">
            あと {config.targetRounds - round} かい！
          </p>
          <KidButton className="mt-6 w-full" onClick={startRound}>
            つぎへ
          </KidButton>
        </div>
      ) : null}

      {phase === "miss" ? (
        <div className="w-full max-w-md rounded-3xl bg-stone-100 p-6 ring-2 ring-stone-200">
          <p className="text-5xl" aria-hidden>
            😅
          </p>
          <p className="mt-2 text-xl font-bold text-stone-800">おそかったかな？</p>
          <p className="mt-2 text-stone-600">もういちど チャレンジ！</p>
          <KidButton className="mt-6 w-full" variant="secondary" onClick={startRound}>
            もういちど
          </KidButton>
        </div>
      ) : null}

      <WinCelebration
        show={phase === "cleared"}
        message={`${config.targetRounds} かい れんぞく せいこう！`}
        onAgain={() => {
          setRound(0);
          setPhase("intro");
        }}
      />
    </div>
  );
}
