"use client";

import { NarrateButton } from "@/components/narrate-button";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { useReadingUI } from "@/lib/use-reading-ui";

type GameInstructionProps = {
  emoji: string;
  steps: string[];
  hiraganaSteps?: string[];
  speakSteps?: string[];
};

export function GameInstruction({
  emoji,
  steps,
  hiraganaSteps,
  speakSteps,
}: GameInstructionProps) {
  const { isPicture } = useReadingUI();
  const spoken = speakSteps ?? steps;
  const hira = hiraganaSteps ?? steps;
  const fullSpeech = spoken.join("。");

  if (isPicture) {
    return (
      <KidPanel variant="sky" className="flex items-center justify-between gap-3">
        <span className="text-5xl" aria-hidden>
          {emoji}
        </span>
        <NarrateButton
          text={fullSpeech}
          hiraganaLabel="🔊 やりかた"
          standardLabel="🔊 遊び方"
        />
      </KidPanel>
    );
  }

  return (
    <KidPanel variant="sky">
      <div className="flex items-start gap-3">
        <span className="text-4xl" aria-hidden>
          {emoji}
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <ol className="flex flex-col gap-2" aria-label="あそびかた">
            {steps.map((step, i) => (
              <li
                key={`${step}-${i}`}
                className="flex items-center gap-2 font-display text-base font-bold text-sky-900"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sm font-extrabold"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <KidText
                  hiragana={hira[i] ?? step}
                  standard={step}
                  className="text-left"
                />
              </li>
            ))}
          </ol>
          <NarrateButton text={fullSpeech} className="self-start" />
        </div>
      </div>
    </KidPanel>
  );
}
