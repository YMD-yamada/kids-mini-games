"use client";

import type { ReactNode } from "react";
import { useReadingUI } from "@/lib/use-reading-ui";

type KidTextProps = {
  hiragana: string;
  standard: string;
  picture?: ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  srOnlyInPicture?: boolean;
};

export function KidText({
  hiragana,
  standard,
  picture,
  className = "",
  as: Tag = "span",
  srOnlyInPicture = true,
}: KidTextProps) {
  const { isPicture, isHiragana } = useReadingUI();

  if (isPicture) {
    if (picture) {
      return (
        <Tag className={className} aria-hidden>
          {picture}
        </Tag>
      );
    }
    if (srOnlyInPicture) return <span className="sr-only">{standard}</span>;
    return null;
  }

  return (
    <Tag
      className={`${isHiragana ? "font-display tracking-wide" : ""} ${className}`.trim()}
    >
      {isHiragana ? hiragana : standard}
    </Tag>
  );
}
