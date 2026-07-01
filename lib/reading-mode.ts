export type ReadingMode = "picture" | "hiragana" | "standard";

export const READING_MODE_OPTIONS: {
  id: ReadingMode;
  emoji: string;
  label: string;
  hiraganaLabel: string;
  adultLabel: string;
  description: string;
}[] = [
  {
    id: "picture",
    emoji: "🖼️",
    label: "え",
    hiraganaLabel: "えモード",
    adultLabel: "絵モード",
    description: "文字を 少なく。絵と 音で あそぶ",
  },
  {
    id: "hiragana",
    emoji: "🔤",
    label: "ひらがな",
    hiraganaLabel: "ひらがな",
    adultLabel: "ひらがな",
    description: "ひらがなを 少しずつ 覚える",
  },
  {
    id: "standard",
    emoji: "📝",
    label: "ぜんぶ",
    hiraganaLabel: "ぜんぶ",
    adultLabel: "全文表示",
    description: "おうちの ひと むけ。説明も くわしく",
  },
];

export function parseReadingMode(raw: string | null): ReadingMode | null {
  if (raw === "picture" || raw === "hiragana" || raw === "standard") {
    return raw;
  }
  return null;
}

export function migrateLegacyPictureMode(
  pictureRaw: string | null,
): ReadingMode | null {
  if (pictureRaw === "1") return "picture";
  if (pictureRaw === "0") return "standard";
  return null;
}
