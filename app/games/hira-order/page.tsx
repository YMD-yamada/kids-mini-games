import { GameShell } from "@/components/game-shell";
import { HiraOrderGame } from "@/components/hira-order-game";

export default function HiraOrderPage() {
  return (
    <GameShell
      title="あいうえお じゅん"
      hiraganaTitle="あいうえお じゅん"
      titleEmoji="🎵"
      speakTitle="あいうえお順"
    >
      <HiraOrderGame />
    </GameShell>
  );
}
