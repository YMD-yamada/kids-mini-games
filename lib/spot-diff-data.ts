export type SceneItem = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size?: number;
};

export type DifferenceZone = {
  id: string;
  x: number;
  y: number;
  radius: number;
  hint: string;
};

export type SpotPuzzle = {
  id: string;
  name: string;
  emoji: string;
  background: string;
  leftItems: SceneItem[];
  rightItems: SceneItem[];
  differences: DifferenceZone[];
};

export const spotPuzzles: SpotPuzzle[] = [
  {
    id: "park",
    name: "こうえん",
    emoji: "🌳",
    background: "/games/spot-diff/park.png",
    leftItems: [
      { id: "pet", emoji: "🐱", x: 0.22, y: 0.62, size: 2.2 },
      { id: "flower", emoji: "🌸", x: 0.72, y: 0.78, size: 1.8 },
      { id: "ball", emoji: "⚽", x: 0.48, y: 0.82, size: 1.6 },
      { id: "cloud", emoji: "☁️", x: 0.18, y: 0.14, size: 1.5 },
      { id: "butterfly", emoji: "🦋", x: 0.58, y: 0.35, size: 1.4 },
    ],
    rightItems: [
      { id: "pet", emoji: "🐶", x: 0.22, y: 0.62, size: 2.2 },
      { id: "flower", emoji: "🌻", x: 0.72, y: 0.78, size: 1.8 },
      { id: "ball", emoji: "⚽", x: 0.48, y: 0.82, size: 1.6 },
      { id: "kite", emoji: "🪁", x: 0.18, y: 0.14, size: 1.5 },
      { id: "butterfly", emoji: "🦋", x: 0.58, y: 0.35, size: 1.4 },
    ],
    differences: [
      { id: "pet", x: 0.22, y: 0.62, radius: 0.12, hint: "どうぶつ" },
      { id: "flower", x: 0.72, y: 0.78, radius: 0.1, hint: "お花" },
      { id: "sky", x: 0.18, y: 0.14, radius: 0.12, hint: "そら" },
    ],
  },
  {
    id: "room",
    name: "おへや",
    emoji: "🏠",
    background: "/games/spot-diff/room.png",
    leftItems: [
      { id: "bear", emoji: "🧸", x: 0.2, y: 0.58, size: 2 },
      { id: "blocks", emoji: "🟦", x: 0.42, y: 0.85, size: 1.5 },
      { id: "lamp", emoji: "💡", x: 0.78, y: 0.28, size: 1.4 },
      { id: "book", emoji: "📕", x: 0.65, y: 0.55, size: 1.3 },
      { id: "star", emoji: "⭐", x: 0.35, y: 0.22, size: 1.2 },
    ],
    rightItems: [
      { id: "bear", emoji: "🐰", x: 0.2, y: 0.58, size: 2 },
      { id: "blocks", emoji: "🟥", x: 0.42, y: 0.85, size: 1.5 },
      { id: "lamp", emoji: "💡", x: 0.78, y: 0.28, size: 1.4 },
      { id: "book", emoji: "📘", x: 0.65, y: 0.55, size: 1.3 },
      { id: "moon", emoji: "🌙", x: 0.35, y: 0.22, size: 1.2 },
    ],
    differences: [
      { id: "bear", x: 0.2, y: 0.58, radius: 0.12, hint: "ぬいぐるみ" },
      { id: "blocks", x: 0.42, y: 0.85, radius: 0.1, hint: "ブロック" },
      { id: "book", x: 0.65, y: 0.55, radius: 0.1, hint: "ほん" },
      { id: "moon", x: 0.35, y: 0.22, radius: 0.1, hint: "つき" },
    ],
  },
  {
    id: "beach",
    name: "うみ",
    emoji: "🏖️",
    background: "/games/spot-diff/beach.png",
    leftItems: [
      { id: "crab", emoji: "🦀", x: 0.25, y: 0.75, size: 1.8 },
      { id: "shell", emoji: "🐚", x: 0.55, y: 0.88, size: 1.5 },
      { id: "boat", emoji: "⛵", x: 0.75, y: 0.45, size: 1.6 },
      { id: "sun", emoji: "☀️", x: 0.82, y: 0.12, size: 1.6 },
      { id: "fish", emoji: "🐟", x: 0.4, y: 0.5, size: 1.3 },
    ],
    rightItems: [
      { id: "crab", emoji: "🦞", x: 0.25, y: 0.75, size: 1.8 },
      { id: "shell", emoji: "🐚", x: 0.55, y: 0.88, size: 1.5 },
      { id: "boat", emoji: "🚤", x: 0.75, y: 0.45, size: 1.6 },
      { id: "sun", emoji: "🌤️", x: 0.82, y: 0.12, size: 1.6 },
      { id: "fish", emoji: "🐠", x: 0.4, y: 0.5, size: 1.3 },
    ],
    differences: [
      { id: "crab", x: 0.25, y: 0.75, radius: 0.12, hint: "かに" },
      { id: "boat", x: 0.75, y: 0.45, radius: 0.1, hint: "ボート" },
      { id: "sun", x: 0.82, y: 0.12, radius: 0.1, hint: "たいよう" },
      { id: "fish", x: 0.4, y: 0.5, radius: 0.1, hint: "さかな" },
    ],
  },
];

export function getSpotPuzzle(index: number): SpotPuzzle {
  return spotPuzzles[index % spotPuzzles.length];
}

export function pickDifferences(
  puzzle: SpotPuzzle,
  count: number,
): DifferenceZone[] {
  const shuffled = [...puzzle.differences].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
