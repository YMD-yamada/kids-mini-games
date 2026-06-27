import Link from "next/link";
import { HomeSettings } from "@/components/home-settings";

const games = [
  {
    href: "/games/memory",
    emoji: "🃏",
    title: "かーど めくり",
    hint: "おなじ え を みつけよう",
    tag: "きおく",
  },
  {
    href: "/games/quiz",
    emoji: "❓",
    title: "どれだ？",
    hint: "もんだいに こたえよう",
    tag: "クイズ",
  },
  {
    href: "/games/reflex",
    emoji: "⚡",
    title: "はやおし",
    hint: "🐼 が でたら タッチ！",
    tag: "はやさ",
  },
  {
    href: "/games/color",
    emoji: "🎨",
    title: "いろ あわせ",
    hint: "おなじ いろ を えらぼう",
    tag: "いろ",
  },
  {
    href: "/games/count",
    emoji: "🔢",
    title: "かぞえよう",
    hint: "え を かぞえて こたえよう",
    tag: "かず",
  },
  {
    href: "/games/same",
    emoji: "👀",
    title: "おなじ？ ちがう？",
    hint: "ふたつの え を くらべよう",
    tag: "くらべ",
  },
  {
    href: "/games/sequence",
    emoji: "🧩",
    title: "じゅんばん",
    hint: "でてきた じゅんばん を おぼえよう",
    tag: "きおく",
  },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="text-center">
        <p className="text-5xl" aria-hidden>
          🌈
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          みんなのミニゲーム
        </h1>
        <p className="mt-2 text-lg text-stone-600">
          タップして あそぶ 7つの ゲーム
        </p>
      </header>

      <HomeSettings />

      <ul className="flex flex-col gap-3">
        {games.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="flex flex-col gap-1 rounded-3xl bg-white p-5 shadow-md ring-2 ring-amber-100 transition hover:bg-amber-50 hover:ring-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[0.99]"
            >
              <span className="flex items-center gap-3 text-xl font-bold text-stone-800">
                <span className="text-4xl" aria-hidden>
                  {g.emoji}
                </span>
                {g.title}
                <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                  {g.tag}
                </span>
              </span>
              <span className="pl-[3.25rem] text-base text-stone-600">
                {g.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-stone-500">
        🔊 おと は みぎうえから 切り替えできるよ
        <br />
        おうちのひとと いっしょに あそぼう
      </p>
    </div>
  );
}
