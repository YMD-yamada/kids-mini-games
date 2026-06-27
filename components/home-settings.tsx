"use client";

import { LevelPicker } from "@/components/level-picker";
import { PictureModeToggle } from "@/components/picture-mode-toggle";
import { SoundToggle } from "@/components/sound-toggle";
import { NarrateButton } from "@/components/narrate-button";

export function HomeSettings() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white/60 p-4 ring-1 ring-amber-100">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <PictureModeToggle />
        <SoundToggle />
      </div>
      <NarrateButton
        text="えを おおきく 見せる えモード。右の スピーカー で 説明が 聞けるよ。"
        label="🔊 使い方"
        className="w-full"
      />
      <LevelPicker />
    </div>
  );
}
