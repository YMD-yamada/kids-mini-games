type GameInstructionProps = {
  emoji: string;
  steps: string[];
};

export function GameInstruction({ emoji, steps }: GameInstructionProps) {
  return (
    <div className="rounded-3xl bg-sky-50 p-4 ring-2 ring-sky-100">
      <div className="flex items-start gap-3">
        <span className="text-4xl" aria-hidden>
          {emoji}
        </span>
        <ol className="flex flex-1 flex-col gap-2 text-base font-bold text-sky-900">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-200 text-sm"
                aria-hidden
              >
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
