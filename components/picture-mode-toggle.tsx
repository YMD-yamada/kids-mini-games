"use client";

import { useSettings } from "@/components/providers/settings-provider";

export function PictureModeToggle() {
  const { pictureMode, setPictureMode, play } = useSettings();

  return (
    <button
      type="button"
      onClick={() => {
        play("tap");
        setPictureMode(!pictureMode);
      }}
      className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold shadow ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
        pictureMode
          ? "bg-violet-100 text-violet-900 ring-violet-300"
          : "bg-white text-stone-700 ring-stone-200 hover:bg-stone-50"
      }`}
      aria-pressed={pictureMode}
      aria-label={pictureMode ? "えモード オン" : "えモード オフ"}
    >
      <span className="text-xl" aria-hidden>
        {pictureMode ? "🖼️" : "📝"}
      </span>
      <span>{pictureMode ? "えモード" : "もじモード"}</span>
    </button>
  );
}
