"use client";

import { useCallback, useMemo, useState } from "react";
import { KidButton } from "@/components/kid-button";

const SYMBOLS = ["🐶", "🐱", "🐻", "🐼", "🐸", "🦊"] as const;

type Card = {
  id: string;
  symbol: string;
  faceUp: boolean;
  matched: boolean;
};

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const pairs = SYMBOLS.flatMap((s, i) => [
    { id: `${i}-a`, symbol: s, faceUp: false, matched: false },
    { id: `${i}-b`, symbol: s, faceUp: false, matched: false },
  ]);
  return shuffle(pairs);
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => buildDeck());
  const [pending, setPending] = useState<string[]>([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);

  const won = useMemo(() => cards.length > 0 && cards.every((c) => c.matched), [cards]);

  const reset = useCallback(() => {
    setCards(buildDeck());
    setPending([]);
    setLockBoard(false);
    setMoves(0);
  }, []);

  const handleCardClick = (id: string) => {
    if (lockBoard) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.matched || card.faceUp) return;

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
      setCards(
        nextFaceUp.map((c) =>
          c.id === firstId || c.id === secondId ? { ...c, matched: true } : c,
        ),
      );
      setPending([]);
      setLockBoard(false);
      return;
    }

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === firstId || c.id === secondId
            ? { ...c, faceUp: false }
            : c,
        ),
      );
      setPending([]);
      setLockBoard(false);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-center text-lg text-stone-600">
        おなじ え を みつけよう！ かいすう: {moves}
      </p>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
        {cards.map((card) => {
          const show = card.faceUp || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={card.matched || lockBoard}
              className={`flex aspect-square items-center justify-center rounded-3xl text-4xl shadow-md ring-2 transition sm:text-5xl ${
                card.matched
                  ? "bg-green-100 ring-green-300"
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

      <div className="flex flex-wrap justify-center gap-3">
        <KidButton variant="secondary" onClick={reset}>
          あたらしく はじめる
        </KidButton>
      </div>

      {won ? (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="memory-win-title"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl ring-2 ring-amber-200">
            <p className="text-5xl" aria-hidden>
              ⭐
            </p>
            <h2
              id="memory-win-title"
              className="mt-2 text-2xl font-bold text-stone-800"
            >
              クリア！
            </h2>
            <p className="mt-2 text-stone-600">すごいね！</p>
            <KidButton className="mt-6 w-full" onClick={reset}>
              もういちど
            </KidButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
