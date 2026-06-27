import Link from "next/link";
import type { ReactNode } from "react";

type GameShellProps = {
  title: string;
  children: ReactNode;
};

export function GameShell({ title, children }: GameShellProps) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-2xl bg-white px-4 py-2 text-base font-bold text-stone-700 shadow ring-1 ring-stone-200 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          ← もどる
        </Link>
        <h1 className="text-center text-2xl font-bold text-stone-800 sm:text-left">
          {title}
        </h1>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
