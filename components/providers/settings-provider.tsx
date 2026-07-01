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
import {
  migrateLegacyPictureMode,
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
  /** @deprecated use readingMode === "picture" */
  pictureMode: boolean;
  /** @deprecated use setReadingMode */
  setPictureMode: (on: boolean) => void;
  play: (id: SoundId) => void;
  ready: boolean;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const LEVEL_KEY = "kids-games-level";
const SOUND_KEY = "kids-games-sound";
const SPEECH_KEY = "kids-games-speech";
const READING_KEY = "kids-games-reading";
const PICTURE_KEY = "kids-games-picture";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<GameLevel>(1);
  const [soundOn, setSoundOnState] = useState(true);
  const [speechOn, setSpeechOnState] = useState(true);
  const [readingMode, setReadingModeState] = useState<ReadingMode>("hiragana");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedLevel = localStorage.getItem(LEVEL_KEY);
      const savedSound = localStorage.getItem(SOUND_KEY);
      const savedSpeech = localStorage.getItem(SPEECH_KEY);
      const savedReading = localStorage.getItem(READING_KEY);
      const savedPicture = localStorage.getItem(PICTURE_KEY);

      if (savedLevel === "1" || savedLevel === "2" || savedLevel === "3") {
        setLevelState(Number(savedLevel) as GameLevel);
      }
      if (savedSound === "0") setSoundOnState(false);
      if (savedSpeech === "0") setSpeechOnState(false);

      const parsed =
        parseReadingMode(savedReading) ??
        migrateLegacyPictureMode(savedPicture) ??
        "hiragana";
      setReadingModeState(parsed);
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

  const setPictureMode = useCallback(
    (on: boolean) => {
      setReadingMode(on ? "picture" : "standard");
    },
    [setReadingMode],
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
      pictureMode: readingMode === "picture",
      setPictureMode,
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
      setPictureMode,
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
  if (!ctx) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return ctx;
}
