"use client";

import { KidText } from "@/components/ui/kid-text";
import { useSettings } from "@/components/providers/settings-provider";
import { READING_MODE_OPTIONS, type ReadingMode } from "@/lib/reading-mode";
import { useReadingUI } from "@/lib/use-reading-ui";

export function ReadingModeToggle() {
  const { readingMode, setReadingMode, play } = useSettings();
  const { showAdultHints } = useReadingUI();
  const active = READING_MODE_OPTIONS.find((o) => o.id === readingMode);

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className="grid grid-cols-3 gap-1.5 rounded-2xl bg-stone-100/80 p-1.5 ring-1 ring-stone-200/80"
        role="group"
        aria-label="表示モード"
      >
        {READING_MODE_OPTIONS.map((opt) => {
          const selected = readingMode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                if (selected) return;
                play("tap");
                setReadingMode(opt.id as ReadingMode);
              }}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                selected
                  ? "bg-white text-stone-900 shadow-sm ring-2 ring-orange-300"
                  : "text-stone-600 hover:bg-white/70"
              }`}
              aria-pressed={selected}
            >
              <span className="text-xl leading-none" aria-hidden>
                {opt.emoji}
              </span>
              <KidText
                as="span"
                hiragana={opt.hiraganaLabel}
                standard={opt.adultLabel}
                picture={<span className="text-base">{opt.emoji}</span>}
                className="text-[0.7rem] font-bold leading-tight sm:text-xs"
                srOnlyInPicture={false}
              />
            </button>
          );
        })}
      </div>
      {active && showAdultHints ? (
        <p className="text-center text-xs leading-relaxed text-stone-500">
          {active.description}
        </p>
      ) : null}
    </div>
  );
}
