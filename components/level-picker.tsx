"use client";

import { LEVEL_OPTIONS, type GameLevel } from "@/lib/levels";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { KidPanel } from "@/components/ui/kid-panel";
import { useReadingUI } from "@/lib/use-reading-ui";

export function LevelPicker() {
  const { level, setLevel, play } = useSettings();
  const { isPicture, showAdultHints } = useReadingUI();
  const activeOption = LEVEL_OPTIONS.find((o) => o.id === level);

  return (
    <KidPanel variant="soft" className="!p-3">
      <KidText
        as="p"
        hiragana="れべるを えらぶ"
        standard="レベルを選ぶ"
        picture={<span className="mb-1 block text-center text-2xl" aria-hidden>⭐</span>}
        className={`mb-2 text-center font-display font-bold text-stone-500 ${
          isPicture ? "" : "text-sm"
        }`}
        srOnlyInPicture={false}
      />

      {activeOption && showAdultHints ? (
        <p className="mb-3 text-center text-xs text-stone-400">
          {activeOption.hint}
        </p>
      ) : null}

      <div className="grid grid-cols-3 gap-2">
        {LEVEL_OPTIONS.map((opt) => {
          const active = level === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                if (active) return;
                play("tap");
                setLevel(opt.id as GameLevel);
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                active
                  ? "bg-orange-100 ring-2 ring-orange-400 shadow-sm"
                  : "bg-white/80 ring-1 ring-stone-200 hover:bg-amber-50"
              }`}
              aria-pressed={active}
              aria-label={`${opt.label}。${opt.hint}`}
            >
              <span
                className={isPicture ? "text-4xl" : "text-2xl"}
                aria-hidden
              >
                {opt.emoji}
              </span>
              {!isPicture ? (
                <KidText
                  as="span"
                  hiragana={opt.label}
                  standard={opt.label}
                  className="text-sm font-bold text-stone-800"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </KidPanel>
  );
}
