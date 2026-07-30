import type { IslandId } from "@/lib/islands";
import { ISLANDS } from "@/lib/islands";

export type IslandStars = Record<IslandId, number>;

export const PROGRESS_KEY = "pyon-island-stars";

export function emptyStars(): IslandStars {
  return {
    reflex: 0,
    memory: 0,
    count: 0,
    color: 0,
    rhythm: 0,
  };
}

export function parseStars(raw: string | null): IslandStars {
  const base = emptyStars();
  if (!raw) return base;
  try {
    const data = JSON.parse(raw) as Partial<IslandStars>;
    for (const island of ISLANDS) {
      const n = Number(data[island.id] ?? 0);
      base[island.id] = Math.max(0, Math.min(3, Number.isFinite(n) ? n : 0));
    }
  } catch {
    /* ignore */
  }
  return base;
}

/** Island unlocks when previous island has at least 1 star (first always open). */
export function isIslandUnlocked(stars: IslandStars, id: IslandId): boolean {
  const island = ISLANDS.find((i) => i.id === id);
  if (!island) return false;
  if (island.order === 0) return true;
  const prev = ISLANDS.find((i) => i.order === island.order - 1);
  if (!prev) return true;
  return stars[prev.id] >= 1;
}

export function starsForLevel(level: 1 | 2 | 3): number {
  return level;
}

export function mergeStar(current: number, earned: number): number {
  return Math.max(current, Math.min(3, earned));
}
