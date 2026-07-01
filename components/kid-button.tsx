import { forwardRef, type ComponentProps } from "react";

const baseClass =
  "inline-flex min-h-14 min-w-[3rem] items-center justify-center rounded-2xl px-6 py-4 font-display text-lg font-bold shadow-[var(--shadow-card)] transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-50";

type KidButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "choice" | "violet";
};

export const KidButton = forwardRef<HTMLButtonElement, KidButtonProps>(
  function KidButton(
    { className = "", variant = "primary", ...props },
    ref,
  ) {
    const variantClass =
      variant === "primary"
        ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] ring-2 ring-[var(--accent-ring)]"
        : variant === "secondary"
          ? "bg-white text-stone-800 ring-2 ring-stone-200 hover:bg-stone-50"
          : variant === "violet"
            ? "bg-violet-500 text-white ring-2 ring-violet-300 hover:bg-violet-600"
            : "bg-amber-100 text-stone-900 ring-2 ring-amber-200 hover:bg-amber-200";

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseClass} ${variantClass} ${className}`}
        {...props}
      />
    );
  },
);
