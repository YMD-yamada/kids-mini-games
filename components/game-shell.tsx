"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

type GameShellProps = {
  title: string;
  hiraganaTitle?: string;
  titleEmoji?: string;
  speakTitle?: string;
  children: ReactNode;
  showLevel?: boolean;
};

export function GameShell({
  title,
  hiraganaTitle,
  titleEmoji,
  speakTitle,
  children,
  showLevel = true,
}: GameShellProps) {
  const { isPicture, showText } = useReadingUI();
  const hira = hiraganaTitle ?? title;

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col gap-5 px-4 py-6 sm:max-w-xl sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-white px-4 py-2 font-display text-base font-bold text-stone-700 shadow-sm ring-1 ring-stone-200 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            aria-label="ホームにもどる"
          >
            {isPicture ? (
              <span className="text-2xl" aria-hidden>
                🏠
              </span>
            ) : (
              <KidText hiragana="← もどる" standard="← もどる" />
            )}
          </Link>
          <SoundToggle compact={isPicture} />
        </div>

        <div className="flex items-center justify-center gap-2">
          {titleEmoji ? (
            <span className="text-4xl drop-shadow-sm" aria-hidden>
              {titleEmoji}
            </span>
          ) : null}
          {showText ? (
            <KidText
              as="h1"
              hiragana={hira}
              standard={title}
              className="text-center font-display text-2xl font-extrabold tracking-wide text-stone-800"
            />
          ) : speakTitle ? (
            <h1 className="sr-only">{speakTitle}</h1>
          ) : (
            <h1 className="sr-only">{title}</h1>
          )}
        </div>
      </header>

      {showLevel ? <LevelPicker /> : null}

      <div className="flex flex-1 flex-col gap-5 pb-4">{children}</div>
    </div>
  );
}
