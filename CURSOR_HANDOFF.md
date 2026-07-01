# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 未就学〜低学年向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **Vercel:** https://kids-mini-games.vercel.app
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games

## 表示モード（3段階）

`readingMode` in `settings-provider.tsx`（localStorage: `kids-games-reading`）

| モード | 用途 |
|--------|------|
| `picture` | 文字ほぼなし・絵と音（未読） |
| `hiragana` | ひらがな表示（学習ブリッジ・デフォルト） |
| `standard` | 全文＋大人向けヒント（保護者操作） |

UI: `components/reading-mode-toggle.tsx`, `components/ui/kid-text.tsx`, `lib/use-reading-ui.ts`

## デザイン

- フォント: M PLUS Rounded 1c（見出し）+ Noto Sans JP（本文）— `globals.css`
- パネル: `components/ui/kid-panel.tsx`
- トークン: `app/globals.css`（`--shadow-card`, `--violet-soft` 等）

## ゲーム（13種）

`lib/games-config.ts` — カテゴリ `words`（ことば・もじ）/ `play`（あそび）

ひらがな学習: listen, char-listen, **hira-word**, **hira-order**, hiragana（書き）

## 最終更新

2026-06-27 — 3段階表示モード、デザイン刷新、ひらがなゲーム2種追加。
