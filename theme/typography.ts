// タイポグラフィ指針（REQUIREMENTS.md 4章「サイズ指針」）。
// 通常は NativeWind の text-* クラス（tailwind.config.js の fontSize）で指定するが、
// className を当てられない箇所から参照するための数値定数もここに置く。
export const fontSize = {
  tag: 12, // タグ（下限）
  body: 16, // 本文
  headingSm: 18, // 小見出し
  heading: 20, // 見出し
  headingLg: 22, // 大見出し
} as const;

// タップ領域・角丸の基準（影は使わず淡いボーダーで区切る方針）。
export const layout = {
  touchMin: 48, // タップ領域 最小 48×48pt
  radiusCard: 16, // カード角丸
  radiusPill: 9999, // ピル
} as const;
