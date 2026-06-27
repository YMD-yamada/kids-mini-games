import { GameShell } from "@/components/game-shell";
import { SequenceGame } from "@/components/sequence-game";

export default function SequencePage() {
  return (
    <GameShell title="じゅんばん">
      <SequenceGame />
    </GameShell>
  );
}
