import type { ReactNode } from "react";

type KidPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "soft" | "sky" | "violet";
};

const variants = {
  default: "bg-[var(--surface)] ring-[var(--ring)]",
  soft: "bg-[var(--surface-soft)] ring-[var(--ring-soft)]",
  sky: "bg-[var(--sky-soft)] ring-[var(--sky-ring)]",
  violet: "bg-[var(--violet-soft)] ring-[var(--violet-ring)]",
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
