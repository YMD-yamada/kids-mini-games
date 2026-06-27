export type ListenWord = {
  id: string;
  word: string;
  emoji: string;
};

export const LISTEN_WORDS: ListenWord[] = [
  { id: "apple", word: "りんご", emoji: "🍎" },
  { id: "dog", word: "いぬ", emoji: "🐶" },
  { id: "cat", word: "ねこ", emoji: "🐱" },
  { id: "car", word: "くるま", emoji: "🚗" },
  { id: "fish", word: "さかな", emoji: "🐟" },
  { id: "sun", word: "たいよう", emoji: "☀️" },
  { id: "moon", word: "つき", emoji: "🌙" },
  { id: "flower", word: "はな", emoji: "🌸" },
  { id: "bird", word: "とり", emoji: "🐦" },
  { id: "banana", word: "バナナ", emoji: "🍌" },
];

export function pickListenRound(
  words: ListenWord[],
  choiceCount: number,
): { target: ListenWord; choices: ListenWord[] } {
  const target = words[Math.floor(Math.random() * words.length)];
  const others = words.filter((w) => w.id !== target.id);
  const distractors = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, choiceCount - 1);
  const choices = [target, ...distractors].sort(() => Math.random() - 0.5);
  return { target, choices };
}
