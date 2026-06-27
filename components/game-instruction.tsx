"use client";

import { NarrateButton } from "@/components/narrate-button";
import { useSettings } from "@/components/providers/settings-provider";

type GameInstructionProps = {
  emoji: string;
  steps: string[];
  speakSteps?: string[];
};

export function GameInstruction({
  emoji,
  steps,
  speakSteps,
}: GameInstructionProps) {
  const { pictureMode } = useSettings();
  const spoken = speakSteps ?? steps;
  const fullSpeech = spoken.join("。");

  if (pictureMode) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-3xl bg-sky-50 p-4 ring-2 ring-sky-100">
        <span className="text-5xl" aria-hidden>
          {emoji}
        </span>
        <NarrateButton text={fullSpeech} label="🔊 やり方" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-sky-50 p-4 ring-2 ring-sky-100">
      <div className="flex items-start gap-3">
        <span className="text-4xl" aria-hidden>
          {emoji}
        </span>
        <div className="flex flex-1 flex-col gap-2">
          <ol className="flex flex-col gap-2" aria-label="あそびかた">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 text-base font-bold text-sky-900"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sm"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span>
                  <span className="sr-only">ステップ{i + 1}:</span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <NarrateButton text={fullSpeech} label="🔊 読み上げ" className="self-start" />
        </div>
      </div>
    </div>
  );
}
