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

function measureInk(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1;
  const raw = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let count = 0;
  for (let i = 3; i < raw.length; i += 4) {
    if (raw[i] > 20) count++;
  }
  return Math.round(count / (dpr * dpr));
}

export function HiraganaWriteGame() {
  const { level, play, speechOn } = useSettings();
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
  const inkProgress = Math.min(100, Math.round((inkAmount / cfg.minInkPixels) * 100));

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
  }, [index, clearCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#ea580c";
      ctx.lineWidth = cfg.strokeWidth;
    }
    clearCanvas();
  }, [level, cfg.strokeWidth, clearCanvas, current?.char]);

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
      setInkAmount(measureInk(canvas, ctx));
    }
  };

  const getPoint = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleDone = () => {
    if (inkAmount < cfg.minInkPixels) {
      setFeedback("ng");
      setTimeout(() => setFeedback("idle"), 900);
      return;
    }
    setFeedback("ok");
    setCompleted((c) => c + 1);
    setTimeout(() => {
      setFeedback("idle");
      if (index < chars.length - 1) {
        setIndex((i) => i + 1);
      }
    }, 1000);
  };

  const speakCurrent = () => {
    if (current && speechOn) speakJapanese(current.reading);
    play("tap");
  };

  const finished = completed >= chars.length;

  if (!current) return null;

  return (
    <div className="flex flex-col gap-5">
      <GameInstruction
        emoji="✏️"
        steps={[
          "🔊 で よみかたを きく",
          "うすい もじ に そって かく",
          "「できた！」で つぎへ",
        ]}
      />

      <ProgressStars current={completed} total={chars.length} />

      <div className="rounded-3xl bg-white p-4 ring-2 ring-amber-100">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-stone-500">
            {index + 1} / {chars.length}
          </p>
          <KidButton
            variant="secondary"
            className="min-h-10 px-4 py-2 text-base"
            onClick={speakCurrent}
          >
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
            aria-label={`「${current.char}」を なぞって かく ばしょ`}
            onPointerDown={(e) => {
              e.preventDefault();
              const p = getPoint(e.clientX, e.clientY);
              startDraw(p.x, p.y);
            }}
            onPointerMove={(e) => {
              if (!drawing.current) return;
              e.preventDefault();
              const p = getPoint(e.clientX, e.clientY);
              drawLine(p.x, p.y);
            }}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            onPointerCancel={endDraw}
          />
        </div>

        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-orange-400 transition-all duration-200"
              style={{ width: `${inkProgress}%` }}
            />
          </div>
          <p className="mt-1 text-center text-xs text-stone-400">
            {inkProgress < 100 ? "もっと 大きく なぞってね" : "いっぱい かけたね！"}
          </p>
        </div>
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
