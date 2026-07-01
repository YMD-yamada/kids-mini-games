import type { GameLevel } from "@/lib/levels";

export type HiraganaChar = {
  char: string;
  reading: string;
  hint?: string;
};

export const HIRAGANA_VOWELS: HiraganaChar[] = [
  { char: "あ", reading: "あ", hint: "お口を 大きく あける" },
  { char: "い", reading: "い", hint: "横に 2ぼう" },
  { char: "う", reading: "う", hint: "うえに てん" },
  { char: "え", reading: "え", hint: "よこに 1ぼう" },
  { char: "お", reading: "お", hint: "たてと よこ" },
];

export const HIRAGANA_KA: HiraganaChar[] = [
  { char: "か", reading: "か" },
  { char: "き", reading: "き" },
  { char: "く", reading: "く" },
  { char: "け", reading: "け" },
  { char: "こ", reading: "こ" },
];

export const HIRAGANA_SA: HiraganaChar[] = [
  { char: "さ", reading: "さ" },
  { char: "し", reading: "し" },
  { char: "す", reading: "す" },
  { char: "せ", reading: "せ" },
  { char: "そ", reading: "そ" },
];

export const HIRAGANA_TA: HiraganaChar[] = [
  { char: "た", reading: "た" },
  { char: "ち", reading: "ち" },
  { char: "つ", reading: "つ" },
  { char: "て", reading: "て" },
  { char: "と", reading: "と" },
];

export const HIRAGANA_NA: HiraganaChar[] = [
  { char: "な", reading: "な" },
  { char: "に", reading: "に" },
  { char: "ぬ", reading: "ぬ" },
  { char: "ね", reading: "ね" },
  { char: "の", reading: "の" },
];

export const HIRAGANA_HA: HiraganaChar[] = [
  { char: "は", reading: "は" },
  { char: "ひ", reading: "ひ" },
  { char: "ふ", reading: "ふ" },
  { char: "へ", reading: "へ" },
  { char: "ほ", reading: "ほ" },
];

export const HIRAGANA_MA: HiraganaChar[] = [
  { char: "ま", reading: "ま" },
  { char: "み", reading: "み" },
  { char: "む", reading: "む" },
  { char: "め", reading: "め" },
  { char: "も", reading: "も" },
];

export const HIRAGANA_YA: HiraganaChar[] = [
  { char: "や", reading: "や" },
  { char: "ゆ", reading: "ゆ" },
  { char: "よ", reading: "よ" },
];

export const HIRAGANA_RA: HiraganaChar[] = [
  { char: "ら", reading: "ら" },
  { char: "り", reading: "り" },
  { char: "る", reading: "る" },
  { char: "れ", reading: "れ" },
  { char: "ろ", reading: "ろ" },
];

export const HIRAGANA_WA: HiraganaChar[] = [
  { char: "わ", reading: "わ" },
  { char: "を", reading: "を" },
  { char: "ん", reading: "ん" },
];

export function getHiraganaSet(level: GameLevel): HiraganaChar[] {
  switch (level) {
    case 1:
      return HIRAGANA_VOWELS;
    case 2:
      return [...HIRAGANA_KA, ...HIRAGANA_SA];
    case 3:
      return [
        ...HIRAGANA_TA,
        ...HIRAGANA_NA,
        ...HIRAGANA_HA,
        ...HIRAGANA_MA,
        ...HIRAGANA_YA,
        ...HIRAGANA_RA,
        ...HIRAGANA_WA,
      ];
  }
}

export function getHiraganaRows(level: GameLevel): HiraganaChar[][] {
  switch (level) {
    case 1:
      return [HIRAGANA_VOWELS];
    case 2:
      return [HIRAGANA_KA, HIRAGANA_SA];
    case 3:
      return [HIRAGANA_TA, HIRAGANA_NA, HIRAGANA_HA];
  }
}

export function shuffleChars(chars: HiraganaChar[]): HiraganaChar[] {
  return [...chars].sort(() => Math.random() - 0.5);
}
