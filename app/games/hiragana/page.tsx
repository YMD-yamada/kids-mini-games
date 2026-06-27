import { GameShell } from "@/components/game-shell";
import { HiraganaWriteGame } from "@/components/hiragana-write-game";

export default function HiraganaPage() {
  return (
    <GameShell title="ひらがな れんしゅう">
      <HiraganaWriteGame />
    </GameShell>
  );
}
