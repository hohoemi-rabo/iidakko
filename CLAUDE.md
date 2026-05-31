# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **Expo SDK 54 — APIが変わっています。** コードを書く前に必ずバージョン固定のドキュメント https://docs.expo.dev/versions/v54.0.0/ を確認すること。学習データの古いExpo知識をそのまま使わない。

## プロジェクトの位置づけ（最初に読む）

「**いいだっこ**」（アプリ名は確定）＝飯田市の子育て応援サイトをスマホで見やすくし、**登録不要の子育て施設マップ**を目玉にした地域特化アプリ。商工会議所・役所へ持ち込む**ベータ（見た目重視デモ）**。まずは**ライト基調のみ**実装し、ダークモードは保留（後で様子を見て判断）。

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
- **`react-native-maps`（マップ機能）は Expo Go では動かない。** EAS 開発ビルド（`npx expo run:android` 等）が必要。詳細は下記ルール参照。

## 詳細ルールの置き場（コンテキスト節約のため分割）

常時このファイルに載せず、関連ファイルを編集するときだけ自動で読み込まれる **パススコープ・ルール** に切り出している（`.claude/rules/`）。CLAUDE.md には常に必要な核だけを置く方針。

- **`.claude/rules/expo-coding.md`** … アーキテクチャ・ディレクトリ規約・Expo SDK 54 ベストプラクティス。**`*.ts` / `*.tsx` / `app.json` / `eas.json` を編集するとき**に読み込まれる。
- **`.claude/rules/tickets-todo.md`** … 開発チケットの場所と Todo 運用（`- [ ]` → `- [×]`）。**`docs/tickets/**.md` を編集するとき**に読み込まれる。

> ルールを増やすときの指針：**特定の種類のファイル編集時にしか要らない詳細は、`@import`（常時ロード＝節約にならない）ではなく `paths:` フロントマター付きの `.claude/rules/` に置く**こと。CLAUDE.md 本体に直接書くのは「どのファイルを触るときも必要な核」だけにする。

## このプロジェクトのGit運用

個人開発のため `main` へ直接コミットしてよい（ブランチ不要）。コミットはコンベンショナルコミット形式（`feat:`/`fix:`/`chore:` 等）。`.mcp.json`・`.env*` はシークレットとして `.gitignore` 済み（コミットしない）。
