# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 子ども向けミニゲーム（Next.js / Vercel 想定）。個人情報・ログインなし。

## 主要パス

- トップ: `app/page.tsx`
- ゲーム: `app/games/*/page.tsx`、ロジックは `components/*-game.tsx`
- クイズ出題データ: `lib/quiz-data.ts`

## 次にやりやすいこと

- 難易度（神経衰弱の枚数・はやおしの待ち時間）
- 効果音（ミュート既定・オプトイン）
- PWA（ホーム追加）

## 最終更新

計画どおり MVP 実装済み。
