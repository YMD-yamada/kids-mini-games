"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/components/providers/settings-provider";

type FeedbackBannerProps = {
  kind: "ok" | "ng" | null;
  okText?: string;
  ngText?: string;
  /** When false, caller handles audio (e.g. already played). */
  playSound?: boolean;
};

export function FeedbackBanner({
  kind,
  okText = "せいかい！",
  ngText = "ちがうよ、もういちど！",
  playSound: shouldPlay = true,
}: FeedbackBannerProps) {
  const { play } = useSettings();
  const lastKind = useRef<"ok" | "ng" | null>(null);

  useEffect(() => {
    if (!kind || !shouldPlay || kind === lastKind.current) return;
    lastKind.current = kind;
    if (kind === "ok") play("match");
    if (kind === "ng") play("wrong");
  }, [kind, play, shouldPlay]);

  useEffect(() => {
    if (!kind) lastKind.current = null;
  }, [kind]);

  if (!kind) return null;

  return (
    <div
      className={`rounded-3xl p-4 text-center ring-2 ${
        kind === "ok"
          ? "bg-green-50 ring-green-200"
          : "bg-amber-50 ring-amber-200"
      }`}
      role="status"
      aria-live="polite"
    >
      <p className="text-4xl" aria-hidden>
        {kind === "ok" ? "✨" : "🤔"}
      </p>
      <p
        className={`mt-1 text-xl font-bold ${
          kind === "ok" ? "text-green-800" : "text-amber-900"
        }`}
      >
        {kind === "ok" ? okText : ngText}
      </p>
    </div>
  );
}
