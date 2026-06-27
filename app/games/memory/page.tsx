import { GameShell } from "@/components/game-shell";
import { MemoryGame } from "@/components/memory-game";

export default function MemoryPage() {
  return (
    <GameShell title="かーど めくり">
      <MemoryGame />
    </GameShell>
  );
}
