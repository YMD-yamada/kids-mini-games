"use client";

import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

export function SoundToggle({ compact = false }: { compact?: boolean }) {
  const { soundOn, setSoundOn, play } = useSettings();
  const { isPicture } = useReadingUI();
  const showLabel = !compact && !isPicture;

  return (
    <button
      type="button"
      onClick={() => {
        const next = !soundOn;
        setSoundOn(next);
        if (next) play("tap");
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
      aria-pressed={soundOn}
      aria-label={soundOn ? "おと オン" : "おと オフ"}
    >
      <span className="text-xl" aria-hidden>
        {soundOn ? "🔊" : "🔇"}
      </span>
      {showLabel ? (
        <KidText
          hiragana={soundOn ? "おと オン" : "おと オフ"}
          standard={soundOn ? "効果音 ON" : "効果音 OFF"}
        />
      ) : null}
    </button>
  );
}
