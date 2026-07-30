"use client";

import { HomeSettings } from "@/components/home-settings";
import { IslandMap } from "@/components/island-map";
import { NarrateButton } from "@/components/narrate-button";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

export default function Home() {
  const { isPicture, isHiragana } = useReadingUI();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="float-in text-center">
        <p className="text-6xl drop-shadow-sm" aria-hidden>
          🐰
        </p>
        <KidText
          as="h1"
          hiragana="ぴょんの あそびじま"
          standard="ぴょんのあそびじま"
          picture={
            <span className="mt-2 block text-5xl" aria-hidden>
              🏝️
            </span>
          }
          className="mt-2 font-display text-3xl font-extrabold text-slate-800 sm:text-4xl"
        />
        <KidText
          as="p"
          hiragana="からだと あたまを つかう しま"
          standard="からだとあたまをつかう、あそびのしま"
          picture={null}
          className={`mt-2 text-slate-600 ${
            isPicture ? "sr-only" : isHiragana ? "text-lg" : "text-base"
          }`}
        />
        {isPicture ? (
          <NarrateButton
            text="ぴょんのあそびじま。島をタップしてあそんでね。"
            label="🔊"
            className="mx-auto mt-3"
          />
        ) : null}
      </header>

      <HomeSettings />

      <section className="flex flex-col gap-3">
        <KidText
          as="h2"
          hiragana="しまを えらぶ"
          standard="島を選ぶ"
          className="px-1 font-display text-lg font-bold text-slate-700"
        />
        <IslandMap />
      </section>

      <KidText
        as="p"
        hiragana="ことばずかんとは ちがうよ。ここは あそびの しま！"
        standard="ことば図鑑とは別。ここでは反応・記憶・数・色形・音であそびます。"
        className="text-center text-sm text-slate-500"
        srOnlyInPicture={false}
      />
    </div>
  );
}
