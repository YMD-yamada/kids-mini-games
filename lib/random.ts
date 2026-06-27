export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom<T>(items: readonly T[], count: number): T[] {
  return shuffle([...items]).slice(0, Math.min(count, items.length));
}

/** Tap pool that always includes every symbol in the target sequence. */
export function buildSequencePool(
  sequence: readonly string[],
  allSymbols: readonly string[],
  poolSize: number,
): string[] {
  const uniqueSeq = [...new Set(sequence)];
  const distractors = allSymbols.filter((s) => !uniqueSeq.includes(s));
  const extraCount = Math.max(0, poolSize - uniqueSeq.length);
  const extra = pickRandom(distractors, extraCount);
  return shuffle([...uniqueSeq, ...extra]);
}
