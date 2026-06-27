"use client";

import { GameCard } from "@/components/game-card";
import { HomeSettings } from "@/components/home-settings";
import { NarrateButton } from "@/components/narrate-button";
import { useSettings } from "@/components/providers/settings-provider";
import { GAMES } from "@/lib/games-config";

export default function Home() {
  const { pictureMode } = useSettings();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="text-center">
        <p className="text-5xl" aria-hidden>
          🌈
        </p>
        {!pictureMode ? (
          <>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
              みんなのミニゲーム
            </h1>
            <p className="mt-2 text-lg text-stone-600">
              タップして あそぶ {GAMES.length}つの ゲーム
            </p>
          </>
        ) : (
          <>
            <h1 className="sr-only">みんなのミニゲーム</h1>
            <p className="mt-2 text-4xl" aria-hidden>
              🎮
            </p>
            <NarrateButton
              text="みんなのミニゲーム。絵をタップしてあそんでね。"
              label="🔊 タイトル"
              className="mx-auto mt-3"
            />
          </>
        )}
      </header>

      <HomeSettings />

      <ul className="flex flex-col gap-3">
        {GAMES.map((g) => (
          <li key={g.href}>
            <GameCard game={g} />
          </li>
        ))}
      </ul>

      {!pictureMode ? (
        <p className="text-center text-sm leading-relaxed text-stone-500">
          🖼️ えモード なら 文字が 少なく 遊べるよ
          <br />
          おうちのひとと いっしょに あそぼう
        </p>
      ) : null}
    </div>
  );
}
