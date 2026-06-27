type ProgressStarsProps = {
  current: number;
  total: number;
};

export function ProgressStars({ current, total }: ProgressStarsProps) {
  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-label={`${current} / ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`text-2xl transition ${i < current ? "scale-110" : "opacity-30"}`}
          aria-hidden
        >
          {i < current ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
