"use client";

import Link from "next/link";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { ISLANDS, type IslandId } from "@/lib/islands";
import { useNarration } from "@/lib/use-narration";
import { useReadingUI } from "@/lib/use-reading-ui";

/** 島ごとの草の色（明るい・暗い） */
const PALETTE: Record<IslandId, { grass: string; grassDeep: string; flag: string }> = {
  reflex: { grass: "#fcd34d", grassDeep: "#f59e0b", flag: "#f97316" },
  memory: { grass: "#c4b5fd", grassDeep: "#8b5cf6", flag: "#7c3aed" },
  count: { grass: "#7dd3fc", grassDeep: "#0ea5e9", flag: "#0284c7" },
  color: { grass: "#fda4af", grassDeep: "#f43f5e", flag: "#e11d48" },
  rhythm: { grass: "#86efac", grassDeep: "#22c55e", flag: "#16a34a" },
};

const ROW_H = 150;

function IslandArt({ id, emoji, locked }: { id: IslandId; emoji: string; locked: boolean }) {
  const p = PALETTE[id];
  const grass = locked ? "#cbd5e1" : p.grass;
  const grassDeep = locked ? "#94a3b8" : p.grassDeep;
  return (
    <svg viewBox="0 0 180 130" className="h-auto w-full overflow-visible" aria-hidden>
      {/* 浅瀬 */}
      <ellipse cx="90" cy="96" rx="86" ry="26" fill="#e0f7ff" opacity="0.75" />
      {/* 砂浜 */}
      <ellipse cx="90" cy="90" rx="74" ry="22" fill={locked ? "#e2e8f0" : "#fde7b0"} />
      <ellipse cx="90" cy="94" rx="74" ry="18" fill={locked ? "#cbd5e1" : "#f6d38a"} opacity="0.55" />
      {/* 草の丘 */}
      <path
        d="M26 86c4-26 26-40 50-38 8-12 30-14 42-2 22-2 40 14 38 40-30 10-100 10-130 0z"
        fill={grass}
      />
      <path d="M30 84c30 8 92 8 122 0-2 6-4 8-6 10-30 8-80 8-110 0-2-2-4-4-6-10z" fill={grassDeep} opacity="0.6" />
      {/* ヤシの木 */}
      <g opacity={locked ? 0.45 : 1}>
        <path d="M146 80c-2-16 0-30 6-40" stroke="#a16207" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M152 40c-10-8-24-6-30 2 10-2 20 0 30-2z" fill="#16a34a" />
        <path d="M152 40c8-10 22-10 28-2-10-2-18 0-28 2z" fill="#22c55e" />
        <path d="M152 40c-2-10 4-20 12-22-4 8-6 14-12 22z" fill="#15803d" />
      </g>
      {/* 旗 */}
      <path d="M52 60V26" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <path d="M53 27l20 6-20 7z" fill={locked ? "#94a3b8" : p.flag} />
      {/* しるし */}
      <circle cx="92" cy="58" r="25" fill="#fff" stroke={locked ? "#94a3b8" : p.grassDeep} strokeWidth="4" />
      <text x="92" y="68" textAnchor="middle" fontSize="28">
        {locked ? "🔒" : emoji}
      </text>
    </svg>
  );
}

export function IslandMap() {
  const { stars, isUnlocked, play } = useSettings();
  const { isPicture, showAdultHints } = useReadingUI();
  const { narrate } = useNarration();

  const height = ISLANDS.length * ROW_H + 70;
  const points = ISLANDS.map((_, i) => ({ x: i % 2 === 0 ? 30 : 70, y: i * ROW_H + 70 }));
  const path = points
    .map((pt, i) => {
      if (i === 0) return `M${pt.x} ${pt.y}`;
      const prev = points[i - 1];
      const midY = (prev.y + pt.y) / 2;
      return `C${prev.x} ${midY} ${pt.x} ${midY} ${pt.x} ${pt.y}`;
    })
    .join(" ");

  return (
    <div className="sea-map relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-float)] ring-4 ring-white/70" style={{ height }}>
      {/* 船の通り道 */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.2"
          strokeDasharray="2.5 3"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 4 }}
        />
      </svg>
      <span className="sea-boat pointer-events-none absolute z-10 text-3xl" aria-hidden style={{ left: "53%", top: ROW_H * 0.72 }}>
        ⛵
      </span>

      <ul className="relative h-full">
        {ISLANDS.map((island, index) => {
          const unlocked = isUnlocked(island.id);
          const starCount = stars[island.id];
          const left = index % 2 === 0;
          const pos = {
            top: index * ROW_H + 8,
            left: left ? "2%" : undefined,
            right: left ? undefined : "2%",
          } as const;

          const label = (
            <div className={`-mt-3 flex flex-col items-center gap-0.5 ${left ? "" : ""}`}>
              {isPicture ? null : (
                <KidText
                  as="p"
                  hiragana={island.hiraganaTitle}
                  standard={island.title}
                  className="rounded-full bg-white/95 px-3 py-0.5 font-display text-base font-extrabold text-slate-800 shadow-sm"
                />
              )}
              <div className="flex gap-0.5 rounded-full bg-sky-900/25 px-2 py-0.5" aria-label={`星 ${starCount}`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={n <= starCount ? "text-sm" : "text-sm opacity-30 grayscale"} aria-hidden>
                    ⭐
                  </span>
                ))}
              </div>
              {!unlocked && showAdultHints ? (
                <p className="mt-0.5 rounded bg-white/80 px-1.5 text-[11px] text-slate-600">前の島で星を1つためると解放</p>
              ) : null}
            </div>
          );

          return (
            <li
              key={island.id}
              className="float-in absolute w-[58%] max-w-[260px]"
              style={{ ...pos, animationDelay: `${index * 0.07}s` }}
            >
              {unlocked ? (
                <div className="relative">
                  <Link
                    href={`/islands/${island.id}`}
                    onClick={() => play("tap")}
                    className="island-bob block rounded-[2rem] transition active:scale-95"
                    style={{ animationDelay: `${index * 0.35}s` }}
                    aria-label={`${island.speakTitle}。${island.speakHint}`}
                  >
                    <IslandArt id={island.id} emoji={island.emoji} locked={false} />
                    {label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => narrate(`${island.speakTitle}。${island.speakHint}`, true)}
                    className={`absolute top-[42%] flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-lg shadow ring-2 ring-sky-200 ${
                      left ? "-left-1" : "-right-1"
                    }`}
                    aria-label="説明をきく"
                  >
                    🔊
                  </button>
                </div>
              ) : (
                <div aria-disabled className="opacity-80">
                  <IslandArt id={island.id} emoji={island.emoji} locked />
                  {label}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
