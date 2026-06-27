"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { KidButton } from "@/components/kid-button";

type Phase =
  | "intro"
  | "ready"
  | "wait"
  | "go"
  | "early"
  | "win"
  | "miss";

export function ReflexGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => clearTimer(), []);

  const startRound = useCallback(() => {
    clearTimer();
    setPhase("ready");
    timerRef.current = setTimeout(() => {
      setPhase("wait");
      const delay = 1500 + Math.random() * 2000;
      timerRef.current = setTimeout(() => {
        setPhase("go");
      }, delay);
    }, 900);
  }, []);

  useEffect(() => {
    if (phase !== "go") return;
    const t = setTimeout(() => {
      setPhase((p) => (p === "go" ? "miss" : p));
    }, 2800);
    return () => clearTimeout(t);
  }, [phase]);

  const onTapDuringWait = () => {
    clearTimer();
    setPhase("early");
  };

  const onTapGo = () => {
    clearTimer();
    setPhase("win");
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {phase === "intro" ? (
        <>
          <p className="text-lg text-stone-600">
            🐼 が でてきたら すばやく タッチ！
            <br />
            はやく おすと 「はやかったよ」 となるよ
          </p>
          <KidButton onClick={startRound}>はじめる</KidButton>
        </>
      ) : null}

      {phase === "ready" ? (
        <p className="text-3xl font-bold text-stone-700">よーい…</p>
      ) : null}

      {phase === "wait" ? (
        <button
          type="button"
          className="flex min-h-[12rem] w-full max-w-md items-center justify-center rounded-3xl bg-stone-200 text-2xl font-bold text-stone-500 ring-2 ring-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          onClick={onTapDuringWait}
        >
          まってね…
        </button>
      ) : null}

      {phase === "go" ? (
        <button
          type="button"
          className="flex min-h-[12rem] w-full max-w-md flex-col items-center justify-center gap-2 rounded-3xl bg-orange-400 text-5xl shadow-lg ring-4 ring-orange-300 transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:scale-[0.99]"
          onClick={onTapGo}
        >
          <span aria-hidden>🐼</span>
          <span className="text-2xl font-bold text-white">タッチ！</span>
        </button>
      ) : null}

      {phase === "early" ? (
        <div className="w-full max-w-md rounded-3xl bg-amber-50 p-6 ring-2 ring-amber-200">
          <p className="text-xl font-bold text-amber-900">はやかったよ！</p>
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
          <KidButton className="mt-6 w-full" onClick={startRound}>
            つぎの かい
          </KidButton>
        </div>
      ) : null}

      {phase === "miss" ? (
        <div className="w-full max-w-md rounded-3xl bg-stone-100 p-6 ring-2 ring-stone-200">
          <p className="text-xl font-bold text-stone-800">おくれちゃった？</p>
          <p className="mt-2 text-stone-600">もういちど チャレンジ！</p>
          <KidButton className="mt-6 w-full" variant="secondary" onClick={startRound}>
            もういちど
          </KidButton>
        </div>
      ) : null}

    </div>
  );
}
