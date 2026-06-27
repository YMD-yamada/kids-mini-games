"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FeedbackBanner } from "@/components/feedback-banner";
import { GameInstruction } from "@/components/game-instruction";
import { KidButton } from "@/components/kid-button";
import { ProgressStars } from "@/components/progress-stars";
import { useSettings } from "@/components/providers/settings-provider";
import { WinCelebration } from "@/components/win-celebration";
import {
  getHiraganaSet,
  shuffleChars,
  type HiraganaChar,
} from "@/lib/hiragana-data";
import { hiraganaLevelConfig } from "@/lib/levels";
import { speakJapanese } from "@/lib/speech";

function countInkPixels(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const data = ctx.getImageData(0, 0, w, h).data;
  let count = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 20) count++;
  }
  return count;
}

export function HiraganaWriteGame() {
  const { level, play } = useSettings();
  const cfg = hiraganaLevelConfig[level];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const [chars, setChars] = useState<HiraganaChar[]>(() =>
    shuffleChars(getHiraganaSet(level)),
  );
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "ok" | "ng">("idle");
  const [completed, setCompleted] = useState(0);
  const [inkAmount, setInkAmount] = useState(0);

  const current = chars[index];

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInkAmount(0);
  }, []);

  const resetAll = useCallback(() => {
    setChars(shuffleChars(getHiraganaSet(level)));
    setIndex(0);
    setCompleted(0);
    setFeedback("idle");
    clearCanvas();
  }, [level, clearCanvas]);

  useEffect(() => {
    resetAll();
  }, [resetAll]);

  useEffect(() => {
    clearCanvas();
    setFeedback("idle");
    if (current) speakJapanese(current.reading);
  }, [index, current?.char, clearCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = cfg.strokeWidth;
    }
    clearCanvas();
  }, [level, cfg.strokeWidth, clearCanvas, current?.char]);

  const getPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (x: number, y: number) => {
    drawing.current = true;
    lastPoint.current = { x, y };
    play("tap");
  };

  const drawLine = (x: number, y: number) => {
    if (!drawing.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPoint.current = { x, y };
  };

  const endDraw = () => {
    drawing.current = false;
    lastPoint.current = null;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      setInkAmount(countInkPixels(ctx, canvas.width, canvas.height));
    }
  };

  const handleDone = () => {
    if (inkAmount < cfg.minInkPixels) {
      setFeedback("ng");
      setTimeout(() => setFeedback("idle"), 900);
      return;
    }
    play("match");
    setFeedback("ok");
    const nextCompleted = completed + 1;
    setCompleted(nextCompleted);
    setTimeout(() => {
      setFeedback("idle");
      if (index >= chars.length - 1) return;
      setIndex((i) => i + 1);
    }, 1000);
  };

  const speakCurrent = () => {
    if (current) speakJapanese(current.reading);
    play("tap");
  };

  const finished = completed >= chars.length;

  if (!current) return null;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="✏️"
        steps={[
          "おおきな もじ を なぞる",
          "ゆび や ペン で かく",
          "「できた！」を おす",
        ]}
      />

      <ProgressStars current={completed} total={chars.length} />

      <div className="rounded-3xl bg-white p-4 ring-2 ring-amber-100">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-stone-500">
            {index + 1} / {chars.length}
          </p>
          <KidButton variant="secondary" className="min-h-10 px-4 py-2 text-base" onClick={speakCurrent}>
            🔊 よみかた
          </KidButton>
        </div>

        <p className="mt-1 text-center text-2xl font-bold text-orange-600">
          「{current.reading}」を かいてみよう
        </p>
        {current.hint && level === 1 ? (
          <p className="mt-1 text-center text-sm text-stone-500">{current.hint}</p>
        ) : null}

        <div className="relative mx-auto mt-3 aspect-square w-full max-w-xs touch-none">
          <p
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-bold text-stone-300 select-none"
            style={{
              fontSize: "min(42vw, 11rem)",
              opacity: cfg.guideOpacity,
            }}
            aria-hidden
          >
            {current.char}
          </p>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full rounded-2xl bg-amber-50/80 ring-2 ring-amber-200"
            onMouseDown={(e) => startDraw(e.clientX, e.clientY)}
            onMouseMove={(e) => drawLine(e.clientX, e.clientY)}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={(e) => {
              e.preventDefault();
              const t = e.touches[0];
              startDraw(t.clientX, t.clientY);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              const t = e.touches[0];
              drawLine(t.clientX, t.clientY);
            }}
            onTouchEnd={endDraw}
          />
        </div>

        <p className="mt-2 text-center text-sm text-stone-400">
          うすい もじ に そって なぞってね
        </p>
      </div>

      <FeedbackBanner
        kind={feedback === "idle" ? null : feedback === "ok" ? "ok" : "ng"}
        okText="かけたね！ すごい！"
        ngText="もう すこし 大きく かいてみよう"
      />

      <div className="grid grid-cols-2 gap-3">
        <KidButton variant="secondary" onClick={clearCanvas}>
          けす
        </KidButton>
        <KidButton onClick={handleDone}>できた！</KidButton>
      </div>

      <KidButton variant="secondary" className="self-center" onClick={resetAll}>
        はじめから
      </KidButton>

      <WinCelebration
        show={finished}
        message="ひらがな れんしゅう クリア！"
        onAgain={resetAll}
      />
    </div>
  );
}
