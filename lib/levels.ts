export type GameLevel = 1 | 2 | 3;

export const LEVEL_OPTIONS: {
  id: GameLevel;
  label: string;
  emoji: string;
  hint: string;
}[] = [
  { id: 1, label: "やさしい", emoji: "🌱", hint: "ヒントあり・ゆっくり" },
  { id: 2, label: "ふつう", emoji: "⭐", hint: "ちょうど いい かんじ" },
  { id: 3, label: "チャレンジ", emoji: "🚀", hint: "すこし むずかしい" },
];

export const memoryLevelConfig: Record<
  GameLevel,
  { pairs: number; cols: number; peekMs: number; mismatchMs: number }
> = {
  1: { pairs: 3, cols: 3, peekMs: 2500, mismatchMs: 1300 },
  2: { pairs: 4, cols: 4, peekMs: 0, mismatchMs: 900 },
  3: { pairs: 6, cols: 4, peekMs: 0, mismatchMs: 650 },
};

export const reflexLevelConfig: Record<
  GameLevel,
  { waitMin: number; waitMax: number; reactMs: number; targetRounds: number }
> = {
  1: { waitMin: 2200, waitMax: 3800, reactMs: 4500, targetRounds: 3 },
  2: { waitMin: 1500, waitMax: 3000, reactMs: 3000, targetRounds: 5 },
  3: { waitMin: 700, waitMax: 2200, reactMs: 2000, targetRounds: 8 },
};

export const quizLevelConfig: Record<
  GameLevel,
  { questionCount: number; choiceCount: 3 | 4 }
> = {
  1: { questionCount: 4, choiceCount: 3 },
  2: { questionCount: 6, choiceCount: 3 },
  3: { questionCount: 8, choiceCount: 4 },
};

export const countLevelConfig: Record<
  GameLevel,
  { maxCount: number; rounds: number }
> = {
  1: { maxCount: 3, rounds: 5 },
  2: { maxCount: 5, rounds: 7 },
  3: { maxCount: 8, rounds: 10 },
};

export const colorLevelConfig: Record<
  GameLevel,
  { showName: boolean; choiceCount: number; rounds: number }
> = {
  1: { showName: true, choiceCount: 3, rounds: 5 },
  2: { showName: false, choiceCount: 4, rounds: 7 },
  3: { showName: false, choiceCount: 4, rounds: 10 },
};

export const sameDiffLevelConfig: Record<
  GameLevel,
  { similarMode: boolean; rounds: number }
> = {
  1: { similarMode: false, rounds: 5 },
  2: { similarMode: false, rounds: 8 },
  3: { similarMode: true, rounds: 10 },
};

export const sequenceLevelConfig: Record<
  GameLevel,
  { length: number; rounds: number }
> = {
  1: { length: 2, rounds: 4 },
  2: { length: 3, rounds: 6 },
  3: { length: 4, rounds: 8 },
};
