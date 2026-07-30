"use client";

import Link from "next/link";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { ISLANDS } from "@/lib/islands";
import { useNarration } from "@/lib/use-narration";
import { useReadingUI } from "@/lib/use-reading-ui";

export function IslandMap() {
  const { stars, isUnlocked, play } = useSettings();
  const { isPicture, showAdultHints } = useReadingUI();
  const { narrate } = useNarration();

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {ISLANDS.map((island, index) => {
        const unlocked = isUnlocked(island.id);
        const starCount = stars[island.id];

        const inner = (
          <>
            <span
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-4xl shadow-sm ring-1 ring-white/80 ${
                unlocked ? "island-bob" : "grayscale"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
              aria-hidden
            >
              {unlocked ? island.emoji : "🔒"}
            </span>
            <div className="min-w-0 flex-1">
              {isPicture ? (
                <span className="text-2xl" aria-hidden>
                  {unlocked ? "👉" : "🔒"}
                </span>
              ) : (
                <>
                  <KidText
                    as="p"
                    hiragana={island.hiraganaTitle}
                    standard={island.title}
                    className="font-display text-lg font-extrabold text-slate-800"
                  />
                  <KidText
                    as="p"
                    hiragana={island.hiraganaHint}
                    standard={island.hint}
                    className="mt-0.5 text-sm text-slate-600"
                  />
                </>
              )}
              <div className="mt-2 flex gap-0.5" aria-label={`星 ${starCount}`}>
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={n <= starCount ? "text-lg" : "text-lg opacity-25"}
                    aria-hidden
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {!unlocked && showAdultHints ? (
                <p className="mt-1 text-xs text-slate-500">前の島で星を1つ以上ためると解放</p>
              ) : null}
            </div>
          </>
        );

        if (!unlocked) {
          return (
            <li key={island.id}>
              <div
                className={`flex items-center gap-3 rounded-[1.75rem] bg-gradient-to-br p-4 opacity-70 ring-2 ${island.accent}`}
                aria-disabled
              >
                {inner}
              </div>
            </li>
          );
        }

        return (
          <li key={island.id} className="float-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div
              className={`flex items-stretch gap-1 overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-1 shadow-[var(--shadow-card)] ring-2 ${island.accent}`}
            >
              <Link
                href={`/islands/${island.id}`}
                onClick={() => play("tap")}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.4rem] bg-white/90 p-3 transition hover:bg-white active:scale-[0.99]"
                aria-label={`${island.speakTitle}。${island.speakHint}`}
              >
                {inner}
              </Link>
              <button
                type="button"
                onClick={() => narrate(`${island.speakTitle}。${island.speakHint}`, true)}
                className="flex w-12 shrink-0 items-center justify-center rounded-[1.4rem] bg-sky-50 text-xl ring-1 ring-sky-200"
                aria-label="説明をきく"
              >
                🔊
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
