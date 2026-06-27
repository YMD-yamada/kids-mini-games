"use client";

import Link from "next/link";
import type { GameEntry } from "@/lib/games-config";
import { useNarration } from "@/lib/use-narration";
import { useSettings } from "@/components/providers/settings-provider";

export function GameCard({ game }: { game: GameEntry }) {
  const { pictureMode } = useSettings();
  const { narrate } = useNarration();

  const speak = () => narrate(`${game.speakTitle}。${game.speakHint}`, true);

  if (pictureMode) {
    return (
      <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md ring-2 ring-amber-100">
        <Link
          href={game.href}
          className="flex flex-1 items-center gap-4 transition hover:opacity-90 active:scale-[0.99]"
          aria-label={`${game.speakTitle}。${game.speakHint}`}
        >
          <span className="text-6xl" aria-hidden>
            {game.emoji}
          </span>
          <span className="ml-auto text-2xl" aria-hidden>
            {game.tagEmoji}
          </span>
        </Link>
        <button
          type="button"
          onClick={speak}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xl ring-2 ring-sky-200"
          aria-label="説明を きく"
        >
          🔊
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-3xl bg-white p-5 shadow-md ring-2 ring-amber-100">
      <Link
        href={game.href}
        className="flex min-w-0 flex-1 flex-col gap-1 transition hover:bg-amber-50/50 active:scale-[0.99]"
      >
        <span className="flex items-center gap-3 text-xl font-bold text-stone-800">
          <span className="text-4xl" aria-hidden>
            {game.emoji}
          </span>
          {game.title}
        </span>
        <span className="pl-[3.25rem] text-base text-stone-600">{game.hint}</span>
      </Link>
      <button
        type="button"
        onClick={speak}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-lg ring-1 ring-sky-200"
        aria-label="説明を きく"
      >
        🔊
      </button>
    </div>
  );
}
