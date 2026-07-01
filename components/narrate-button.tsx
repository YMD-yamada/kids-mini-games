"use client";

import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";

type NarrateButtonProps = {
  text: string;
  label?: string;
  hiraganaLabel?: string;
  standardLabel?: string;
  className?: string;
};

export function NarrateButton({
  text,
  label,
  hiraganaLabel = "🔊 きく",
  standardLabel = "🔊 読み上げ",
  className = "",
}: NarrateButtonProps) {
  const { speechOn, setSpeechOn, play } = useSettings();

  return (
    <button
      type="button"
      onClick={() => {
        if (!speechOn) setSpeechOn(true);
        play("tap");
        import("@/lib/speech").then(({ speakJapanese }) => speakJapanese(text));
      }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-sky-100 px-4 py-2 font-display text-base font-bold text-sky-900 shadow-sm ring-2 ring-sky-200 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:scale-[0.98] ${className}`}
      aria-label={`${text} を 読み上げる`}
    >
      <span className="text-2xl" aria-hidden>
        🔊
      </span>
      {label ? (
        <span>{label}</span>
      ) : (
        <KidText hiragana={hiraganaLabel} standard={standardLabel} />
      )}
    </button>
  );
}
