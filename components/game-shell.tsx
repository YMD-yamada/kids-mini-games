"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";
import { useSettings } from "@/components/providers/settings-provider";

type GameShellProps = {
  title: string;
  titleEmoji?: string;
  speakTitle?: string;
  children: ReactNode;
  showLevel?: boolean;
};

export function GameShell({
  title,
  titleEmoji,
  speakTitle,
  children,
  showLevel = true,
}: GameShellProps) {
  const { pictureMode } = useSettings();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col gap-5 px-4 py-6 sm:max-w-xl sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-white px-4 py-2 text-base font-bold text-stone-700 shadow ring-1 ring-stone-200 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            aria-label="ホームにもどる"
          >
            {pictureMode ? (
              <span className="text-2xl" aria-hidden>
                🏠
              </span>
            ) : (
              "← もどる"
            )}
          </Link>
          <SoundToggle />
        </div>
        <div className="flex items-center justify-center gap-2">
          {titleEmoji ? (
            <span className="text-4xl" aria-hidden>
              {titleEmoji}
            </span>
          ) : null}
          {!pictureMode ? (
            <h1 className="text-center text-2xl font-bold tracking-tight text-stone-800">
              {title}
            </h1>
          ) : null}
        </div>
        {pictureMode && speakTitle ? (
          <p className="sr-only">{speakTitle}</p>
        ) : null}
      </header>

      {showLevel ? <LevelPicker /> : null}

      <div className="flex flex-1 flex-col gap-5 pb-4">{children}</div>
    </div>
  );
}
