export type GameLevel = 1 | 2 | 3;

export const LEVEL_OPTIONS: {
  id: GameLevel;
  label: string;
  emoji: string;
  hint: string;
}[] = [
  { id: 1, label: "やさしい", emoji: "🌱", hint: "ゆっくり・ヒント多め" },
  { id: 2, label: "ふつう", emoji: "⭐", hint: "ちょうどいい" },
  { id: 3, label: "チャレンジ", emoji: "🚀", hint: "すこしむずかしい" },
];

export const reflexConfig: Record<
  GameLevel,
  { waitMin: number; waitMax: number; reactMs: number; rounds: number }
> = {
  1: { waitMin: 1800, waitMax: 3200, reactMs: 4500, rounds: 3 },
  2: { waitMin: 1200, waitMax: 2600, reactMs: 2800, rounds: 5 },
  3: { waitMin: 700, waitMax: 1800, reactMs: 1800, rounds: 7 },
};

export const memoryConfig: Record<
  GameLevel,
  { length: number; rounds: number; showMs: number }
> = {
  1: { length: 2, rounds: 3, showMs: 900 },
  2: { length: 3, rounds: 4, showMs: 750 },
  3: { length: 4, rounds: 5, showMs: 600 },
};

export const countConfig: Record<GameLevel, { maxCount: number; rounds: number }> = {
  1: { maxCount: 3, rounds: 4 },
  2: { maxCount: 5, rounds: 6 },
  3: { maxCount: 8, rounds: 8 },
};

export const colorConfig: Record<
  GameLevel,
  { choiceCount: number; rounds: number; useShapes: boolean }
> = {
  1: { choiceCount: 3, rounds: 4, useShapes: false },
  2: { choiceCount: 4, rounds: 6, useShapes: true },
  3: { choiceCount: 4, rounds: 8, useShapes: true },
};

export const rhythmConfig: Record<
  GameLevel,
  { length: number; rounds: number; beatMs: number }
> = {
  1: { length: 2, rounds: 3, beatMs: 700 },
  2: { length: 3, rounds: 4, beatMs: 560 },
  3: { length: 4, rounds: 5, beatMs: 450 },
};
