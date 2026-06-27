"use client";

import { useCallback } from "react";
import { useSettings } from "@/components/providers/settings-provider";
import { speakJapanese } from "@/lib/speech";

export function useNarration() {
  const { speechOn, play } = useSettings();

  const narrate = useCallback(
    (text: string, withTapSound = false) => {
      if (withTapSound) play("tap");
      if (speechOn && text) speakJapanese(text);
    },
    [speechOn, play],
  );

  return { narrate, speechOn };
}
