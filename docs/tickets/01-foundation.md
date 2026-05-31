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

## Todo

### ナビゲーション（5タブ）
- [ ] 既存scaffold（`app/(tabs)/` の index/explore、`app/modal.tsx` 等）を整理 or `npm run reset-project` 方針を決める
- [ ] ボトムタブを5つ定義：ホーム / さがす / マップ / イベント / きんきゅう（`app/(tabs)/_layout.tsx`）
- [ ] 各タブのルートファイルを作成：`index.tsx`(ホーム) / `search.tsx` / `map.tsx` / `events.tsx` / `emergency.tsx`
- [ ] タブアイコン・ラベルを参考画像に合わせる（ホーム/虫眼鏡/ピン/カレンダー/！）
- [ ] typed routes が効いていることを確認（存在しないルートへの遷移が型エラーになる）

### テーマ（パステル コーラル/ピンク）
- [ ] `constants/theme.ts`（または `theme/colors.ts`）を `REQUIREMENTS.md` 4章のカラートークンへ置き換える
- [ ] カテゴリ別ピン/タグ色（catHoiku / catHiroba / catShokudo / tagAge / tagDate / danger）を定義
- [ ] タイポグラフィ指針を反映（本文16px / 見出し18〜22px / タグ12px）
- [ ] まずはライト基調のみ実装（ダーク対応は保留＝上記「決定事項」）
- [ ] 角丸・タップ領域（最小48×48pt、カード16px、ピル999px）、影は使わず淡いボーダーの方針を共通化

### 型定義
- [ ] `types.ts` を作成し、`AgeBand` / `Purpose` / `FacilityCat` / `Article` / `Facility` / `EventItem` を定義（6章のとおり）

### データ層の置き場
- [ ] `data/` ディレクトリを用意（`articles.ts` / `facilities.ts` / `events.ts` / `emergency.ts`）※中身は 08 で投入

### スタイリング方針の確定
- [ ] NativeWind v4 を導入するか、`StyleSheet` で進めるかを決める（REQUIREMENTSはNativeWind予定・未インストール。導入時は Expo v54 手順に従う）

## 完了条件
- [ ] 5タブが表示され、それぞれ空でも画面遷移できる
- [ ] パステルのカラートークンが共通から参照できる
- [ ] `types.ts` の型が各画面から import できる
