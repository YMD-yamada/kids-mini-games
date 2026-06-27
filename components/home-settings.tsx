"use client";

import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";

export function HomeSettings() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-white/60 p-4 ring-1 ring-amber-100">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SoundToggle />
      </div>
      <LevelPicker />
    </div>
  );
}
