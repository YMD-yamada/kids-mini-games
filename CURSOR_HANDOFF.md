# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 未就学〜低学年向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **Vercel（主）:** https://kids-mini-games.vercel.app
- **GitHub Pages（バックアップ）:** https://ymd-yamada.github.io/kids-mini-games/
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games
- **ymd-portfolio 連携:** `audience: kid` で https://ymd-portfolio-site.pages.dev/ に表示

## 文字が読めない子向け

- **えモード** (`pictureMode`, デフォルト ON): `components/picture-mode-toggle.tsx`
- **読み上げ:** `lib/speech.ts`, `lib/use-narration.ts`, `components/narrate-button.tsx`
- **ゲームカード:** `components/game-card.tsx`（絵だけ + 🔊）
- **GameShell / LevelPicker / GameInstruction** — えモード対応済み

## ゲーム（11種）

`lib/games-config.ts` 参照。新規: `/games/listen`（きいてえらぶ）, `/games/char-listen`（もじをきく）

## デプロイ

- Vercel: `vercel deploy --prod` または `.github/workflows/deploy-vercel.yml`（要 VERCEL_* secrets）
- GitHub Pages: `GITHUB_PAGES=true` で `.github/workflows/deploy-pages.yml`
- Vercel では `GITHUB_PAGES` を **設定しない**（ルート URL）

## 最終更新

2026-06-27 — えモード・読み上げ・2ゲーム追加、Vercel 本番化、portfolio リンク登録。
