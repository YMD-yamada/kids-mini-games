export type GameEntry = {
  href: string;
  emoji: string;
  title: string;
  /** 音声読み上げ用（やさしい言葉） */
  speakTitle: string;
  hint: string;
  speakHint: string;
  tag: string;
  tagEmoji: string;
};

export const GAMES: GameEntry[] = [
  {
    href: "/games/memory",
    emoji: "🃏",
    title: "かーど めくり",
    speakTitle: "カードめくり",
    hint: "おなじ え を みつけよう",
    speakHint: "おなじ絵を見つけよう",
    tag: "きおく",
    tagEmoji: "🧠",
  },
  {
    href: "/games/quiz",
    emoji: "❓",
    title: "どれだ？",
    speakTitle: "どれだ",
    hint: "もんだいに こたえよう",
    speakHint: "問題に答えよう",
    tag: "もんだい",
    tagEmoji: "💭",
  },
  {
    href: "/games/listen",
    emoji: "👂",
    title: "きいて えらぶ",
    speakTitle: "聞いて選ぶ",
    hint: "こえを きいて タップ",
    speakHint: "声を聞いてタップ",
    tag: "ことば",
    tagEmoji: "🔊",
  },
  {
    href: "/games/char-listen",
    emoji: "🔤",
    title: "もじを きく",
    speakTitle: "文字を聞く",
    hint: "ひらがなの こえを きく",
    speakHint: "ひらがなの声を聞く",
    tag: "もじ",
    tagEmoji: "あ",
  },
  {
    href: "/games/reflex",
    emoji: "⚡",
    title: "はやおし",
    speakTitle: "早押し",
    hint: "🐼 が でたら タッチ！",
    speakHint: "パンダが出たらタッチ",
    tag: "はやさ",
    tagEmoji: "🏃",
  },
  {
    href: "/games/color",
    emoji: "🎨",
    title: "いろ あわせ",
    speakTitle: "色合わせ",
    hint: "おなじ いろ を えらぼう",
    speakHint: "同じ色を選ぼう",
    tag: "いろ",
    tagEmoji: "🌈",
  },
  {
    href: "/games/count",
    emoji: "🔢",
    title: "かぞえよう",
    speakTitle: "数えよう",
    hint: "え を かぞえて こたえよう",
    speakHint: "絵を数えて答えよう",
    tag: "かず",
    tagEmoji: "123",
  },
  {
    href: "/games/same",
    emoji: "👀",
    title: "おなじ？ ちがう？",
    speakTitle: "同じ？違う？",
    hint: "ふたつの え を くらべよう",
    speakHint: "二つの絵を比べよう",
    tag: "くらべ",
    tagEmoji: "⚖️",
  },
  {
    href: "/games/sequence",
    emoji: "🧩",
    title: "じゅんばん",
    speakTitle: "順番",
    hint: "でてきた じゅんばん を おぼえよう",
    speakHint: "出てきた順番を覚えよう",
    tag: "きおく",
    tagEmoji: "🧠",
  },
  {
    href: "/games/spot-diff",
    emoji: "🔍",
    title: "まちがい さがし",
    speakTitle: "間違い探し",
    hint: "ちがう ところを さがそう",
    speakHint: "違うところを探そう",
    tag: "め",
    tagEmoji: "👁️",
  },
  {
    href: "/games/hiragana",
    emoji: "✏️",
    title: "ひらがな かく",
    speakTitle: "ひらがなを書く",
    hint: "ゆびで なぞって かこう",
    speakHint: "指でなぞって書こう",
    tag: "かく",
    tagEmoji: "✍️",
  },
];
