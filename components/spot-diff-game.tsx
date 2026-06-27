"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import { spotDiffLevelConfig } from "@/lib/levels";
import {
  getSpotPuzzle,
  pickDifferences,
  type DifferenceZone,
  type SceneItem,
  type SpotPuzzle,
} from "@/lib/spot-diff-data";
import { useNormalizedPointerTap } from "@/lib/use-pointer-tap";

function ScenePanel({
  label,
  items,
  background,
  onTap,
  showHints,
  foundIds,
  activeDiffs,
  interactive,
}: {
  label: string;
  items: SceneItem[];
  background: string;
  onTap?: (x: number, y: number) => void;
  showHints: boolean;
  foundIds: Set<string>;
  activeDiffs: DifferenceZone[];
  interactive: boolean;
}) {
  const handlePointer = useNormalizedPointerTap(
    (point) => onTap?.(point.x, point.y),
    interactive && !!onTap,
  );

  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-center text-sm font-bold text-stone-600">{label}</p>
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-2 touch-none ${
          interactive ? "ring-orange-300 cursor-pointer" : "ring-stone-200"
        }`}
        onPointerUp={handlePointer}
        role={interactive ? "button" : undefined}
        aria-label={interactive ? "ちがう ところを タップ" : label}
      >
        <Image
          src={background}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 320px"
          priority
        />
        {items.map((item) => (
          <span
            key={item.id}
            className="pointer-events-none absolute select-none"
            style={{
              left: `${item.x * 100}%`,
              top: `${item.y * 100}%`,
              transform: "translate(-50%, -50%)",
              fontSize: `${(item.size ?? 1.6) * 1.4}rem`,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
            }}
            aria-hidden
          >
            {item.emoji}
          </span>
        ))}
        {interactive && showHints
          ? activeDiffs
              .filter((d) => !foundIds.has(d.id))
              .map((d) => (
                <span
                  key={d.id}
                  className="pointer-events-none absolute rounded-full border-4 border-dashed border-yellow-400 bg-yellow-200/30 kid-pulse"
                  style={{
                    left: `${d.x * 100}%`,
                    top: `${d.y * 100}%`,
                    width: `${d.radius * 220}%`,
                    height: `${d.radius * 220}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-hidden
                />
              ))
          : null}
        {interactive
          ? activeDiffs
              .filter((d) => foundIds.has(d.id))
              .map((d) => (
                <span
                  key={`found-${d.id}`}
                  className="pointer-events-none absolute text-3xl"
                  style={{
                    left: `${d.x * 100}%`,
                    top: `${d.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-hidden
                >
                  ⭕
                </span>
              ))
          : null}
      </div>
    </div>
  );
}

export function SpotDiffGame() {
  const { level, play } = useSettings();
  const cfg = spotDiffLevelConfig[level];
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<SpotPuzzle>(() => getSpotPuzzle(0));
  const [activeDiffs, setActiveDiffs] = useState<DifferenceZone[]>([]);
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [gameComplete, setGameComplete] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => () => clearAdvanceTimer(), []);

  const initPuzzle = useCallback(
    (index: number) => {
      const p = getSpotPuzzle(index);
      setPuzzle(p);
      setActiveDiffs(pickDifferences(p, cfg.diffCount));
      setFoundIds(new Set());
      setFeedback("idle");
    },
    [cfg.diffCount],
  );

  useEffect(() => {
    clearAdvanceTimer();
    setPuzzleIndex(0);
    setGameComplete(false);
    initPuzzle(0);
  }, [level, initPuzzle]);

  const handleTap = (x: number, y: number) => {
    if (feedback !== "idle" || gameComplete) return;

    const hitRadiusBoost = level === 1 ? 1.25 : 1;
    const hit = activeDiffs.find(
      (d) =>
        !foundIds.has(d.id) &&
        Math.hypot(d.x - x, d.y - y) <= d.radius * hitRadiusBoost,
    );

    if (hit) {
      play("tap");
      const next = new Set(foundIds);
      next.add(hit.id);
      setFoundIds(next);
      setFeedback("ok");

      if (next.size >= activeDiffs.length) {
        clearAdvanceTimer();
        advanceTimer.current = setTimeout(() => {
          const isLast = puzzleIndex >= cfg.puzzleCount - 1;
          if (isLast) {
            setGameComplete(true);
          } else {
            const nextIndex = puzzleIndex + 1;
            setPuzzleIndex(nextIndex);
            initPuzzle(nextIndex);
          }
          setFeedback("idle");
        }, 1200);
      } else {
        setTimeout(() => setFeedback("idle"), 800);
      }
    } else {
      play("tap");
      setFeedback("ng");
      setTimeout(() => setFeedback("idle"), 900);
    }
  };

  const allFound = foundIds.size >= activeDiffs.length;

  const reset = () => {
    clearAdvanceTimer();
    setPuzzleIndex(0);
    setGameComplete(false);
    initPuzzle(0);
  };

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="🔍"
        steps={[
          "ひだり と みぎ を くらべる",
          "みぎの え で ちがう ところを タップ",
          `${activeDiffs.length} こ みつけたら クリア！`,
        ]}
      />

      <p className="text-center text-lg font-bold text-stone-700">
        {puzzle.emoji} {puzzle.name}（{puzzleIndex + 1} / {cfg.puzzleCount}）
      </p>

      <ProgressStars current={foundIds.size} total={activeDiffs.length} />

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
        <ScenePanel
          label="ひだり"
          items={puzzle.leftItems}
          background={puzzle.background}
          showHints={false}
          foundIds={foundIds}
          activeDiffs={activeDiffs}
          interactive={false}
        />
        <ScenePanel
          label="みぎ ← タップ！"
          items={puzzle.rightItems}
          background={puzzle.background}
          onTap={handleTap}
          showHints={cfg.showHints}
          foundIds={foundIds}
          activeDiffs={activeDiffs}
          interactive
        />
      </div>

      <p className="text-center text-base text-stone-500">
        あと {activeDiffs.length - foundIds.size} こ！
      </p>

      <FeedbackBanner
        kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"}
        okText={
          allFound && puzzleIndex >= cfg.puzzleCount - 1
            ? "ぜんぶ みつけた！"
            : "みつけた！"
        }
        ngText="ここじゃ ないみたい"
      />

      <KidButton variant="secondary" className="self-center" onClick={reset}>
        はじめから
      </KidButton>

      <WinCelebration
        show={gameComplete}
        message="め じょうず！ まちがい さがし クリア！"
        onAgain={reset}
      />
    </div>
  );
}
