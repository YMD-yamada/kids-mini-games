import { GameShell } from "@/components/game-shell";
import { ReflexGame } from "@/components/reflex-game";

export default function ReflexPage() {
  return (
    <GameShell title="はやおし">
      <ReflexGame />
    </GameShell>
  );
}
