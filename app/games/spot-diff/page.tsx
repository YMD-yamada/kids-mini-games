import { GameShell } from "@/components/game-shell";
import { SpotDiffGame } from "@/components/spot-diff-game";

export default function SpotDiffPage() {
  return (
    <GameShell title="まちがい さがし">
      <SpotDiffGame />
    </GameShell>
  );
}
