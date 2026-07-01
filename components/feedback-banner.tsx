"use client";

import { useEffect, useRef } from "react";
import { KidText } from "@/components/ui/kid-text";
import { useSettings } from "@/components/providers/settings-provider";

type FeedbackBannerProps = {
  kind: "ok" | "ng" | null;
  okText?: string;
  okHiragana?: string;
  ngText?: string;
  ngHiragana?: string;
  playSound?: boolean;
};

export function FeedbackBanner({
  kind,
  okText = "せいかい！",
  okHiragana = "せいかい！",
  ngText = "ちがうよ、もういちど！",
  ngHiragana = "ちがうよ、もういちど！",
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
      className={`rounded-[1.75rem] p-4 text-center ring-2 ${
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
      <KidText
        as="p"
        hiragana={kind === "ok" ? okHiragana : ngHiragana}
        standard={kind === "ok" ? okText : ngText}
        className={`mt-1 font-display text-xl font-bold ${
          kind === "ok" ? "text-green-800" : "text-amber-900"
        }`}
      />
    </div>
  );
}
