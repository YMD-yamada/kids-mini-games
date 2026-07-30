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
import type { IslandId } from "@/lib/islands";
import type { GameLevel } from "@/lib/levels";
import {
  emptyStars,
  isIslandUnlocked,
  mergeStar,
  parseStars,
  PROGRESS_KEY,
  starsForLevel,
  type IslandStars,
} from "@/lib/progress";
import {
  parseReadingMode,
  type ReadingMode,
} from "@/lib/reading-mode";
import { playSound, type SoundId } from "@/lib/sounds";

type SettingsContextValue = {
  level: GameLevel;
  setLevel: (level: GameLevel) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
  speechOn: boolean;
  setSpeechOn: (on: boolean) => void;
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  stars: IslandStars;
  recordClear: (island: IslandId, level: GameLevel) => void;
  isUnlocked: (island: IslandId) => boolean;
  play: (id: SoundId) => void;
  ready: boolean;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const LEVEL_KEY = "pyon-level";
const SOUND_KEY = "pyon-sound";
const SPEECH_KEY = "pyon-speech";
const READING_KEY = "pyon-reading";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<GameLevel>(1);
  const [soundOn, setSoundOnState] = useState(true);
  const [speechOn, setSpeechOnState] = useState(true);
  const [readingMode, setReadingModeState] = useState<ReadingMode>("hiragana");
  const [stars, setStars] = useState<IslandStars>(emptyStars);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedLevel = localStorage.getItem(LEVEL_KEY);
      const savedSound = localStorage.getItem(SOUND_KEY);
      const savedSpeech = localStorage.getItem(SPEECH_KEY);
      const savedReading = localStorage.getItem(READING_KEY);
      const savedStars = localStorage.getItem(PROGRESS_KEY);

      if (savedLevel === "1" || savedLevel === "2" || savedLevel === "3") {
        setLevelState(Number(savedLevel) as GameLevel);
      }
      if (savedSound === "0") setSoundOnState(false);
      if (savedSpeech === "0") setSpeechOnState(false);
      setReadingModeState(parseReadingMode(savedReading) ?? "hiragana");
      setStars(parseStars(savedStars));
    } catch {
      /* ignore */
    }
    setReady(true);
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

  const setSpeechOn = useCallback((on: boolean) => {
    setSpeechOnState(on);
    try {
      localStorage.setItem(SPEECH_KEY, on ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const setReadingMode = useCallback((mode: ReadingMode) => {
    setReadingModeState(mode);
    try {
      localStorage.setItem(READING_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  const recordClear = useCallback((island: IslandId, clearLevel: GameLevel) => {
    const earned = starsForLevel(clearLevel);
    setStars((prev) => {
      const next = { ...prev, [island]: mergeStar(prev[island], earned) };
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const isUnlocked = useCallback(
    (island: IslandId) => isIslandUnlocked(stars, island),
    [stars],
  );

  const play = useCallback(
    (id: SoundId) => {
      playSound(id, soundOn);
    },
    [soundOn],
  );

  const value = useMemo(
    () => ({
      level,
      setLevel,
      soundOn,
      setSoundOn,
      speechOn,
      setSpeechOn,
      readingMode,
      setReadingMode,
      stars,
      recordClear,
      isUnlocked,
      play,
      ready,
    }),
    [
      level,
      setLevel,
      soundOn,
      setSoundOn,
      speechOn,
      setSpeechOn,
      readingMode,
      setReadingMode,
      stars,
      recordClear,
      isUnlocked,
      play,
      ready,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
