import { GameShell } from "@/components/game-shell";
import { SameDiffGame } from "@/components/same-diff-game";

export default function SamePage() {
  return (
    <GameShell title="おなじ？ ちがう？">
      <SameDiffGame />
    </GameShell>
  );
}
