import { GameShell } from "@/components/game-shell";
import { ListenGame } from "@/components/listen-game";

export default function ListenPage() {
  return (
    <GameShell
      title="きいて えらぶ"
      titleEmoji="👂"
      speakTitle="聞いて選ぶ"
    >
      <ListenGame />
    </GameShell>
  );
}
