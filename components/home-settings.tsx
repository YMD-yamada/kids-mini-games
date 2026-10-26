"use client";

import { LevelPicker } from "@/components/level-picker";
import { NarrateButton } from "@/components/narrate-button";
import { ReadingModeToggle } from "@/components/reading-mode-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

export function HomeSettings() {
  const { isPicture, showAdultHints } = useReadingUI();

  // あそぶ前に設定が並ぶと遠回りなので、島の下にたたんで置く
  return (
    <details className="group">
      <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 rounded-2xl bg-white/80 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 [&::-webkit-details-marker]:hidden">
        <span className="text-xl" aria-hidden>
          ⚙️
        </span>
        <KidText
          hiragana="せってい（もじ・おと・むずかしさ）"
          standard="設定（文字・音・むずかしさ）"
          picture={null}
        />
      </summary>
      <KidPanel className="mt-3 flex flex-col gap-4">
        <KidText
          as="p"
          hiragana="ひょうじの しかた"
          standard="表示のしかた"
          picture={
            <span className="text-center text-2xl" aria-hidden>
              ⚙️
            </span>
          }
          className="text-center font-display text-sm font-bold text-slate-600"
        />
        {showAdultHints ? (
          <p className="text-center text-xs text-slate-400">
            お子さまの読める度合いに合わせて切り替えられます。はじめから3つの島で遊べます。星をためると残りの島がひらきます。
          </p>
        ) : null}
        <ReadingModeToggle />
        <div className="flex justify-center">
          <SoundToggle compact={isPicture} />
        </div>
        <NarrateButton
          text="島をタップしてあそんでね。ほしを あつめると あたらしい しまが ひらくよ。"
          label={isPicture ? "🔊" : undefined}
          hiraganaLabel="🔊 つかいかた"
          standardLabel="🔊 使い方"
        />
        <LevelPicker />
      </KidPanel>
    </details>
  );
}
