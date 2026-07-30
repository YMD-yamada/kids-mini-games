export type ReadingMode = "picture" | "hiragana" | "standard";

export const READING_MODE_OPTIONS: {
  id: ReadingMode;
  emoji: string;
  hiraganaLabel: string;
  adultLabel: string;
  description: string;
}[] = [
  {
    id: "picture",
    emoji: "🖼️",
    hiraganaLabel: "え",
    adultLabel: "絵モード",
    description: "文字を少なく。絵と音であそぶ",
  },
  {
    id: "hiragana",
    emoji: "🔤",
    hiraganaLabel: "ひらがな",
    adultLabel: "ひらがな",
    description: "ひらがなで少しずつ読む",
  },
  {
    id: "standard",
    emoji: "📝",
    hiraganaLabel: "ぜんぶ",
    adultLabel: "全文表示",
    description: "おうちのひと向け。説明もくわしく",
  },
];

export function parseReadingMode(raw: string | null): ReadingMode | null {
  if (raw === "picture" || raw === "hiragana" || raw === "standard") return raw;
  return null;
}
