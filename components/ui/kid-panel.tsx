import type { ReactNode } from "react";

type KidPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "soft" | "sky" | "violet";
};

const variants = {
  default: "bg-white ring-sky-100",
  soft: "bg-white/80 ring-sky-100",
  sky: "bg-sky-50 ring-sky-200",
  violet: "bg-violet-50 ring-violet-200",
};

export function KidPanel({
  children,
  className = "",
  variant = "default",
}: KidPanelProps) {
  return (
    <div
      className={`rounded-[1.75rem] p-4 shadow-[var(--shadow-card)] ring-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
