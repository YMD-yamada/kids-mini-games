"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { GameLevel } from "@/lib/levels";
import { playSound, type SoundId } from "@/lib/sounds";

type SettingsContextValue = {
  level: GameLevel;
  setLevel: (level: GameLevel) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
  play: (id: SoundId) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const LEVEL_KEY = "kids-games-level";
const SOUND_KEY = "kids-games-sound";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<GameLevel>(1);
  const [soundOn, setSoundOnState] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLevel = localStorage.getItem(LEVEL_KEY);
      const savedSound = localStorage.getItem(SOUND_KEY);
      if (savedLevel === "1" || savedLevel === "2" || savedLevel === "3") {
        setLevelState(Number(savedLevel) as GameLevel);
      }
      if (savedSound === "0") setSoundOnState(false);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setLevel = useCallback((next: GameLevel) => {
    setLevelState(next);
    try {
      localStorage.setItem(LEVEL_KEY, String(next));
    } catch {
      /* ignore */
    }
  }, []);

  const setSoundOn = useCallback((on: boolean) => {
    setSoundOnState(on);
    try {
      localStorage.setItem(SOUND_KEY, on ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const play = useCallback(
    (id: SoundId) => {
      playSound(id, soundOn);
    },
    [soundOn],
  );

  const value = useMemo(
    () => ({ level, setLevel, soundOn, setSoundOn, play }),
    [level, setLevel, soundOn, setSoundOn, play],
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center text-lg text-stone-500">
        よみこみ中…
      </div>
    );
  }

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
