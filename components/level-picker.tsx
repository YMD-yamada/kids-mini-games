"use client";

import { LEVEL_OPTIONS, type GameLevel } from "@/lib/levels";
import { useSettings } from "@/components/providers/settings-provider";

export function LevelPicker() {
  const { level, setLevel, play, pictureMode } = useSettings();
  const activeOption = LEVEL_OPTIONS.find((o) => o.id === level);

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-2 ring-amber-100">
      {!pictureMode ? (
        <p className="mb-1 text-center text-sm font-bold text-stone-500">
          れべるを えらんでね
        </p>
      ) : (
        <p className="mb-1 text-center text-2xl" aria-hidden>
          ⭐
        </p>
      )}
      {activeOption && !pictureMode ? (
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
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition active:scale-[0.98] ${
                active
                  ? "bg-orange-100 ring-2 ring-orange-400"
                  : "bg-stone-50 ring-1 ring-stone-200 hover:bg-amber-50"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
              aria-pressed={active}
              aria-label={pictureMode ? opt.label : undefined}
            >
              <span className={pictureMode ? "text-4xl" : "text-2xl"} aria-hidden>
                {opt.emoji}
              </span>
              {!pictureMode ? (
                <span className="text-sm font-bold text-stone-800">
                  {opt.label}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
