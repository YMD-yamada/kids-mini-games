"use client";

import { KidButton } from "@/components/kid-button";
import { useSettings } from "@/components/providers/settings-provider";
import { useEffect, useRef } from "react";

type WinCelebrationProps = {
  title?: string;
  message?: string;
  onAgain: () => void;
  show: boolean;
};

export function WinCelebration({
  title = "クリア！",
  message = "すごいね！",
  onAgain,
  show,
}: WinCelebrationProps) {
  const { play } = useSettings();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show) return;
    play("win");
    buttonRef.current?.focus();
  }, [show, play]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onAgain();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onAgain]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-title"
      onClick={onAgain}
    >
      <div
        className="win-pop w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl ring-2 ring-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-6xl" aria-hidden>
          ⭐
        </p>
        <h2 id="win-title" className="mt-2 text-3xl font-bold text-stone-800">
          {title}
        </h2>
        <p className="mt-2 text-lg text-stone-600">{message}</p>
        <KidButton ref={buttonRef} className="mt-6 w-full" onClick={onAgain}>
          もういちど
        </KidButton>
      </div>
    </div>
  );
}
