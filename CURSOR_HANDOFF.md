# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 子ども向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **GitHub Pages:** https://ymd-yamada.github.io/kids-mini-games/
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games

## ゲーム（9種）

`/games/memory` · `/games/quiz` · `/games/reflex` · `/games/color` · `/games/count` · `/games/same` · `/games/sequence` · `/games/spot-diff` · `/games/hiragana`

## 共通基盤

- 設定: `components/providers/settings-provider.tsx`（れべル・効果音、localStorage）
- れべル: `lib/levels.ts` + `components/level-picker.tsx`
- 効果音: `lib/sounds.ts`
- 乱数: `lib/random.ts`（`buildSequencePool` 等）
- タップ: `lib/use-pointer-tap.ts`（二重発火防止）

## 品質メモ（2026-06）

- クイズ: 正解数に基づくクリアメッセージ、不正解時に正解ハイライト
- じゅんばん: プールに必ず正解シンボルを含める
- まちがいさがし: pointer イベント、スマホ縦並び、やさしいヒット半径拡大
- ひらがな: DPR 正規化インク計測、進捗バー、自動読み上げ廃止
- 全体: ローディングゲート削除、モーダル a11y、コピー統一

## 最終更新

品質改善パス（バグ修正・UI 統一・a11y）。
