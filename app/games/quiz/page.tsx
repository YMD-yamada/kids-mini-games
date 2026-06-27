import { GameShell } from "@/components/game-shell";
import { QuizGame } from "@/components/quiz-game";

export default function QuizPage() {
  return (
    <GameShell title="どれだ？">
      <QuizGame />
    </GameShell>
  );
}
