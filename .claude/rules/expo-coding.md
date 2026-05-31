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

- **ルーティング**：`app/` 配下のファイルがそのまま画面になる。`app/_layout.tsx` がルートスタック（ライト固定 `DefaultTheme`＋`SafeAreaProvider`、先頭で `global.css` を import）、`app/(tabs)/_layout.tsx` が5タブ（index/search/map/events/emergency）。新しい画面はファイルを追加して定義する。
- **パスエイリアス**：`@/*` がリポジトリルートを指す（例：`@/components/tag`、`@/theme/colors`、`@/lib/links`、`@/data/facilities`、`@/types`）。相対パスより `@/` を優先。
- **テーマ／配色（実装済み・ライト基調のみ）**：
  - **`theme/palette.cjs` がカラーの単一の真実**（生の hex はここだけ）。`theme/colors.ts` が型付き re-export（RNスタイルや `className` を当てられない箇所＝`tabBarStyle`・地図マーカー色・円アイコン背景等で使う）、`tailwind.config.js` が同じ palette を colors に流し込む（→ `bg-bg` `text-text` `bg-catHoiku-bg` `text-catHoiku-tx` 等）。`theme/typography.ts` にサイズ/レイアウト定数。
  - 施設カテゴリ色は6種（catHoiku/catKodomoen/catIchiji/catHiroba/catShokudo/catAsobi）＋ tagAge/tagDate/danger。palette に色を足したら **`theme/colors.ts` の型にも追記**しないと `colors.catX` が型エラーになる。
  - **ダークモードは保留**。`create-expo-app` の themed 機構（`constants/theme.ts`・`hooks/use-color-scheme*`・`hooks/use-theme-color`・`components/themed-text|themed-view`）は**削除済み**。`hooks/` `constants/` ディレクトリは存在しない。色は NativeWind の `className` か `theme/colors.ts` で当てる。
- **プラットフォーム別ファイル**：`.ios.tsx` / `.web.ts` の拡張子で実装を分岐（例：`components/ui/icon-symbol.ios.tsx`＝SF Symbol を直接、`icon-symbol.tsx`＝Android/web 向け MaterialIcons マッピング）。Metro が自動で適切な実装を選ぶ。
- **スタイリング方針（NativeWind v4 導入済み）**：`className` で書く（`babel.config.js`＝`jsxImportSource:'nativewind'`＋`nativewind/babel`、`metro.config.js`＝`withNativeWind(input:'./global.css')`、`tailwind.config.js`、`nativewind-env.d.ts`）。tailwindcss は **v3 系**（v4 は入れない）。**設定やクラスを変えたら `expo start -c` でキャッシュクリア**（反映されない既知の罠）。
  - **動的classは禁止**：`` bg-${x} `` は Tailwind の content スキャンに拾われず無色になる。種別→色は **`components/tokens.ts` の静的 `TONE` マップに literal 列挙**する（`components/**` は content 対象。`lib/**` に置くとパージされるので不可）。
  - **Tag は外枠 `<View>` に `bg-*`、内側 `<Text>` に `text-*` を分けて当てる**（NativeWind v4 で Text の色を確実に伝えるため）。押下感は `active:opacity-90`、選択状態は state 由来の className 三項切替。タップ領域は `min-h-touch`/`min-w-touch`、角丸は `rounded-card`/`rounded-pill`、影は使わず `border border-border`。

## ディレクトリ規約

- `app/` … 画面（ルーティング）。`components/` … 再利用UI（`components/ui/` は低レベル部品、`components/tokens.ts` は種別→色の静的classマップ）。`lib/` … UI非依存のロジック（`links.ts`＝tel/経路/外部リンク、`labels.ts`＝日本語ラベル、`categories.ts`＝カテゴリ→tone/ピン色）。`theme/` … `palette.cjs`/`colors.ts`/`typography.ts`。`data/` … 静的データ（`articles`/`facilities`/`events`/`emergency`）。`types.ts` … 型集約。`assets/` … **実行時にバンドルする**画像（アイコン・スプラッシュ）。
- `docs/ui-references/` … UI/UX の参考画像（`home.png`・`map.png`＝ライト基調が実装基準、`sagasu_ivent.png`＝レイアウト参照のダークモック）。実装時の見た目の参照元。
- **ファイル名は kebab-case**（`tag.tsx`・`facility-card.tsx`）、**export するコンポーネント名は PascalCase**（`Tag`・`FacilityCard`）。既存に合わせる。
- 命名・配置の判断に迷ったら、既存の `components/` `lib/` の同種ファイルに倣う。`hooks/` `constants/` は存在しない（削除済み）。

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
