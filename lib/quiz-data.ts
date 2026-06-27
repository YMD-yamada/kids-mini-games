export type QuizChoice = {
  id: string;
  label: string;
  correct: boolean;
  /** Tailwind classes for the choice surface (e.g. bg color) */
  surfaceClass?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "color-red",
    prompt: "あかい いろ は どれ？",
    choices: [
      {
        id: "r",
        label: "あか",
        correct: true,
        surfaceClass: "bg-red-500 text-white",
      },
      {
        id: "b",
        label: "あお",
        correct: false,
        surfaceClass: "bg-blue-500 text-white",
      },
      {
        id: "y",
        label: "きいろ",
        correct: false,
        surfaceClass: "bg-yellow-400 text-stone-900",
      },
    ],
  },
  {
    id: "shape-star",
    prompt: "ほしの かたち ⭐ は どれ？",
    choices: [
      { id: "star", label: "⭐", correct: true },
      { id: "circle", label: "●", correct: false },
      { id: "square", label: "■", correct: false },
    ],
  },
  {
    id: "count-3",
    prompt: "りんご 🍎 が みっつ の ところ は どれ？",
    choices: [
      { id: "two", label: "🍎🍎", correct: false },
      { id: "three", label: "🍎🍎🍎", correct: true },
      { id: "four", label: "🍎🍎🍎🍎", correct: false },
    ],
  },
  {
    id: "big-small",
    prompt: "おおきい かぞく は どれ？",
    choices: [
      { id: "small", label: "🐜", correct: false },
      { id: "big", label: "🐘", correct: true },
      { id: "mid", label: "🐕", correct: false },
    ],
  },
];
