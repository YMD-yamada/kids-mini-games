"use client";

import { useSettings } from "@/components/providers/settings-provider";
import { speakJapanese } from "@/lib/speech";

export function useNarration() {
  const { speechOn, setSpeechOn, play } = useSettings();

  return {
    narrate: (text: string, force = false) => {
      if (!speechOn && !force) return;
      if (!speechOn) setSpeechOn(true);
      play("tap");
      speakJapanese(text);
    },
  };
}
