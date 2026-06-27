# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 子ども向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **GitHub Pages:** https://ymd-yamada.github.io/kids-mini-games/
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games

## ゲーム（9種）

| パス | 内容 |
|------|------|
| `/games/memory` | 神経衰弱 |
| `/games/quiz` | クイズ |
| `/games/reflex` | はやおし |
| `/games/color` | いろあわせ |
| `/games/count` | かぞえ |
| `/games/same` | おなじ？ちがう？ |
| `/games/sequence` | じゅんばん記憶 |
| `/games/spot-diff` | まちがいさがし（AI背景 + 絵文字差分） |
| `/games/hiragana` | ひらがななぞり書き |

## 共通機能

- レベル: `lib/levels.ts` + `components/level-picker.tsx`
- 効果音: `lib/sounds.ts`（Web Audio）
- 読み上げ: `lib/speech.ts`（Web Speech API、ひらがな用）

## AI 画像

- `public/games/spot-diff/` — こうえん・おへや・うみ（GenerateImage で生成）

## 最終更新

まちがいさがし・ひらがな書き練習を追加（計9ゲーム）。
