# CURSOR_HANDOFF

## プロジェクト

`kids-mini-games` — 子ども向けミニゲーム（Next.js）。個人情報・ログインなし。

## 本番

- **GitHub Pages:** https://ymd-yamada.github.io/kids-mini-games/
- **GitHub:** https://github.com/YMD-yamada/kids-mini-games

## ゲーム（7種）

| パス | 内容 |
|------|------|
| `/games/memory` | 神経衰弱（レベルで枚数・peek ヒント） |
| `/games/quiz` | クイズ（12問プール・レベルで出題数） |
| `/games/reflex` | はやおし（連続成功でクリア） |
| `/games/color` | いろあわせ |
| `/games/count` | かぞえ |
| `/games/same` | おなじ？ちがう？ |
| `/games/sequence` | じゅんばん記憶 |

## 共通機能

- レベル: `lib/levels.ts` + `components/level-picker.tsx`（localStorage 保存）
- 効果音: `lib/sounds.ts`（Web Audio）+ `components/sound-toggle.tsx`
- 設定: `components/providers/settings-provider.tsx`

## 最終更新

7ゲーム化・レベル設定・効果音・幼児向け UI（手順表示・星進捗・大ボタン）を追加。
