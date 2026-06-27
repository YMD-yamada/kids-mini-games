# みんなのミニゲーム

未就学〜低学年むけのミニゲームをいくつか入れた Next.js アプリです。アカウントや外部トラッキングはありません。

## 公開 URL

**本番:** https://ymd-yamada.github.io/kids-mini-games/

リポジトリ: https://github.com/YMD-yamada/kids-mini-games

## はじめかた

開発サーバー:

```bash
cd kids-mini-games
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## ゲーム

- **かーどめくり** — おなじ絵札をそろえる
- **どれだ？** — いろ・かたち・かずの問題
- **はやおし** — パンダが出たらすばやくタップ

## Vercel へのデプロイ（任意）

GitHub Pages で公開済みです。独自ドメインや Vercel のプレビューが必要な場合:

1. [Vercel](https://vercel.com) に GitHub アカウントでログイン
2. 「New Project」→ `YMD-yamada/kids-mini-games` をインポート
3. 設定はデフォルトのまま Deploy（`GITHUB_PAGES` は未設定のまま）

## ビルド

本番ビルドは `npm run build`（内部で Webpack を使用）です。開発時に Turbopack で問題が出る環境がある場合は [Next.js のドキュメント](https://nextjs.org/docs/app/api-reference/turbopack) を参照してください。

## 技術

- Next.js（App Router）· TypeScript · Tailwind CSS
