import type { ComponentProps } from "react";

const baseClass =
  "inline-flex min-h-14 min-w-[3rem] items-center justify-center rounded-3xl px-6 py-4 text-lg font-bold shadow-md transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-50";

type KidButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "choice";
};

export function KidButton({
  className = "",
  variant = "primary",
  ...props
}: KidButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : variant === "secondary"
        ? "bg-white text-stone-800 ring-2 ring-stone-200 hover:bg-stone-50"
        : "bg-amber-100 text-stone-900 ring-2 ring-amber-200 hover:bg-amber-200";

  return (
    <button
      type="button"
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    />
  );
}
