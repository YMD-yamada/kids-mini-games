"use client";

import { LEVEL_OPTIONS, type GameLevel } from "@/lib/levels";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { KidPanel } from "@/components/ui/kid-panel";
import { useReadingUI } from "@/lib/use-reading-ui";

export function LevelPicker() {
  const { level, setLevel, play } = useSettings();
  const { isPicture, showAdultHints } = useReadingUI();
  const active = LEVEL_OPTIONS.find((o) => o.id === level);

  return (
    <KidPanel variant="soft" className="!p-3">
      <KidText
        as="p"
        hiragana="れべるを えらぶ"
        standard="レベルを選ぶ"
        picture={
          <span className="mb-1 block text-center text-2xl" aria-hidden>
            ⭐
          </span>
        }
        className={`mb-2 text-center font-display font-bold text-slate-500 ${
          isPicture ? "" : "text-sm"
        }`}
        srOnlyInPicture={false}
      />
      {active && showAdultHints ? (
        <p className="mb-3 text-center text-xs text-slate-400">{active.hint}</p>
      ) : null}
      <div className="grid grid-cols-3 gap-2">
        {LEVEL_OPTIONS.map((opt) => {
          const selected = level === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                if (selected) return;
                play("tap");
                setLevel(opt.id as GameLevel);
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 transition active:scale-[0.98] ${
                selected
                  ? "bg-orange-100 shadow-sm ring-2 ring-orange-400"
                  : "bg-white/80 ring-1 ring-slate-200 hover:bg-amber-50"
              }`}
              aria-pressed={selected}
              aria-label={`${opt.label}。${opt.hint}`}
            >
              <span className={isPicture ? "text-4xl" : "text-2xl"} aria-hidden>
                {opt.emoji}
              </span>
              {!isPicture ? (
                <KidText
                  as="span"
                  hiragana={opt.label}
                  standard={opt.label}
                  className="text-sm font-bold text-slate-800"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </KidPanel>
  );
}
