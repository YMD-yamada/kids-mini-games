"use client";

import { LEVEL_OPTIONS, type GameLevel } from "@/lib/levels";
import { useSettings } from "@/components/providers/settings-provider";

export function LevelPicker() {
  const { level, setLevel, play } = useSettings();

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-2 ring-amber-100">
      <p className="mb-3 text-center text-sm font-bold text-stone-500">
        レベルを えらんでね
      </p>
      <div className="grid grid-cols-3 gap-2">
        {LEVEL_OPTIONS.map((opt) => {
          const active = level === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                play("tap");
                setLevel(opt.id as GameLevel);
              }}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition active:scale-[0.98] ${
                active
                  ? "bg-orange-100 ring-2 ring-orange-400"
                  : "bg-stone-50 ring-1 ring-stone-200 hover:bg-amber-50"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500`}
              aria-pressed={active}
            >
              <span className="text-2xl" aria-hidden>
                {opt.emoji}
              </span>
              <span className="text-sm font-bold text-stone-800">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
