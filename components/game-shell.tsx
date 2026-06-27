import Link from "next/link";
import type { ReactNode } from "react";
import { LevelPicker } from "@/components/level-picker";
import { SoundToggle } from "@/components/sound-toggle";

type GameShellProps = {
  title: string;
  children: ReactNode;
  showLevel?: boolean;
};

export function GameShell({
  title,
  children,
  showLevel = true,
}: GameShellProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col gap-5 px-4 py-6 sm:max-w-xl sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-2xl bg-white px-4 py-2 text-base font-bold text-stone-700 shadow ring-1 ring-stone-200 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            ← もどる
          </Link>
          <SoundToggle />
        </div>
        <h1 className="text-center text-2xl font-bold tracking-tight text-stone-800">
          {title}
        </h1>
      </header>

      {showLevel ? <LevelPicker /> : null}

      <div className="flex flex-1 flex-col gap-5 pb-4">{children}</div>
    </div>
  );
}
