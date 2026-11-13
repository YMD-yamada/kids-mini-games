"use client";

import { LEVEL_OPTIONS, type GameLevel } from "@/lib/levels";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

export function LevelPicker() {
  const { level, setLevel, play } = useSettings();
  const { isPicture, showAdultHints } = useReadingUI();
  const active = LEVEL_OPTIONS.find((o) => o.id === level);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="レベル">
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
              className={`flex min-h-11 items-center justify-center gap-1 rounded-full px-2 py-1.5 transition active:scale-[0.98] ${
                selected
                  ? "bg-orange-100 shadow-sm ring-2 ring-orange-400"
                  : "bg-white/80 ring-1 ring-slate-200 hover:bg-amber-50"
              }`}
              aria-pressed={selected}
              aria-label={`${opt.label}。${opt.hint}`}
            >
              <span className={isPicture ? "text-2xl" : "text-lg"} aria-hidden>
                {opt.emoji}
              </span>
              {!isPicture ? (
                <KidText
                  as="span"
                  hiragana={opt.label}
                  standard={opt.label}
                  className="text-xs font-bold text-slate-800"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      {active && showAdultHints ? (
        <p className="text-center text-xs text-slate-400">{active.hint}</p>
      ) : null}
    </div>
  );
}
