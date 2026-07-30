"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeedbackBanner } from "@/components/feedback-banner";
import { KidButton } from "@/components/kid-button";
import { NarrateButton } from "@/components/narrate-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { KidPanel } from "@/components/ui/kid-panel";
import { KidText } from "@/components/ui/kid-text";
import { WinCelebration } from "@/components/win-celebration";
import { colorConfig } from "@/lib/levels";
import { shuffle } from "@/lib/random";

type ColorItem = {
  id: string;
  label: string;
  bg: string;
  shape: "circle" | "square" | "triangle";
};

const COLORS: ColorItem[] = [
  { id: "red", label: "あか", bg: "bg-red-400", shape: "circle" },
  { id: "blue", label: "あお", bg: "bg-blue-400", shape: "circle" },
  { id: "yellow", label: "きいろ", bg: "bg-yellow-300", shape: "circle" },
  { id: "green", label: "みどり", bg: "bg-green-400", shape: "circle" },
  { id: "purple", label: "むらさき", bg: "bg-purple-400", shape: "circle" },
  { id: "orange", label: "オレンジ", bg: "bg-orange-400", shape: "circle" },
];

const SHAPES: ColorItem["shape"][] = ["circle", "square", "triangle"];

function ShapeSwatch({
  item,
  large,
}: {
  item: ColorItem;
  large?: boolean;
}) {
  const size = large ? "h-24 w-24" : "h-14 w-14";
  if (item.shape === "triangle") {
    return (
      <span
        className={`${size} ${item.bg}`}
        style={{
          clipPath: "polygon(50% 8%, 92% 88%, 8% 88%)",
        }}
        aria-hidden
      />
    );
  }
  return (
    <span
      className={`${size} ${item.bg} ${
        item.shape === "circle" ? "rounded-full" : "rounded-xl"
      }`}
      aria-hidden
    />
  );
}

export function ColorIsland() {
  const { level, play, recordClear } = useSettings();
  const cfg = colorConfig[level];
  const router = useRouter();
  const [round, setRound] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [target, setTarget] = useState<ColorItem>(COLORS[0]);
  const [choices, setChoices] = useState<ColorItem[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [won, setWon] = useState(false);

  const startRound = useCallback(() => {
    const base = shuffle(COLORS).slice(0, cfg.choiceCount);
    const t = base[0];
    const shaped: ColorItem[] = base.map((c, i) => ({
      ...c,
      shape: cfg.useShapes ? SHAPES[i % SHAPES.length] : "circle",
    }));
    const targetItem = shaped.find((c) => c.id === t.id) ?? shaped[0];
    setTarget(targetItem);
    setChoices(shuffle(shaped));
    setFeedback("idle");
  }, [cfg]);

  useEffect(() => {
    startRound();
  }, [startRound, level]);

  const reset = () => {
    setRound(0);
    setCorrect(0);
    setWon(false);
    startRound();
  };

  const onPick = (item: ColorItem) => {
    if (feedback !== "idle") return;
    play("tap");
    const ok = cfg.useShapes
      ? item.id === target.id && item.shape === target.shape
      : item.id === target.id;
    if (ok) {
      setCorrect((c) => c + 1);
      setFeedback("ok");
      if (round + 1 >= cfg.rounds) {
        recordClear("color", level);
        setWon(true);
      }
    } else {
      setFeedback("ng");
    }
  };

  const next = () => {
    setRound((r) => r + 1);
    startRound();
  };

  return (
    <div className="flex flex-col gap-5">
      <KidPanel className="bg-rose-50 ring-rose-200">
        <KidText
          as="p"
          hiragana="おなじ いろ・かたちを えらぶ"
          standard="おなじ色・かたちをえらぼう"
          picture={<span className="text-4xl">🎨</span>}
          className="text-center font-display font-bold text-rose-900"
          srOnlyInPicture={false}
        />
        <NarrateButton
          text="おおきい見本とおなじものをタップしてね。"
          className="mt-3 w-full"
        />
      </KidPanel>

      <ProgressStars current={correct} total={cfg.rounds} />

      <KidPanel className="flex flex-col items-center gap-3 py-6">
        <KidText
          hiragana="これと おなじ？"
          standard="これと同じものは？"
          className="font-display text-sm font-bold text-rose-700"
        />
        <ShapeSwatch item={target} large />
      </KidPanel>

      <div
        className={`grid gap-3 ${
          choices.length >= 4 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {choices.map((item) => (
          <button
            key={`${item.id}-${item.shape}`}
            type="button"
            disabled={feedback !== "idle"}
            onClick={() => onPick(item)}
            className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl bg-white shadow-sm ring-2 ring-rose-100 transition hover:bg-rose-50 active:scale-[0.98] disabled:opacity-70"
            aria-label={item.label}
          >
            <ShapeSwatch item={item} />
          </button>
        ))}
      </div>

      <FeedbackBanner kind={feedback === "idle" ? null : feedback} />

      {(feedback === "ok" || feedback === "ng") && !won ? (
        <KidButton
          className="w-full"
          variant={feedback === "ok" ? "primary" : "secondary"}
          onClick={feedback === "ok" ? next : () => setFeedback("idle")}
        >
          {feedback === "ok" ? "つぎへ" : "もういちど"}
        </KidButton>
      ) : null}

      <WinCelebration
        show={won}
        onAgain={reset}
        onHome={() => router.push("/")}
        message="いろかたちマスター！"
        hiraganaMessage="いろかたち マスター！"
      />
    </div>
  );
}
