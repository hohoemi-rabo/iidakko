# 02 — 共通コンポーネント

各画面で再利用するUI部品をまとめて用意する。参考画像のトーン（パステル・大きめ文字・淡いボーダー・角丸）に統一する。

## 参照
- `REQUIREMENTS.md` 4章（デザイン）・9章（components 一覧）
- `docs/ui-references/` 全3枚（タグ・カード・セグメント・トグル・チップの見た目）

## 依存
- 01（テーマ・型）

## Todo

> 命名は既存に合わせ **ファイル名は kebab-case**（`tag.tsx` 等）、コンポーネント名は PascalCase（`Tag`）。Todo 表記の `Tag.tsx` と機能は同一。
> 色の出し分けは NativeWind の動的class罠を避けるため `components/tokens.ts` の静的 `TONE` マップに集約。日本語ラベル・施設カテゴリ→tone/色は `lib/labels.ts` `lib/categories.ts`、外部リンクは `lib/links.ts`。

### タグ・チップ
- [×] `tag.tsx`：種別/年齢/日付/カテゴリ/緊急/お知らせ のピル型タグ（tone でトークン出し分け、10 tone）
- [×] `category-chips.tsx`：横スクロールの絞り込みチップ（選択＝薄コーラル塗り）※map.png 参照
- [×] `segmented-control.tsx`：汎用2分割トグル（`[年齢でさがす | 目的でさがす]` 等）※sagasu_ivent.png 参照
- [×] `map-list-toggle.tsx`：`[地図 | 一覧]` トグル（SegmentedControl ラッパー）※map.png 参照

### カード
- [×] `article-card.tsx`：タイトル・更新日・要点1〜2行＋公式/PDFリンク（さがす用）
- [×] `facility-card.tsx`：種別タグ・対象年齢タグ・名称・地区・開所時間＋`[地図で見る][電話][公式]`（有無で活性判定）※map.png 下部のカード
- [×] `event-card.tsx`：日付タグ・対象年齢タグ・カテゴリタグ・場所・申込/詳細リンク（dimmed 対応）※sagasu_ivent.png 右
- [×] ホームの新着カード `news-row.tsx`（イベント/お知らせのタグ付き行＋chevron）※home.png

### その他
- [×] `emergency-banner.tsx`：赤系の緊急バナー（♯8000 タップ発信）※home.png 上部
- [×] 大ボタン `big-button.tsx`（丸アイコン＋ラベル＋サブ説明）※home.png の マップ/さがす/イベント
- [×] 外部リンクの共通ハンドラ `lib/links.ts`（`tel:` 発信 / 経路URL / 公式URL・PDF を expo-linking + expo-web-browser で開く）

## 完了条件
- [×] 各部品が単体で表示でき、カラートークンから色を取得している（`app/showcase.tsx` で実データ表示、web export で全 tone の CSS 生成を確認）
- [×] タップ領域48×48pt以上・角丸・淡いボーダーのデザイン規約を満たす（`min-h-touch`/`rounded-card`/`rounded-pill`/`border-border`、影なし）
- [×] 外部リンクハンドラが電話/経路/URL/PDFを実際に開ける（`callPhone`/`openDirections`/`openExternal` を実装・カードに結線。tel/in-app browser の実機動作は開発ビルド（09）で最終確認）

## 検証用ルート（後で削除）
- `app/showcase.tsx`：全コンポーネントを実データで並べた確認専用ルート（`/showcase`、タブ外）。03〜06 で各画面に組み込んだら削除する。
