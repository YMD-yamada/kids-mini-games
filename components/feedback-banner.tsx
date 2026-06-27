"use client";

import { useEffect } from "react";
import { useSettings } from "@/components/providers/settings-provider";

type FeedbackBannerProps = {
  kind: "ok" | "ng" | null;
  okText?: string;
  ngText?: string;
};

export function FeedbackBanner({
  kind,
  okText = "せいかい！",
  ngText = "ちがうよ、もういちど！",
}: FeedbackBannerProps) {
  const { play } = useSettings();

  useEffect(() => {
    if (kind === "ok") play("match");
    if (kind === "ng") play("wrong");
  }, [kind, play]);

  if (!kind) return null;

  return (
    <div
      className={`rounded-3xl p-4 text-center ring-2 ${
        kind === "ok"
          ? "bg-green-50 ring-green-200"
          : "bg-amber-50 ring-amber-200"
      }`}
      role="status"
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
