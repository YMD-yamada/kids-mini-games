"use client";

import { useSettings } from "@/components/providers/settings-provider";
import type { ReadingMode } from "@/lib/reading-mode";

export function useReadingUI() {
  const { readingMode } = useSettings();

  return {
    readingMode,
    isPicture: readingMode === "picture",
    isHiragana: readingMode === "hiragana",
    isStandard: readingMode === "standard",
    showText: readingMode !== "picture",
    showAdultHints: readingMode === "standard",
    pickText: (opts: {
      picture?: string;
      hiragana: string;
      standard: string;
    }) => {
      const map: Record<ReadingMode, string> = {
        picture: opts.picture ?? opts.hiragana,
        hiragana: opts.hiragana,
        standard: opts.standard,
      };
      return map[readingMode];
    },
  };
}
