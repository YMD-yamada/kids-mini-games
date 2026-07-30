"use client";

import { useEffect, useRef } from "react";
import { KidButton } from "@/components/kid-button";
import { KidText } from "@/components/ui/kid-text";
import { useSettings } from "@/components/providers/settings-provider";

type WinCelebrationProps = {
  show: boolean;
  onAgain: () => void;
  onHome?: () => void;
  title?: string;
  message?: string;
  hiraganaMessage?: string;
};

export function WinCelebration({
  show,
  onAgain,
  onHome,
  title = "クリア！",
  message = "すごいね！",
  hiraganaMessage,
}: WinCelebrationProps) {
  const { play } = useSettings();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show) return;
    play("win");
    buttonRef.current?.focus();
  }, [show, play]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-title"
      onClick={onAgain}
    >
      <div
        className="win-pop w-full max-w-sm rounded-[1.75rem] bg-white p-8 text-center shadow-[var(--shadow-float)] ring-2 ring-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-6xl" aria-hidden>
          🐰
        </p>
        <h2
          id="win-title"
          className="mt-2 font-display text-3xl font-extrabold text-slate-800"
        >
          {title}
        </h2>
        <KidText
          as="p"
          hiragana={hiraganaMessage ?? message}
          standard={message}
          className="mt-2 text-lg text-slate-600"
        />
        <KidButton ref={buttonRef} className="mt-6 w-full" onClick={onAgain}>
          もういちど
        </KidButton>
        {onHome ? (
          <KidButton variant="secondary" className="mt-3 w-full" onClick={onHome}>
            マップへ
          </KidButton>
        ) : null}
      </div>
    </div>
  );
}
