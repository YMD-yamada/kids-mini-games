# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 子ども向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **GitHub Pages:** https://ymd-yamada.github.io/kids-mini-games/
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games
- CI: `.github/workflows/deploy-pages.yml`（`GITHUB_PAGES=true` で static export）

## 主要パス

- トップ: `app/page.tsx`
- ゲーム: `app/games/*/page.tsx`、ロジックは `components/*-game.tsx`
- クイズ出題データ: `lib/quiz-data.ts`

## デプロイメモ

- Vercel: リポジトリをインポート（`GITHUB_PAGES` 未設定）。CLI は `vercel login` が必要。
- GitHub Pages: `basePath` `/kids-mini-games` は `GITHUB_PAGES=true` のときのみ。

## 次にやりやすいこと

- 難易度（神経衰弱の枚数・はやおしの待ち時間）
- 効果音（ミュート既定・オプトイン）
- PWA（ホーム追加）
- Vercel 本番ドメイン（任意）

## 最終更新

GitHub Pages リリース設定済み。
