import { GameShell } from "@/components/game-shell";
import { HiraWordGame } from "@/components/hira-word-game";

export default function HiraWordPage() {
  return (
    <GameShell
      title="えと ことば"
      hiraganaTitle="えと ことば"
      titleEmoji="🍎"
      speakTitle="絵とことば"
    >
      <HiraWordGame />
    </GameShell>
  );
}
