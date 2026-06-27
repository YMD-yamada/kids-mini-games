# みんなのミニゲーム

未就学〜低学年向けのミニゲーム集（Next.js）。アカウント・外部トラッキングなし。

## 公開 URL

**本番:** https://ymd-yamada.github.io/kids-mini-games/

**リポジトリ:** https://github.com/YMD-yamada/kids-mini-games

## ゲーム一覧（9種）

| ゲーム | 内容 |
|--------|------|
| かーどめくり | 神経衰弱（レベルで枚数・peek ヒント） |
| どれだ？ | クイズ（12問プール） |
| はやおし | 反応速度（連続成功でクリア） |
| いろあわせ | 色の一致 |
| かぞえよう | 数え上げ |
| おなじ？ちがう？ | 絵の比較 |
| じゅんばん | 順番記憶 |
| まちがいさがし | AI背景 + 絵文字差分 |
| ひらがなれんしゅう | なぞり書き + 読み上げ |

## 共通機能

- **れべル**（やさしい / ふつう / チャレンジ）— 端末に保存
- **効果音**（Web Audio）— オン/オフ切替
- **読み上げ**（ひらがなゲーム）— 🔊 よみかた ボタン

## ローカル開発

```bash
cd kids-mini-games
npm install
npm run dev
```

## デプロイ

GitHub Pages: `master` への push で自動デプロイ（`.github/workflows/deploy-pages.yml`）。

Vercel: リポジトリをインポート（`GITHUB_PAGES` 環境変数は未設定）。

## ビルド

```bash
npm run build
```

Windows arm64 など Turbopack 非対応環境では webpack ビルドを使用しています。
