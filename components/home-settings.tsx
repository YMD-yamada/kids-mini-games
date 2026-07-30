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

  return (
    <KidPanel className="float-in flex flex-col gap-4">
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
          お子さまの読める度合いに合わせて切り替えられます。星をためると次の島がひらきます。
        </p>
      ) : null}
      <ReadingModeToggle />
      <div className="flex justify-center">
        <SoundToggle compact={isPicture} />
      </div>
      <NarrateButton
        text="島をタップしてあそんでね。星をためると次の島がひらくよ。"
        label={isPicture ? "🔊" : undefined}
        hiraganaLabel="🔊 つかいかた"
        standardLabel="🔊 使い方"
      />
      <LevelPicker />
    </KidPanel>
  );
}
