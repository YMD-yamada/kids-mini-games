"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { MEMORY_SYMBOLS, pickRandom } from "@/lib/quiz-data";
import { memoryLevelConfig } from "@/lib/levels";
import { shuffle } from "@/lib/random";

type Card = {
  id: string;
  symbol: string;
  faceUp: boolean;
  matched: boolean;
};

function buildDeck(pairs: number): Card[] {
  const symbols = pickRandom(MEMORY_SYMBOLS, pairs);
  const deck = symbols.flatMap((s, i) => [
    { id: `${i}-a`, symbol: s, faceUp: false, matched: false },
    { id: `${i}-b`, symbol: s, faceUp: false, matched: false },
  ]);
  return shuffle(deck);
}

export function MemoryGame() {
  const { level, play } = useSettings();
  const config = memoryLevelConfig[level];
  const [cards, setCards] = useState<Card[]>(() => buildDeck(config.pairs));
  const [pending, setPending] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [peeking, setPeeking] = useState(config.peekMs > 0);
  const peekTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (peekTimerRef.current) clearTimeout(peekTimerRef.current);
    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    peekTimerRef.current = null;
    flipTimerRef.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const matchedCount = useMemo(
    () => cards.filter((c) => c.matched).length / 2,
    [cards],
  );
  const won = cards.length > 0 && cards.every((c) => c.matched);

  const reset = useCallback(() => {
    clearTimers();
    const cfg = memoryLevelConfig[level];
    setCards(buildDeck(cfg.pairs));
    setPending([]);
    setLockBoard(false);
    setMoves(0);
    if (cfg.peekMs > 0) {
      setPeeking(true);
      setCards((prev) => prev.map((c) => ({ ...c, faceUp: true })));
      peekTimerRef.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.matched ? c : { ...c, faceUp: false })),
        );
        setPeeking(false);
      }, cfg.peekMs);
    } else {
      setPeeking(false);
    }
  }, [level, clearTimers]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleCardClick = (id: string) => {
    if (lockBoard || peeking) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.faceUp) return;

    play("flip");
    const nextFaceUp = cards.map((c) =>
      c.id === id ? { ...c, faceUp: true } : c,
    );
    setCards(nextFaceUp);

    const nextPending = [...pending, id];
    if (nextPending.length === 1) {
      setPending(nextPending);
      return;
    }

    setLockBoard(true);
    setMoves((m) => m + 1);
    const [firstId, secondId] = nextPending;
    const first = nextFaceUp.find((c) => c.id === firstId);
    const second = nextFaceUp.find((c) => c.id === secondId);
    if (!first || !second) {
      setPending([]);
      setLockBoard(false);
      return;
    }

    if (first.symbol === second.symbol) {
      play("match");
      setCards(
        nextFaceUp.map((c) =>
          c.id === firstId || c.id === secondId ? { ...c, matched: true } : c,
        ),
      );
      setPending([]);
      setLockBoard(false);
      return;
    }

    play("wrong");
    flipTimerRef.current = setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === firstId || c.id === secondId
            ? { ...c, faceUp: false }
            : c,
        ),
      );
      setPending([]);
      setLockBoard(false);
    }, config.mismatchMs);
  };

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🃏"
        steps={[
          "？を タップして めくる",
          "おなじ え を みつける",
          "ぜんぶ そろえたら クリア！",
        ]}
      />

      {peeking ? (
        <p className="rounded-2xl bg-sky-100 py-2 text-center text-lg font-bold text-sky-800">
          👀 よく みてね！ すぐ かくれるよ
        </p>
      ) : null}

      <ProgressStars current={matchedCount} total={config.pairs} />

      <p className="text-center text-base text-stone-600">
        めくった かいすう: {moves}
      </p>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card) => {
          const show = card.faceUp || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={card.matched || lockBoard || peeking}
              className={`flex aspect-square items-center justify-center rounded-3xl text-3xl shadow-md ring-2 transition sm:text-4xl ${
                card.matched
                  ? "bg-green-100 ring-green-300"
                  : show
                    ? "bg-amber-50 ring-amber-300"
                    : "bg-white ring-amber-200 hover:bg-amber-50"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-default`}
              aria-label={show ? card.symbol : "かーど"}
            >
              <span className={show ? "" : "select-none text-stone-400"}>
                {show ? card.symbol : "？"}
              </span>
            </button>
          );
        })}
      </div>

      <KidButton variant="secondary" className="self-center" onClick={reset}>
        はじめから
      </KidButton>

      <WinCelebration show={won} onAgain={reset} />
    </div>
  );
}
