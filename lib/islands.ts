export type IslandId = "reflex" | "memory" | "count" | "color" | "rhythm";

export type IslandDef = {
  id: IslandId;
  order: number;
  emoji: string;
  accent: string;
  title: string;
  hiraganaTitle: string;
  speakTitle: string;
  hint: string;
  hiraganaHint: string;
  speakHint: string;
};

export const ISLANDS: IslandDef[] = [
  {
    id: "reflex",
    order: 0,
    emoji: "⚡",
    accent: "from-amber-200 to-orange-100 ring-orange-200",
    title: "はやわざじま",
    hiraganaTitle: "はやわざじま",
    speakTitle: "はやわざじま",
    hint: "ぴょんがでたらタッチ！",
    hiraganaHint: "ぴょんが でたら タッチ",
    speakHint: "ぴょんが出たらタッチしてね",
  },
  {
    id: "memory",
    order: 1,
    emoji: "🧠",
    accent: "from-violet-200 to-fuchsia-100 ring-violet-200",
    title: "おぼえじま",
    hiraganaTitle: "おぼえじま",
    speakTitle: "おぼえじま",
    hint: "でたじゅんばんをおぼえよう",
    hiraganaHint: "でた じゅんばんを おぼえる",
    speakHint: "出てきた順番をおぼえてね",
  },
  {
    id: "count",
    order: 2,
    emoji: "🔢",
    accent: "from-sky-200 to-cyan-100 ring-sky-200",
    title: "かずじま",
    hiraganaTitle: "かずじま",
    speakTitle: "かずじま",
    hint: "いくつあるかかぞえよう",
    hiraganaHint: "いくつあるか かぞえる",
    speakHint: "いくつあるかかぞえてね",
  },
  {
    id: "color",
    order: 3,
    emoji: "🎨",
    accent: "from-rose-200 to-pink-100 ring-rose-200",
    title: "いろかたちじま",
    hiraganaTitle: "いろかたちじま",
    speakTitle: "いろかたちじま",
    hint: "おなじいろ・かたちをえらぶ",
    hiraganaHint: "おなじ いろ・かたちを えらぶ",
    speakHint: "同じいろやかたちをえらんでね",
  },
  {
    id: "rhythm",
    order: 4,
    emoji: "🎵",
    accent: "from-lime-200 to-emerald-100 ring-lime-200",
    title: "おとじま",
    hiraganaTitle: "おとじま",
    speakTitle: "おとじま",
    hint: "おとのじゅんばんをまねしよう",
    hiraganaHint: "おとの じゅんばんを まねする",
    speakHint: "音の順番をまねしてね",
  },
];

export function getIsland(id: string): IslandDef | undefined {
  return ISLANDS.find((i) => i.id === id);
}

export function isIslandId(id: string): id is IslandId {
  return ISLANDS.some((i) => i.id === id);
}
