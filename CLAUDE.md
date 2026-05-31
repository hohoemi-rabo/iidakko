# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **Expo SDK 54 — APIが変わっています。** コードを書く前に必ずバージョン固定のドキュメント https://docs.expo.dev/versions/v54.0.0/ を確認すること。学習データの古いExpo知識をそのまま使わない。

## プロジェクトの位置づけ（最初に読む）

「**いいだっこ**」＝飯田市の子育て応援サイトをスマホで見やすくし、**登録不要の子育て施設マップ**を目玉にした地域特化アプリ。商工会議所・役所へ持ち込む**ベータ（見た目重視デモ）**。

- **完全な仕様は `REQUIREMENTS.md` にある。実装前に必ず参照すること。** 画面構成・データ構造・カラートークン・「やらないこと」がすべて定義されている。
- **重要な制約（Phase 1 = このデモ）**：
  - データは**すべて静的な TypeScript/JSON**。バックエンド・DB・認証は作らない（Supabaseは Phase 2 以降）。
  - **実行時ジオコーディングをしない。** 住所→緯度経度はビルド前に一度だけ変換し、`facilities.ts` に数値で直書きする。
  - **過剰実装をしない。** 迷ったら `REQUIREMENTS.md` の「やらないこと」に従い、作らない方を選ぶ。
- **現状とのギャップ**：いま `app/` 以下にあるのは `create-expo-app` のデフォルトscaffold（タブ2つ・themedコンポーネント等）。`REQUIREMENTS.md` が定義する5タブ構成（ホーム/さがす/マップ/イベント/きんきゅう）はこれから実装する。`npm run reset-project` で空の `app/` に作り直せる（既存scaffoldは `app-example/` へ退避される）。

## コマンド

```bash
npm install                 # 依存インストール
npx expo install --fix      # Expo SDK にバージョンを揃える（依存追加・更新後は必須）
npm start                   # 開発サーバー（expo start）
npm run android             # Android で起動
npm run ios                 # iOS で起動
npm run web                 # Web で起動
npm run lint                # expo lint（eslint-config-expo）
npm run reset-project       # scaffoldを app-example/ へ退避し、空の app/ を作る
```

- テストランナーは未導入（テストスクリプトなし）。
- **`react-native-maps`（マップ機能）は Expo Go では動かない。** config plugin 経由で導入し、**EAS 開発ビルド（`npx expo run:android` 等）が必要**。Android は Google Maps APIキーを `app.json` に設定する。配布は EAS Build で Android APK。

## アーキテクチャ

**Expo Router（ファイルベースルーティング）+ React Native 0.81 + React 19 + TypeScript（strict）。** New Architecture 有効、`app.json` の experiments で **typed routes** と **React Compiler** が有効。

- **ルーティング**：`app/` 配下のファイルがそのまま画面になる。`app/_layout.tsx` がルートスタック、`app/(tabs)/_layout.tsx` がボトムタブ。新しい画面はファイルを追加して定義する。
- **パスエイリアス**：`@/*` がリポジトリルートを指す（例：`@/components/themed-text`、`@/constants/theme`）。相対パスより `@/` を優先。
- **テーマ／配色**：`constants/theme.ts` に `Colors`（light/dark）と `Fonts`（プラットフォーム別）。`hooks/use-color-scheme.ts`（web版は `.web.ts`）で現在のスキームを取得し、`hooks/use-theme-color.ts` で色を解決。`components/themed-text.tsx`・`themed-view.tsx` がこれを使う色対応ラッパー。
  - **注意**：`REQUIREMENTS.md` はパステル（コーラル/ピンク）の独自カラートークンを定義している。本実装ではこのデフォルトテーマを REQUIREMENTS のトークンに置き換える。
- **プラットフォーム別ファイル**：`.ios.tsx` / `.web.ts` の拡張子で実装を分岐（例：`components/ui/icon-symbol.ios.tsx`、`hooks/use-color-scheme.web.ts`）。Metro が自動で適切な実装を選ぶ。
- **スタイリング方針**：`REQUIREMENTS.md` は **NativeWind v4（Tailwind 記法）** を採用予定（まだ未インストール）。導入時は Expo v54 のドキュメント手順に従う。

## ディレクトリ規約

- `app/` … 画面（ルーティング）。`components/` … 再利用UI（`components/ui/` は低レベル部品）。`hooks/` … カスタムフック。`constants/` … テーマ等の定数。`assets/` … **アプリが実行時にバンドルする**画像（アイコン・スプラッシュ）。
- `docs/ui-references/` … UI/UX の参考画像（実行時には使わない設計資料）。実装時の見た目の参照元。
- データ層・型は `REQUIREMENTS.md` 9章の提案構成に従い、`data/*.ts`（静的データ）と `types.ts`（型集約）を新設して実装する。

## このプロジェクトのGit運用

個人開発のため `main` へ直接コミットしてよい（ブランチ不要）。コミットはコンベンショナルコミット形式（`feat:`/`fix:`/`chore:` 等）。`.mcp.json`・`.env*` はシークレットとして `.gitignore` 済み（コミットしない）。
