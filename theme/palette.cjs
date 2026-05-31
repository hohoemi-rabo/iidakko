// カラートークンの「単一の真実」。生の hex はここだけに置く。
// TS 側（theme/colors.ts）と Tailwind（tailwind.config.js）の両方がここを参照する。
// 値は REQUIREMENTS.md 4章（パステル コーラル/ピンク）に一致させること。
module.exports = {
  bg: '#FFF7F3', // 全体背景（淡いクリーム）
  surface: '#FFFFFF', // カード
  primary: '#F0997B', // コーラル（メイン）
  primaryDk: '#D85A30', // 強調・アクティブ・地図ピン
  primaryTx: '#712B13',
  accent: '#ED93B1', // ピンク（サブ）
  accentDk: '#D4537E',
  text: '#3A2C26', // 本文（黒すぎない茶系）
  textSub: '#8A7A72',
  border: '#EFE3DC', // 影は使わず淡いボーダーで区切る方針の既定線色

  // カテゴリ別ピン／タグ色（ネスト → Tailwind では bg-catHoiku-bg / text-catHoiku-tx 等）
  catHoiku: { pin: '#D85A30', bg: '#FAECE7', tx: '#993C1D' }, // 保育園＝コーラル
  catKodomoen: { pin: '#6C4FD6', bg: '#EDE9FB', tx: '#4B33A8' }, // 認定こども園＝紫
  catIchiji: { pin: '#E08A1E', bg: '#FBF0DC', tx: '#8A5310' }, // 一時預かり＝琥珀
  catHiroba: { pin: '#D4537E', bg: '#FBEAF0', tx: '#993556' }, // つどいの広場＝ピンク
  catShokudo: { pin: '#0F6E56', bg: '#E1F5EE', tx: '#0F6E56' }, // こども食堂＝グリーン
  catAsobi: { pin: '#2E7DD1', bg: '#E3F0FB', tx: '#1A4E86' }, // 遊び場＝青
  tagAge: { bg: '#E6F1FB', tx: '#0C447C' }, // 年齢＝ブルー
  tagDate: { bg: '#FAEEDA', tx: '#854F0B' }, // 日付＝アンバー
  danger: { bg: '#FCEBEB', tx: '#A32D2D' }, // 緊急＝レッド
};
