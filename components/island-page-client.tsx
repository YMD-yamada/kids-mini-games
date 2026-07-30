"use client";

import Link from "next/link";
import { ColorIsland } from "@/components/games/color-island";
import { CountIsland } from "@/components/games/count-island";
import { MemoryIsland } from "@/components/games/memory-island";
import { ReflexIsland } from "@/components/games/reflex-island";
import { RhythmIsland } from "@/components/games/rhythm-island";
import { IslandShell } from "@/components/island-shell";
import { KidButton } from "@/components/kid-button";
import { useSettings } from "@/components/providers/settings-provider";
import { KidText } from "@/components/ui/kid-text";
import { getIsland, type IslandId } from "@/lib/islands";

function IslandGame({ id }: { id: IslandId }) {
  switch (id) {
    case "reflex":
      return <ReflexIsland />;
    case "memory":
      return <MemoryIsland />;
    case "count":
      return <CountIsland />;
    case "color":
      return <ColorIsland />;
    case "rhythm":
      return <RhythmIsland />;
  }
}

export function IslandPageClient({ id }: { id: IslandId }) {
  const { isUnlocked, ready } = useSettings();
  const island = getIsland(id);
  if (!island) return null;

  if (ready && !isUnlocked(id)) {
    return (
      <div className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="text-6xl" aria-hidden>
          🔒
        </p>
        <KidText
          as="h1"
          hiragana="まだ ひらいてない しま"
          standard="まだひらいていない島です"
          className="font-display text-2xl font-bold"
        />
        <KidText
          as="p"
          hiragana="まえの しまで ほしを ためてね"
          standard="前の島で星を1つ以上ためると解放されます"
          className="text-slate-600"
        />
        <Link href="/">
          <KidButton>マップへ</KidButton>
        </Link>
      </div>
    );
  }

  return (
    <IslandShell
      title={island.title}
      hiraganaTitle={island.hiraganaTitle}
      emoji={island.emoji}
      speakTitle={island.speakTitle}
    >
      <IslandGame id={id} />
    </IslandShell>
  );
}
