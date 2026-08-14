"use client";

import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";

const LINKS = [
  {
    href: "https://ymd-portfolio-site.pages.dev/legal/privacy",
    emoji: "🛡️",
    hiragana: "ほご",
    standard: "ほご",
  },
  {
    href: "https://ymd-portfolio-site.pages.dev/legal/terms",
    emoji: "📜",
    hiragana: "やくそく",
    standard: "やくそく",
  },
  {
    href: "https://ymd-portfolio-site.pages.dev/legal/support",
    emoji: "✉️",
    hiragana: "といあわせ",
    standard: "といあわせ",
  },
] as const;

export function LegalDock() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-6 sm:px-6">
      <KidPanel variant="sky" className="float-in">
        <KidText
          as="p"
          hiragana="なまえも ばしょも あつめないよ"
          standard="アカウントなし。名前・位置はあつめません。"
          picture={<span className="block text-center text-2xl">🛡️</span>}
          className="text-center font-display text-sm font-bold text-slate-600"
        />
        <nav
          className="mt-3 grid grid-cols-3 gap-1.5 rounded-2xl bg-white/80 p-1.5 ring-1 ring-sky-200"
          aria-label="ほうりつ"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              rel="noopener noreferrer"
              className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl bg-white px-1 py-2 text-slate-800 ring-2 ring-orange-200 hover:bg-orange-50"
            >
              <span className="text-xl leading-none" aria-hidden>
                {link.emoji}
              </span>
              <KidText
                as="span"
                hiragana={link.hiragana}
                standard={link.standard}
                picture={<span className="text-base">{link.emoji}</span>}
                className="text-[0.7rem] font-bold leading-tight sm:text-xs"
                srOnlyInPicture={false}
              />
            </a>
          ))}
        </nav>
      </KidPanel>
    </div>
  );
}
