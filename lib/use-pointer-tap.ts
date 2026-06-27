"use client";

import { useCallback, useRef } from "react";

type NormalizedTap = { x: number; y: number };

/**
 * Normalized (0–1) tap handler with deduplication for touch + click double-fire.
 */
export function useNormalizedPointerTap(
  onTap: (point: NormalizedTap) => void,
  enabled = true,
) {
  const lastFireRef = useRef(0);

  return useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const now = Date.now();
      if (now - lastFireRef.current < 350) return;
      lastFireRef.current = now;

      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      onTap({
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      });
    },
    [enabled, onTap],
  );
}
