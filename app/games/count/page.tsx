import { GameShell } from "@/components/game-shell";
import { CountingGame } from "@/components/counting-game";

export default function CountPage() {
  return (
    <GameShell title="かぞえよう">
      <CountingGame />
    </GameShell>
  );
}
