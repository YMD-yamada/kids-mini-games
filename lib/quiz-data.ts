import type { GameLevel } from "@/lib/levels";
import { pickRandom, shuffle } from "@/lib/random";

export type QuizChoice = {
  id: string;
  label: string;
  correct: boolean;
  surfaceClass?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  promptEmoji?: string;
  minLevel: GameLevel;
  choices: QuizChoice[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "color-red",
    minLevel: 1,
    prompt: "あかい いろ は どれ？",
    promptEmoji: "🔴",
    choices: [
      { id: "r", label: "あか", correct: true, surfaceClass: "bg-red-500 text-white" },
      { id: "b", label: "あお", correct: false, surfaceClass: "bg-blue-500 text-white" },
      { id: "y", label: "きいろ", correct: false, surfaceClass: "bg-yellow-400 text-stone-900" },
    ],
  },
  {
    id: "color-blue",
    minLevel: 1,
    prompt: "あおい いろ は どれ？",
    promptEmoji: "🔵",
    choices: [
      { id: "g", label: "みどり", correct: false, surfaceClass: "bg-green-500 text-white" },
      { id: "b", label: "あお", correct: true, surfaceClass: "bg-blue-500 text-white" },
      { id: "p", label: "むらさき", correct: false, surfaceClass: "bg-purple-500 text-white" },
    ],
  },
  {
    id: "shape-star",
    minLevel: 1,
    prompt: "ほしの かたち は どれ？",
    promptEmoji: "⭐",
    choices: [
      { id: "star", label: "⭐", correct: true },
      { id: "circle", label: "●", correct: false },
      { id: "square", label: "■", correct: false },
    ],
  },
  {
    id: "count-2",
    minLevel: 1,
    prompt: "りんご 🍎 が ふたつ の ところ は？",
    choices: [
      { id: "one", label: "🍎", correct: false },
      { id: "two", label: "🍎🍎", correct: true },
      { id: "three", label: "🍎🍎🍎", correct: false },
    ],
  },
  {
    id: "count-3",
    minLevel: 2,
    prompt: "りんご 🍎 が みっつ の ところ は？",
    choices: [
      { id: "two", label: "🍎🍎", correct: false },
      { id: "three", label: "🍎🍎🍎", correct: true },
      { id: "four", label: "🍎🍎🍎🍎", correct: false },
    ],
  },
  {
    id: "big-small",
    minLevel: 1,
    prompt: "いちばん おおきい の は どれ？",
    promptEmoji: "🐘",
    choices: [
      { id: "small", label: "🐜", correct: false },
      { id: "big", label: "🐘", correct: true },
      { id: "mid", label: "🐕", correct: false },
    ],
  },
  {
    id: "weather-sun",
    minLevel: 2,
    prompt: "はれ の ひ は どれ？",
    promptEmoji: "☀️",
    choices: [
      { id: "sun", label: "☀️", correct: true },
      { id: "rain", label: "🌧️", correct: false },
      { id: "snow", label: "❄️", correct: false },
      { id: "cloud", label: "☁️", correct: false },
    ],
  },
  {
    id: "fruit-banana",
    minLevel: 2,
    prompt: "きいろい くだもの は どれ？",
    choices: [
      { id: "apple", label: "🍎", correct: false },
      { id: "banana", label: "🍌", correct: true },
      { id: "grape", label: "🍇", correct: false },
      { id: "melon", label: "🍈", correct: false },
    ],
  },
  {
    id: "vehicle-bus",
    minLevel: 2,
    prompt: "たくさん の ひと が のれる の は？",
    promptEmoji: "🚌",
    choices: [
      { id: "bike", label: "🚲", correct: false },
      { id: "bus", label: "🚌", correct: true },
      { id: "car", label: "🚗", correct: false },
    ],
  },
  {
    id: "opposite-hot",
    minLevel: 3,
    prompt: "あつい の ぎゃく は どれ？",
    choices: [
      { id: "hot", label: "🔥 あつい", correct: false },
      { id: "cold", label: "❄️ つめたい", correct: true },
      { id: "warm", label: "☀️ ぬくい", correct: false },
      { id: "wind", label: "💨 かぜ", correct: false },
    ],
  },
  {
    id: "count-5",
    minLevel: 3,
    prompt: "🌸 が いつつ の ところ は？",
    choices: [
      { id: "four", label: "🌸🌸🌸🌸", correct: false },
      { id: "five", label: "🌸🌸🌸🌸🌸", correct: true },
      { id: "six", label: "🌸🌸🌸🌸🌸🌸", correct: false },
      { id: "three", label: "🌸🌸🌸", correct: false },
    ],
  },
  {
    id: "time-morning",
    minLevel: 3,
    prompt: "おはよう の じかん は どれ？",
    choices: [
      { id: "morning", label: "🌅 あさ", correct: true },
      { id: "noon", label: "☀️ ひる", correct: false },
      { id: "night", label: "🌙 よる", correct: false },
      { id: "rainbow", label: "🌈 にじ", correct: false },
    ],
  },
];

export function getQuizForLevel(level: GameLevel, count: number) {
  const pool = quizQuestions.filter((q) => q.minLevel <= level);
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export const COLOR_ITEMS = [
  { id: "red", name: "あか", hex: "#ef4444", emoji: "🔴" },
  { id: "blue", name: "あお", hex: "#3b82f6", emoji: "🔵" },
  { id: "yellow", name: "きいろ", hex: "#facc15", emoji: "🟡" },
  { id: "green", name: "みどり", hex: "#22c55e", emoji: "🟢" },
  { id: "orange", name: "オレンジ", hex: "#f97316", emoji: "🟠" },
  { id: "purple", name: "むらさき", hex: "#a855f7", emoji: "🟣" },
] as const;

export const COUNT_EMOJIS = ["🍎", "⭐", "🐶", "🌸", "🚗", "🎈", "🍌", "🐸"] as const;

export const SAME_DIFF_ITEMS = [
  "🐶", "🐱", "🐻", "🍎", "🍌", "⭐", "🚗", "🎈", "🐸", "🦋",
] as const;

export const SEQUENCE_SYMBOLS = ["🐶", "🐱", "🐻", "🍎", "⭐", "🎈", "🚗", "🐸"] as const;

export const MEMORY_SYMBOLS = [
  "🐶", "🐱", "🐻", "🐼", "🐸", "🦊", "🐰", "🦁", "🐯", "🐨",
] as const;

export { pickRandom, shuffle } from "@/lib/random";
