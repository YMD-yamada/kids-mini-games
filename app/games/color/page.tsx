import { GameShell } from "@/components/game-shell";
import { ColorMatchGame } from "@/components/color-match-game";

export default function ColorPage() {
  return (
    <GameShell title="いろ あわせ">
      <ColorMatchGame />
    </GameShell>
  );
}
