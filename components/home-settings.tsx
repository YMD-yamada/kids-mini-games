"use client";

import { LevelPicker } from "@/components/level-picker";
import { ReadingModeToggle } from "@/components/reading-mode-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { KidText } from "@/components/ui/kid-text";
import { KidPanel } from "@/components/ui/kid-panel";
import { NarrateButton } from "@/components/narrate-button";
import { useReadingUI } from "@/lib/use-reading-ui";

export function HomeSettings() {
  const { isPicture, showAdultHints } = useReadingUI();

  return (
    <KidPanel className="float-in flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-center">
        <KidText
          as="p"
          hiragana="ひょうじの しかた"
          standard="表示のしかた"
          picture={<span className="text-2xl" aria-hidden>⚙️</span>}
          className="font-display text-sm font-bold text-stone-600"
        />
        {showAdultHints ? (
          <p className="text-xs text-stone-400">
            お子さまの読める度合いに合わせて切り替えられます
          </p>
        ) : null}
      </div>

      <ReadingModeToggle />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <SoundToggle compact={isPicture} />
      </div>

      <NarrateButton
        text="表示をえ、ひらがな、ぜんぶから選べるよ。スピーカーで説明が聞けるよ。"
        label={isPicture ? "🔊" : undefined}
        hiraganaLabel="🔊 つかいかた"
        standardLabel="🔊 使い方"
      />

      <LevelPicker />
    </KidPanel>
  );
}
