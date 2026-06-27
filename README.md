# みんなのミニゲーム

未就学〜低学年むけのミニゲームをいくつか入れた Next.js アプリです。アカウントや外部トラッキングはありません。

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

## Vercel へのデプロイ

1. リポジトリを Git に push する
2. [Vercel](https://vercel.com) で「New Project」→ この `kids-mini-games` フォルダをルートに指定（モノレポなら Root Directory を `kids-mini-games` に設定）
3. フレームワークは Next.js のままデプロイ

詳細は [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## ビルド

本番ビルドは `npm run build`（内部で Webpack を使用）です。開発時に Turbopack で問題が出る環境がある場合は [Next.js のドキュメント](https://nextjs.org/docs/app/api-reference/turbopack) を参照してください。

## 技術

- Next.js（App Router）· TypeScript · Tailwind CSS
