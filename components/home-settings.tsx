"use client";

import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";

export function HomeSettings() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center">
        <SoundToggle />
      </div>
      <LevelPicker />
    </div>
  );
}
