export type GameCategory = "words" | "play";

export type GameEntry = {
  href: string;
  emoji: string;
  title: string;
  /** ひらがなモード用（スペース区切り） */
  hiraganaTitle: string;
  /** 音声読み上げ用 */
  speakTitle: string;
  hint: string;
  hiraganaHint: string;
  speakHint: string;
  tag: string;
  tagEmoji: string;
  category: GameCategory;
};

export const GAME_SECTIONS: {
  id: GameCategory;
  emoji: string;
  title: string;
  hiraganaTitle: string;
  standardTitle: string;
  speakTitle: string;
}[] = [
  {
    id: "words",
    emoji: "📚",
    title: "ことば・もじ",
    hiraganaTitle: "ことば と もじ",
    standardTitle: "ことば・もじ（読みの練習）",
    speakTitle: "ことばと文字の練習",
  },
  {
    id: "play",
    emoji: "🎮",
    title: "あそび",
    hiraganaTitle: "あそび",
    standardTitle: "あそび（ゲーム）",
    speakTitle: "あそび",
  },
];

export const GAMES: GameEntry[] = [
  {
    href: "/games/listen",
    emoji: "👂",
    title: "きいて えらぶ",
    hiraganaTitle: "きいて えらぶ",
    speakTitle: "聞いて選ぶ",
    hint: "こえを きいて タップ",
    hiraganaHint: "こえを きいて タップ",
    speakHint: "声を聞いてタップ",
    tag: "ことば",
    tagEmoji: "🔊",
    category: "words",
  },
  {
    href: "/games/char-listen",
    emoji: "🔤",
    title: "もじを きく",
    hiraganaTitle: "もじを きく",
    speakTitle: "文字を聞く",
    hint: "ひらがなの こえを きく",
    hiraganaHint: "ひらがなの こえを きく",
    speakHint: "ひらがなの声を聞く",
    tag: "もじ",
    tagEmoji: "あ",
    category: "words",
  },
  {
    href: "/games/hira-word",
    emoji: "🍎",
    title: "えと ことば",
    hiraganaTitle: "えと ことば",
    speakTitle: "絵とことば",
    hint: "えに あう ひらがなを えらぶ",
    hiraganaHint: "えに あう ひらがなを えらぶ",
    speakHint: "絵に合うひらがなを選ぶ",
    tag: "よみ",
    tagEmoji: "📖",
    category: "words",
  },
  {
    href: "/games/hira-order",
    emoji: "🎵",
    title: "あいうえお じゅん",
    hiraganaTitle: "あいうえお じゅん",
    speakTitle: "あいうえお順",
    hint: "じゅんばんに タップしよう",
    hiraganaHint: "じゅんばんに タップ",
    speakHint: "順番にタップしよう",
    tag: "じゅん",
    tagEmoji: "1️⃣",
    category: "words",
  },
  {
    href: "/games/hiragana",
    emoji: "✏️",
    title: "ひらがな かく",
    hiraganaTitle: "ひらがな かく",
    speakTitle: "ひらがなを書く",
    hint: "ゆびで なぞって かこう",
    hiraganaHint: "ゆびで なぞって かく",
    speakHint: "指でなぞって書こう",
    tag: "かく",
    tagEmoji: "✍️",
    category: "words",
  },
  {
    href: "/games/memory",
    emoji: "🃏",
    title: "かーど めくり",
    hiraganaTitle: "かーど めくり",
    speakTitle: "カードめくり",
    hint: "おなじ え を みつけよう",
    hiraganaHint: "おなじ えを みつける",
    speakHint: "おなじ絵を見つけよう",
    tag: "きおく",
    tagEmoji: "🧠",
    category: "play",
  },
  {
    href: "/games/quiz",
    emoji: "❓",
    title: "どれだ？",
    hiraganaTitle: "どれだ？",
    speakTitle: "どれだ",
    hint: "もんだいに こたえよう",
    hiraganaHint: "もんだいに こたえる",
    speakHint: "問題に答えよう",
    tag: "もんだい",
    tagEmoji: "💭",
    category: "play",
  },
  {
    href: "/games/reflex",
    emoji: "⚡",
    title: "はやおし",
    hiraganaTitle: "はやおし",
    speakTitle: "早押し",
    hint: "🐼 が でたら タッチ！",
    hiraganaHint: "🐼が でたら タッチ",
    speakHint: "パンダが出たらタッチ",
    tag: "はやさ",
    tagEmoji: "🏃",
    category: "play",
  },
  {
    href: "/games/color",
    emoji: "🎨",
    title: "いろ あわせ",
    hiraganaTitle: "いろ あわせ",
    speakTitle: "色合わせ",
    hint: "おなじ いろ を えらぼう",
    hiraganaHint: "おなじ いろを えらぶ",
    speakHint: "同じ色を選ぼう",
    tag: "いろ",
    tagEmoji: "🌈",
    category: "play",
  },
  {
    href: "/games/count",
    emoji: "🔢",
    title: "かぞえよう",
    hiraganaTitle: "かぞえよう",
    speakTitle: "数えよう",
    hint: "え を かぞえて こたえよう",
    hiraganaHint: "えを かぞえて こたえる",
    speakHint: "絵を数えて答えよう",
    tag: "かず",
    tagEmoji: "123",
    category: "play",
  },
  {
    href: "/games/same",
    emoji: "👀",
    title: "おなじ？ ちがう？",
    hiraganaTitle: "おなじ？ ちがう？",
    speakTitle: "同じ？違う？",
    hint: "ふたつの え を くらべよう",
    hiraganaHint: "ふたつの えを くらべる",
    speakHint: "二つの絵を比べよう",
    tag: "くらべ",
    tagEmoji: "⚖️",
    category: "play",
  },
  {
    href: "/games/sequence",
    emoji: "🧩",
    title: "じゅんばん",
    hiraganaTitle: "じゅんばん",
    speakTitle: "順番",
    hint: "でてきた じゅんばん を おぼえよう",
    hiraganaHint: "でた じゅんばんを おぼえる",
    speakHint: "出てきた順番を覚えよう",
    tag: "きおく",
    tagEmoji: "🧠",
    category: "play",
  },
  {
    href: "/games/spot-diff",
    emoji: "🔍",
    title: "まちがい さがし",
    hiraganaTitle: "まちがい さがし",
    speakTitle: "間違い探し",
    hint: "ちがう ところを さがそう",
    hiraganaHint: "ちがう ところを さがす",
    speakHint: "違うところを探そう",
    tag: "め",
    tagEmoji: "👁️",
    category: "play",
  },
];

export function gamesByCategory(category: GameCategory): GameEntry[] {
  return GAMES.filter((g) => g.category === category);
}
