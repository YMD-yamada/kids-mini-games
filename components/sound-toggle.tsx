"use client";

import { useSettings } from "@/components/providers/settings-provider";

export function SoundToggle() {
  const { soundOn, setSoundOn, play } = useSettings();

  return (
    <button
      type="button"
      onClick={() => {
        const next = !soundOn;
        setSoundOn(next);
        if (next) play("tap");
      }}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-stone-700 shadow ring-1 ring-stone-200 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      aria-pressed={soundOn}
      aria-label={soundOn ? "おと オン" : "おと オフ"}
    >
      <span className="text-xl" aria-hidden>
        {soundOn ? "🔊" : "🔇"}
      </span>
      <span>{soundOn ? "おと ON" : "おと OFF"}</span>
    </button>
  );
}
