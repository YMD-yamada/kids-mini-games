"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

type IslandShellProps = {
  title: string;
  hiraganaTitle: string;
  emoji: string;
  speakTitle: string;
  children: ReactNode;
};

export function IslandShell({
  title,
  hiraganaTitle,
  emoji,
  speakTitle,
  children,
}: IslandShellProps) {
  const { isPicture, showText } = useReadingUI();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col gap-5 px-4 py-6 sm:max-w-xl sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-4 py-2 font-display text-base font-bold text-slate-700 shadow-sm ring-1 ring-slate-200"
            aria-label="マップにもどる"
          >
            {isPicture ? (
              <span className="text-2xl" aria-hidden>
                🗺️
              </span>
            ) : (
              <KidText hiragana="← マップ" standard="← マップ" />
            )}
          </Link>
          <SoundToggle compact={isPicture} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl" aria-hidden>
            {emoji}
          </span>
          {showText ? (
            <KidText
              as="h1"
              hiragana={hiraganaTitle}
              standard={title}
              className="font-display text-2xl font-extrabold text-slate-800"
            />
          ) : (
            <h1 className="sr-only">{speakTitle}</h1>
          )}
        </div>
      </header>
      <LevelPicker />
      <div className="flex flex-1 flex-col gap-5 pb-4">{children}</div>
    </div>
  );
}
