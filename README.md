# みんなのミニゲーム

未就学〜低学年向けミニゲーム（Next.js）。**文字が読めなくても遊べる** えモード・読み上げ付き。

## 本番 URL（Vercel）

**https://kids-mini-games.vercel.app**（デプロイ後）

旧 GitHub Pages: https://ymd-yamada.github.io/kids-mini-games/（バックアップ）

## 子ども向けの工夫

- **🖼️ えモード** — 文字を減らし、大きな絵文字だけで操作
- **🔊 読み上げ** — 各ゲームの説明・問題を音声で再生
- **👂 きいて えらぶ** — 声を聞いて絵を選ぶ（読みの練習）
- **🔤 もじを きく** — ひらがなの声を聞いて文字を選ぶ

## ゲーム（11種）

`lib/games-config.ts` を参照

## ローカル開発

```bash
npm install
npm run dev
```

## Vercel デプロイ（推奨）

1. [Vercel](https://vercel.com) で `YMD-yamada/kids-mini-games` をインポート
2. GitHub Secrets に設定:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. `master` へ push で `.github/workflows/deploy-vercel.yml` が本番デプロイ

`GITHUB_PAGES` 環境変数は **設定しない**（ルート URL で動作）。

## ymd-portfolio 連携

`ymd-portfolio` の `config/apps.config.json` に本番 URL を登録済み。  
子供用フィルタ（`audience: kid`）で表示されます。
