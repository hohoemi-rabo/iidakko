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
## 実装状況（随時更新）

`create-expo-app` のデフォルトscaffoldは撤去済み。5タブ構成・パステルテーマ・NativeWind v4・静的データで全画面を実装済み。チケットごとの進捗は `docs/tickets/`（各 `- [×]`）が唯一の情報源。

- **完了**：01 共通基盤（5タブ・NativeWind v4・テーマ・型）／ 02 共通コンポーネント（`components/` の Tag・各Card・Segment・`FilterChips` 等＋`lib/`）／ 03 ホーム／ 04 さがす／ 05 マップ（★主役・`react-native-maps` 導入済み）／ 06 イベント／ 07 きんきゅう／ 08 データ整備（`data/*.ts` 投入・施設13件はジオコーディング済み）。**5画面すべて `app/(tabs)/*.tsx` に実装済み**。
- **未着手**：09 ビルド・配布（Maps APIキーの EAS env 管理・config plugin・EAS 開発ビルド・デモ用APK）。**05 の地図の実機描画確認（色分けピン・カードせり出し・外部リンク起動）も 09 で最終確認**する（`react-native-maps` は Expo Go 不可のためこのセッションでは未検証）。
- 検証用の `app/showcase.tsx`（`/showcase`、タブ外）が共通部品の確認用に残っている。04〜07 完了済みのため**削除可能**（削除はユーザー確認のうえ）。
- ⚠️ **`npm run reset-project` は使わない**：いま実行すると実装済みの `app/` を `app-example/` へ退避してしまう（初期化専用。もう不要）。

## コマンド

```bash
npm install                 # 依存インストール
npx expo install --fix      # Expo SDK にバージョンを揃える（依存追加・更新後は必須）
npm start                   # 開発サーバー（expo start）
npm run android             # Android で起動
npm run ios                 # iOS で起動
npm run web                 # Web で起動
npm run lint                # expo lint（eslint-config-expo）
npx tsc --noEmit            # 型チェック（typed routes 含む）
npx expo export -p web      # web 向けワンショットバンドル（CI的な検証に有効）
npx expo start -c --web     # 設定変更後はキャッシュクリア（-c）で web 起動
# npm run reset-project     # 初期化専用。実装済みのいま実行してはいけない（app/ を退避してしまう）
```

- テストランナーは未導入（テストスクリプトなし）。各チケットの検証は `tsc --noEmit` / `expo lint` / `expo export -p web` で行っている。
- 施設座標は `scripts/geocode.mjs`（住所→緯度経度をビルド前に一度だけ変換）。`.env` の `GOOGLE_MAPS_API_KEY` を読んで実行する（`.env` は gitignore 済み・コミット不可）。
- **`react-native-maps`（v1.20.1・導入済み）はマップ画面で使用。Expo Go では動かない。** EAS 開発ビルド（`npx expo run:android` 等）が必要。**web は非対応のため `components/facility-map.web.tsx` のプレースホルダにフォールバック**（だから `expo export -p web` は通る）。Android の Maps APIキー（`app.json` の `android.config.googleMaps.apiKey` を env 経由）と config plugin は **09 で設定**。詳細は下記ルール参照。

## 詳細ルールの置き場（コンテキスト節約のため分割）

常時このファイルに載せず、関連ファイルを編集するときだけ自動で読み込まれる **パススコープ・ルール** に切り出している（`.claude/rules/`）。CLAUDE.md には常に必要な核だけを置く方針。

- **`.claude/rules/expo-coding.md`** … アーキテクチャ・ディレクトリ規約・Expo SDK 54 ベストプラクティス。**`*.ts` / `*.tsx` / `app.json` / `eas.json` を編集するとき**に読み込まれる。
- **`.claude/rules/tickets-todo.md`** … 開発チケットの場所と Todo 運用（`- [ ]` → `- [×]`）。**`docs/tickets/**.md` を編集するとき**に読み込まれる。

> ルールを増やすときの指針：**特定の種類のファイル編集時にしか要らない詳細は、`@import`（常時ロード＝節約にならない）ではなく `paths:` フロントマター付きの `.claude/rules/` に置く**こと。CLAUDE.md 本体に直接書くのは「どのファイルを触るときも必要な核」だけにする。

## このプロジェクトのGit運用

個人開発のため `main` へ直接コミットしてよい（ブランチ不要）。コミットはコンベンショナルコミット形式（`feat:`/`fix:`/`chore:` 等）。`.mcp.json`・`.env*` はシークレットとして `.gitignore` 済み（コミットしない）。
