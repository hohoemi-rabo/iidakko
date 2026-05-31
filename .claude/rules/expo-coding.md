---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "app.json"
  - "eas.json"
---

# Expo コーディング規約（アーキテクチャ・SDK 54）

> このルールは TS/TSX・`app.json`・`eas.json` を編集するときだけ読み込まれる。コードを書く前に必ずバージョン固定ドキュメント https://docs.expo.dev/versions/v54.0.0/ を確認すること（学習データの古い Expo 知識をそのまま使わない）。

## アーキテクチャ

**Expo Router（ファイルベースルーティング）+ React Native 0.81 + React 19 + TypeScript（strict）。** New Architecture 有効、`app.json` の experiments で **typed routes** と **React Compiler** が有効。

- **ルーティング**：`app/` 配下のファイルがそのまま画面になる。`app/_layout.tsx` がルートスタック、`app/(tabs)/_layout.tsx` がボトムタブ。新しい画面はファイルを追加して定義する。
- **パスエイリアス**：`@/*` がリポジトリルートを指す（例：`@/components/themed-text`、`@/constants/theme`）。相対パスより `@/` を優先。
- **テーマ／配色**：`constants/theme.ts` に `Colors`（light/dark）と `Fonts`（プラットフォーム別）。`hooks/use-color-scheme.ts`（web版は `.web.ts`）で現在のスキームを取得し、`hooks/use-theme-color.ts` で色を解決。`components/themed-text.tsx`・`themed-view.tsx` がこれを使う色対応ラッパー。
  - **注意**：`REQUIREMENTS.md` はパステル（コーラル/ピンク）の独自カラートークンを定義している。本実装ではこのデフォルトテーマを REQUIREMENTS のトークンに置き換える。
  - **方針（決定済み）**：まずは**ライト基調のみ**実装する。**ダークモードは保留**（出来てから様子を見て追加判断）。最初からダーク対応を作り込まない。
- **プラットフォーム別ファイル**：`.ios.tsx` / `.web.ts` の拡張子で実装を分岐（例：`components/ui/icon-symbol.ios.tsx`、`hooks/use-color-scheme.web.ts`）。Metro が自動で適切な実装を選ぶ。
- **スタイリング方針**：`REQUIREMENTS.md` は **NativeWind v4（Tailwind 記法）** を採用予定（まだ未インストール）。導入時は Expo v54 のドキュメント手順に従う。

## ディレクトリ規約

- `app/` … 画面（ルーティング）。`components/` … 再利用UI（`components/ui/` は低レベル部品）。`hooks/` … カスタムフック。`constants/` … テーマ等の定数。`assets/` … **アプリが実行時にバンドルする**画像（アイコン・スプラッシュ）。
- `docs/ui-references/` … UI/UX の参考画像（実行時には使わない設計資料）。実装時の見た目の参照元。
- データ層・型は `REQUIREMENTS.md` 9章の提案構成に従い、`data/*.ts`（静的データ）と `types.ts`（型集約）を新設して実装する。

## Expo SDK 54 ベストプラクティス

> 出典：context7（`/expo/expo` の `sdk-54` ブランチ公式ドキュメント）。

### バージョン要件（SDK 54 の前提）
- React **19.1.0** / React Native **0.81** / react-native-web **0.21.0**
- iOS **15.1+** / Android **7+**（compile/target SDK **36**）/ Xcode **16.1+** / Node **20.19.x**
- 上記とローカルの Node/Xcode がずれているとビルドが落ちる。実機ビルド前に確認する。

### 依存関係の管理
- ライブラリ追加・更新は **`npm install` ではなく `npx expo install <pkg>`** を使う（SDK 互換バージョンが選ばれる）。
- 互換性チェック：**`npx expo install --check`**（package.json を変更せず検証）／ ずれを直す：**`npx expo install --fix`**。
- 依存を変更したら `--fix` を流してから実機確認する習慣にする。

### New Architecture（既定で有効）
- SDK 52 以降、`create-expo-app` 製プロジェクトは **New Architecture が既定でオン**（本リポジトリも `app.json` で `newArchEnabled: true`）。
- 追加するネイティブ依存は **New Architecture 対応版**を選ぶ。未対応ライブラリは避ける。

### expo-router（ナビゲーション）
- **宣言的遷移は `<Link href="...">`、命令的遷移は `router`**（`push` / `replace` / `back` / `navigate`）を使い分ける。
  ```tsx
  import { Link, router } from 'expo-router';
  // 宣言的
  <Link href="/map">マップ</Link>
  // 命令的・動的ルート
  router.navigate({ pathname: '/facility/[id]', params: { id: '123' } });
  ```
- **typed routes 有効**（`app.json` の `experiments.typedRoutes: true`）。存在しないパスへの `href` は型エラーになる＝リンク切れをビルド時に検出できる。ルートを追加したら型が再生成される。
- 画面は `app/` 配下のファイルで定義し、レイアウト（タブ・スタック）は `_layout.tsx` に集約する。

### 画像・アセット
- 画像表示は React Native の `Image` ではなく **`expo-image`（`<Image>` from `expo-image`）** を使う（キャッシュ・パフォーマンスで優位、本リポジトリに導入済み）。

### 環境変数
- クライアントに埋め込む値は **`EXPO_PUBLIC_` プレフィックス**の環境変数で渡す（`process.env.EXPO_PUBLIC_xxx`）。シークレットは絶対に `EXPO_PUBLIC_` で渡さない（バンドルに含まれて露出する）。
- Google Maps APIキー等のビルド設定は `app.json` / EAS の env で管理する。

### ビルド・配布（EAS）
- 配布は **EAS Build**。`eas.json` の build profile（`development` / `preview`(internal) / `production`）を用途で使い分ける。
- `react-native-maps` を使う画面は **Expo Go では動かない**ので、`development` プロファイルの**開発ビルド**（`npx expo run:android` 相当）で確認する。
