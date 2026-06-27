import { GameShell } from "@/components/game-shell";
import { CharListenGame } from "@/components/char-listen-game";

export default function CharListenPage() {
  return (
    <GameShell
      title="もじを きく"
      titleEmoji="🔤"
      speakTitle="文字を聞く"
    >
      <CharListenGame />
    </GameShell>
  );
}
