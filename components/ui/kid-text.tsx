"use client";

import type { ReactNode } from "react";
import { useReadingUI } from "@/lib/use-reading-ui";

type KidTextProps = {
  hiragana: string;
  standard: string;
  picture?: ReactNode;
  className?: string;
  hiraganaClassName?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  srOnlyInPicture?: boolean;
};

export function KidText({
  hiragana,
  standard,
  picture,
  className = "",
  hiraganaClassName = "font-display tracking-wide",
  as: Tag = "span",
  srOnlyInPicture = true,
}: KidTextProps) {
  const { isPicture, isHiragana, isStandard } = useReadingUI();

  if (isPicture) {
    if (picture) {
      return (
        <Tag className={className} aria-hidden>
          {picture}
        </Tag>
      );
    }
    if (srOnlyInPicture) {
      return <span className="sr-only">{standard}</span>;
    }
    return null;
  }

  const text = isHiragana ? hiragana : isStandard ? standard : hiragana;
  const modeClass = isHiragana ? hiraganaClassName : "";

  return <Tag className={`${modeClass} ${className}`.trim()}>{text}</Tag>;
}
