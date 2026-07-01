"use client";

import { GameCard } from "@/components/game-card";
import { HomeSettings } from "@/components/home-settings";
import { NarrateButton } from "@/components/narrate-button";
import { KidText } from "@/components/ui/kid-text";
import { GAME_SECTIONS, GAMES, gamesByCategory } from "@/lib/games-config";
import { useReadingUI } from "@/lib/use-reading-ui";

export default function Home() {
  const { isPicture, isHiragana } = useReadingUI();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="float-in text-center">
        <p className="text-5xl drop-shadow-sm" aria-hidden>
          🌈
        </p>
        <KidText
          as="h1"
          hiragana="みんなの ミニゲーム"
          standard="みんなのミニゲーム"
          picture={<span className="text-5xl" aria-hidden>🎮</span>}
          className="kid-hero-title mt-2 text-3xl font-extrabold text-stone-800 sm:text-4xl"
        />
        <KidText
          as="p"
          hiragana={`タップして あそぶ ${GAMES.length}こ`}
          standard={`タップして遊べる ${GAMES.length} 種類のゲーム`}
          picture={null}
          className={`mt-2 text-stone-600 ${isPicture ? "sr-only" : isHiragana ? "text-lg" : "text-base"}`}
          srOnlyInPicture
        />
        {isPicture ? (
          <NarrateButton
            text="みんなのミニゲーム。絵をタップしてあそんでね。"
            label="🔊"
            className="mx-auto mt-3"
          />
        ) : null}
      </header>

      <HomeSettings />

      {GAME_SECTIONS.map((section) => {
        const items = gamesByCategory(section.id);
        if (items.length === 0) return null;

        return (
          <section key={section.id} className="float-in flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-2xl" aria-hidden>
                {section.emoji}
              </span>
              <KidText
                as="h2"
                hiragana={section.hiraganaTitle}
                standard={section.standardTitle}
                className="font-display text-lg font-bold text-stone-700"
              />
            </div>
            <ul className="flex flex-col gap-3">
              {items.map((g) => (
                <li key={g.href}>
                  <GameCard game={g} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <KidText
        as="p"
        hiragana="おうちの ひとと いっしょに あそぼう"
        standard="おうちのひとといっしょにあそびましょう"
        picture={null}
        className="text-center text-sm text-stone-500"
        srOnlyInPicture={false}
      />
    </div>
  );
}
