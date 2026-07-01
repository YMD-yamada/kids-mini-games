"use client";

import Link from "next/link";
import type { GameEntry } from "@/lib/games-config";
import { KidText } from "@/components/ui/kid-text";
import { useNarration } from "@/lib/use-narration";
import { useReadingUI } from "@/lib/use-reading-ui";

const categoryAccent: Record<GameEntry["category"], string> = {
  words: "from-violet-50 to-white ring-violet-100",
  play: "from-amber-50 to-white ring-amber-100",
};

export function GameCard({ game }: { game: GameEntry }) {
  const { narrate } = useNarration();
  const { isPicture, isHiragana, showAdultHints } = useReadingUI();

  const speak = () => narrate(`${game.speakTitle}。${game.speakHint}`, true);

  return (
    <div
      className={`flex items-stretch gap-2 overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-1 shadow-[var(--shadow-card)] ring-2 ${categoryAccent[game.category]}`}
    >
      <Link
        href={game.href}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.4rem] bg-white/90 p-4 transition hover:bg-white active:scale-[0.99]"
        aria-label={`${game.speakTitle}。${game.speakHint}`}
      >
        <span
          className={`flex shrink-0 items-center justify-center rounded-2xl bg-stone-50 ring-1 ring-stone-100 ${
            isPicture ? "h-20 w-20 text-5xl" : "h-16 w-16 text-4xl"
          }`}
          aria-hidden
        >
          {game.emoji}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {isPicture ? (
            <span className="ml-auto text-2xl" aria-hidden>
              {game.tagEmoji}
            </span>
          ) : (
            <>
              <KidText
                as="span"
                hiragana={game.hiraganaTitle}
                standard={game.title}
                className={`font-display font-bold text-stone-800 ${
                  isHiragana ? "text-lg" : "text-base"
                }`}
              />
              <KidText
                as="span"
                hiragana={game.hiraganaHint}
                standard={game.hint}
                className="text-sm text-stone-500"
              />
              {showAdultHints ? (
                <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-[0.65rem] font-medium text-stone-500">
                  <span aria-hidden>{game.tagEmoji}</span>
                  {game.tag}
                </span>
              ) : (
                <span className="text-xs text-stone-400" aria-hidden>
                  {game.tagEmoji}
                </span>
              )}
            </>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          speak();
        }}
        className="flex w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-[1.4rem] bg-sky-50 text-sky-900 ring-1 ring-sky-200 transition hover:bg-sky-100 active:scale-[0.98]"
        aria-label="説明を きく"
      >
        <span className="text-2xl" aria-hidden>
          🔊
        </span>
        {!isPicture ? (
          <KidText
            as="span"
            hiragana="きく"
            standard="聞く"
            className="text-[0.65rem] font-bold"
          />
        ) : null}
      </button>
    </div>
  );
}
