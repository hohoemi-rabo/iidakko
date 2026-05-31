# 01 — 共通基盤（テーマ・型・データ層・5タブ構成）

各画面の前提となる土台を整える。現状は `create-expo-app` のデフォルトscaffold（タブ2つ・themedコンポーネント）なので、`REQUIREMENTS.md` の5タブ構成へ作り直す。

## 参照
- `REQUIREMENTS.md` 3章（技術スタック）・4章（デザイン/カラートークン）・6章（データ構造）・9章（ディレクトリ構成）
- `docs/ui-references/home.png`（ボトムタブ5つ：ホーム / さがす / マップ / イベント / きんきゅう）

## 依存
- なし（最初に着手するチケット）

## 決定事項
- **アプリ名は「いいだっこ」で確定**（参考画像 `sagasu_ivent.png` の「いいだ子育てナビ（仮）」は不採用。表記は「いいだっこ」に統一）。
- **ダークモードは一旦保留**：まず**ライト基調（パステル コーラル/ピンク）で実装**し、ひととおり出来てから様子を見て追加判断する。最初からダーク対応は作り込まない。
- **スタイリングは NativeWind v4（+ tailwindcss v3）で確定**。公式の現行手順は NativeWind v5/Tailwind v4 だが preview/nightly 依存のため、安定したデモを優先し v4 安定版を採用。`View`/`Text` に直接 `className` を当てられラッパー不要。
- **scaffold は手動整理で対応**（`reset-project` は使わない）。demo 画面・部品だけ削除し、再利用部品（`haptic-tab` / `external-link` / `icon-symbol` / アプリアイコン・スプラッシュ）は残した。
- **カラーの単一の真実は `theme/palette.cjs`**。`theme/colors.ts`（RN スタイル用）と `tailwind.config.js`（className 用）の両方がここを参照し、hex の二重管理を排除。

## Todo

### ナビゲーション（5タブ）
- [×] 既存scaffold（`app/(tabs)/` の index/explore、`app/modal.tsx` 等）を整理 or `npm run reset-project` 方針を決める（→ 手動整理に決定、実施済み）
- [×] ボトムタブを5つ定義：ホーム / さがす / マップ / イベント / きんきゅう（`app/(tabs)/_layout.tsx`）
- [×] 各タブのルートファイルを作成：`index.tsx`(ホーム) / `search.tsx` / `map.tsx` / `events.tsx` / `emergency.tsx`
- [×] タブアイコン・ラベルを参考画像に合わせる（ホーム/虫眼鏡/ピン/カレンダー/！）
- [×] typed routes が効いていることを確認（`expo export` で5ルート生成・`tsc --noEmit` 通過、`/modal` 参照は除去済み）

### テーマ（パステル コーラル/ピンク）
- [×] `constants/theme.ts`（または `theme/colors.ts`）を `REQUIREMENTS.md` 4章のカラートークンへ置き換える（→ `theme/palette.cjs` を単一の真実とし `theme/colors.ts` で型付き re-export）
- [×] カテゴリ別ピン/タグ色（catHoiku / catHiroba / catShokudo / tagAge / tagDate / danger）を定義
- [×] タイポグラフィ指針を反映（本文16px / 見出し18〜22px / タグ12px）（→ `tailwind.config.js` の fontSize ＋ `theme/typography.ts`）
- [×] まずはライト基調のみ実装（ダーク対応は保留＝上記「決定事項」）
- [×] 角丸・タップ領域（最小48×48pt、カード16px、ピル999px）、影は使わず淡いボーダーの方針を共通化（→ tailwind の rounded-card/pill・min-w/h-touch・border 色 `border`）

### 型定義
- [×] `types.ts` を作成し、`AgeBand` / `Purpose` / `FacilityCat` / `Article` / `Facility` / `EventItem` を定義（6章のとおり）

### データ層の置き場
- [×] `data/` ディレクトリを用意（`articles.ts` / `facilities.ts` / `events.ts` / `emergency.ts`）※中身は 08 で投入

### スタイリング方針の確定
- [×] NativeWind v4 を導入するか、`StyleSheet` で進めるかを決める（→ **NativeWind v4 + tailwindcss v3** を導入。babel/metro/global.css/nativewind-env.d.ts 設定済み）

## 完了条件
- [×] 5タブが表示され、それぞれ空でも画面遷移できる（web export で全ルート静的生成を確認）
- [×] パステルのカラートークンが共通から参照できる（`.bg-bg` → `rgb(255 247 243)` を生成CSSで確認）
- [×] `types.ts` の型が各画面から import できる（`@/types` を `data/*.ts` から import、tsc 通過）
